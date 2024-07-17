export function renderNavbar() {
    const navbar = document.getElementById('navbar');
    navbar.innerHTML = `
      <a href="#" class="nav-link" id="home-link">Home</a>
      <a href="#" class="nav-link" id="search-link">Search Recipes</a>
      <a href="#" class="nav-link" id="recipe-of-the-day-link">Recipe of the Day</a>
      <a href="#" class="nav-link" id="random-recipes-link">Random Recipes</a>
    `;
  }
  