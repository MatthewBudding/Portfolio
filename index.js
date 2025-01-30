import { fetchJSON, renderProjects } from '../global.js';
import { fetchGitHubData } from '../global.js';


document.addEventListener('DOMContentLoaded', async () => {
    const projects = await fetchJSON('../lib/projects.json');
    const latestProjects = projects.slice(0, 3);
    // Get the container element and the projects-title element
    const projectsContainer = document.querySelector('.projects');
    const projectsTitle = document.querySelector('.projects-title');

    // Count the projects and update the title
    if (projectsTitle) {
        projectsTitle.textContent = `(${latestProjects.length} projects)`;
    }

    // Render the projects
    renderProjects(latestProjects, projectsContainer, 'h2');
});


document.addEventListener('DOMContentLoaded', async () => {
    const username = 'MatthewBudding'; 
    const githubData = await fetchGitHubData(username);
  
    if (githubData) {
      console.log(githubData); // Check the data structure in the console
  
      const followersCount = githubData.followers;
      const followingCount = githubData.following;
  
      const githubStatsContainer = document.querySelector('.github-stats');
      if (githubStatsContainer) {
        githubStatsContainer.innerHTML = `
          <p>Followers: ${followersCount}, Following: ${followingCount}</p>
        `;
      }
    }
    const profileStats = document.querySelector('#profile-stats');
    if (profileStats) {
      profileStats.innerHTML = `
            <dl>
              <dt>Public Repos:</dt><dd>${githubData.public_repos}</dd>
              <dt>Public Gists:</dt><dd>${githubData.public_gists}</dd>
              <dt>Followers:</dt><dd>${githubData.followers}</dd>
              <dt>Following:</dt><dd>${githubData.following}</dd>
            </dl>
        `;
    }
  });

  