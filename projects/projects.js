import { fetchJSON, renderProjects } from '../global.js';
document.addEventListener('DOMContentLoaded', async () => {
    const projects = await fetchJSON('../lib/projects.json');
    
    // Get the container element and the projects-title element
    const projectsContainer = document.querySelector('.projects');
    const projectsTitle = document.querySelector('.projects-title');

    // Count the projects and update the title
    if (projectsTitle) {
        projectsTitle.textContent = `(${projects.length} projects)`;
    }

    // Render the projects
    renderProjects(projects, projectsContainer, 'h2');
});
