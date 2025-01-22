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
  
const form = document.querySelector('form');

form?.addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent the default form submission
  console.log('Form submission intercepted!');
});
const data = new FormData(form);
for (let [name, value] of data) {
    console.log(name, value);
  }
let params = [];
for (let [name, value] of data) {
    params.push(`${name}=${encodeURIComponent(value)}`);
}
const url = `${form.action}?${params.join('&')}`;
console.log('Final URL:', url);
location.href = url;

    