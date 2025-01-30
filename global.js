console.log("IT'S ALIVE!");
// Define pages
const pages = [
  { url: '', title: 'Home' },
  { url: 'projects/', title: 'Projects' },
  { url: 'CV/', title: 'CV' },
  { url: 'contact/', title: 'Contact' },
  { url: 'https://github.com/MatthewBudding', title: 'GitHub' },
];

// Check if we're on the home page
const ARE_WE_HOME = document.documentElement.classList.contains('home');

// Create a <nav> element and prepend it to the body
const nav = document.createElement('nav');
document.body.prepend(nav);

// Add navigation links dynamically
for (const p of pages) {
  let url = p.url;

  // Adjust relative URLs if not on the home page
  if (!ARE_WE_HOME && !url.startsWith('http')) {
    url = '../' + url;
  }

  // Create the <a> element
  const a = document.createElement('a');
  a.href = url;
  a.textContent = p.title;

  // Highlight the current page
  a.classList.toggle(
    'current',
    a.host === location.host && a.pathname === location.pathname
  );

  // Open external links in a new tab
  if (a.host !== location.host) {
    a.target = '_blank';
  }

  // Append the link to the nav
  nav.append(a);
}

document.body.insertAdjacentHTML(
    'afterbegin',
    `
    <label class="color-scheme">
      Theme:
      <select>
        <option value="light dark">Automatic</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </label>`
  );
  
  const select = document.querySelector('.color-scheme select');

select.addEventListener('input', function (event) {
  console.log('Color scheme changed to', event.target.value);
});
select.addEventListener('input', function (event) {
    const scheme = event.target.value;
    document.documentElement.style.setProperty('color-scheme', scheme);
  });

const savedScheme = localStorage.getItem('color-scheme');
if (savedScheme) {
  document.documentElement.style.setProperty('color-scheme', savedScheme);
  select.value = savedScheme;
}


select.addEventListener('input', function (event) {
  const scheme = event.target.value;
  document.documentElement.style.setProperty('color-scheme', scheme);
  localStorage.setItem('color-scheme', scheme);
});
  

export async function fetchJSON(url) {
    try {
        // Fetch the JSON file from the given URL
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Failed to fetch projects: ${response.statusText}`);
        }
        console.log('Response received:', response); 
        const data = await response.json();
        return data; 
        
    } catch (error) {
        console.error('Error fetching or parsing JSON data:', error);
    }
}
export function renderProjects(projects, containerElement, headingLevel = 'h2') {
  if (!containerElement) {
      console.error("Error: Invalid container element.");
      return;
  }

  // Clear existing content
  containerElement.innerHTML = '';

  // Loop through the projects and create elements
  projects.forEach((project) => {
      const article = document.createElement('article');

      // Dynamically create heading
      const heading = document.createElement(headingLevel);
      heading.textContent = project.title;

      const image = document.createElement('img');
      image.src = project.image;
      image.alt = project.title;

      const description = document.createElement('p');
      description.textContent = project.description;

      // Append elements to article
      article.appendChild(heading);
      article.appendChild(image);
      article.appendChild(description);

      // Append article to container
      containerElement.appendChild(article);
  });
}
export async function fetchGitHubData(username) {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (!response.ok) {
      throw new Error(`GitHub API Error: ${response.statusText}`);
    }
    const data = await response.json();
    return data; // Returns the parsed data
  } catch (error) {
    console.error('Error fetching GitHub data:', error);
  }
}
