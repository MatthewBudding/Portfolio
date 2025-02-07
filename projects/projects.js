import { fetchJSON, renderProjects } from '../global.js';
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7.9.0/+esm";

document.addEventListener('DOMContentLoaded', async () => {
    // Fetch project data
    const projects = await fetchJSON('../lib/projects.json');
    
    // Get the container element and the projects-title element
    const projectsContainer = document.querySelector('.projects');
    const projectsTitle = document.querySelector('.projects-title');
    const searchInput = document.querySelector('.searchBar'); // Get the search input field

    // Count the projects and update the title
    if (projectsTitle) {
        projectsTitle.textContent = `(${projects.length} projects)`;
    }

    // Render the projects and initial pie chart
    renderProjectsAndChart(projects);

    // Search functionality
    searchInput.addEventListener('input', (event) => {
        const query = event.target.value.toLowerCase();  // Get the current query value

        // Filter projects by all metadata fields (case insensitive)
        let filteredProjects = projects.filter((project) => {
            let values = Object.values(project).join(' ').toLowerCase();
            return values.includes(query);
        });

        // Render filtered projects and pie chart
        renderProjectsAndChart(filteredProjects);
    });
});

// Function to render both the projects and the pie chart
function renderProjectsAndChart(projectsGiven) {
    const projectsContainer = document.querySelector('.projects');
    const projectsTitle = document.querySelector('.projects-title');

    // Render projects list
    renderProjects(projectsGiven, projectsContainer, 'h2');
    
    // Update project count
    if (projectsTitle) {
        projectsTitle.textContent = `(${projectsGiven.length} projects)`;
    }

    // Render pie chart and legend
    renderPieChart(projectsGiven);
}

function renderPieChart(projectsGiven) {
    const svg = d3.select('svg');
    const legend = d3.select('.legend');
  
    // Clear previous pie chart and legend
    svg.selectAll('path').remove();
    legend.selectAll('*').remove();
  
    // Group projects by year and count them
    let rolledData = d3.rollups(
      projectsGiven,
      (v) => v.length,
      (d) => d.year
    );
  
    // Prepare data for pie chart rendering
    let data = rolledData.map(([year, count]) => {
      return { value: count, label: year };
    });
  
    // Generate pie chart slices
    let sliceGenerator = d3.pie().value(d => d.value);
    let arcData = sliceGenerator(data);
  
    // Create arc generator
    let arcGenerator = d3.arc().innerRadius(0).outerRadius(50);
  
    // Use D3's color scale for slices
    let colors = d3.scaleOrdinal(d3.schemeTableau10);
  
    // Generate pie chart slices
    arcData.forEach((d, idx) => {
      svg.append('path')
        .attr('d', arcGenerator(d))
        .attr('fill', colors(idx)) // Color each slice
        .on('click', () => {
          selectedIndex = selectedIndex === idx ? -1 : idx; // Toggle selection
          svg.selectAll('path')
            .attr('class', (_, i) => i === selectedIndex ? 'selected' : ''); // Update pie slices
            
        legend.selectAll('li')
            .attr('class', (_, idx) => (
                idx === selectedIndex ? 'legend-item selected' : 'legend-item'
    ));
          filterProjectsByYear(data[idx].label);  // Filter projects by year
        });
    });
  
    // Generate legend items
    
    data.forEach((d, idx) => {
        let legendItem = legend.append('li')
            .attr('class', 'legend-item')
            .html(`<span class="swatch" style="background-color:${colors(idx)};"></span> ${d.label} <em>(${d.value})</em>`)
            
    });
  }


  const projects = await fetchJSON('../lib/projects.json');
  // Function to filter projects by year
  function filterProjectsByYear(year) {
    const projectsContainer = document.querySelector('.projects');
    if (selectedIndex === -1) {        
        renderProjects(projects, projectsContainer, 'h2');
      }else{
        const filteredProjects = projects.filter((project) => project.year === year);
        
        // Render the filtered projects
        renderProjects(filteredProjects, projectsContainer, 'h2');
    }
  }
  
    
  let selectedIndex = -1;
  