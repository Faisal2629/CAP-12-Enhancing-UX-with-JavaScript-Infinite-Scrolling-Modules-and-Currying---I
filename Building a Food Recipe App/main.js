import { renderNavbar } from './navbar.js';
import { fetchRecipeByName, fetchRecipeOfTheDay, fetchRandomRecipes } from './api.js';

document.addEventListener('DOMContentLoaded', () => {
  renderNavbar();
  loadHomePage();

  document.getElementById('home-link').addEventListener('click', loadHomePage);
  document.getElementById('search-link').addEventListener('click', loadSearchPage);
  document.getElementById('recipe-of-the-day-link').addEventListener('click', loadRecipeOfTheDayPage);
  document.getElementById('random-recipes-link').addEventListener('click', loadRandomRecipesPage);
});

function loadHomePage() {
  const content = document.getElementById('content');
  content.innerHTML = `<h1>Welcome to the Food Recipe App</h1>`;
}

function loadSearchPage() {
  const content = document.getElementById('content');
  content.innerHTML = `
    <h1>Search Recipes</h1>
    <input type="text" id="search-input" placeholder="Enter recipe name">
    <button id="search-button">Search</button>
    <div id="search-results"></div>
  `;

  document.getElementById('search-button').addEventListener('click', async () => {
    const query = document.getElementById('search-input').value;
    const recipes = await fetchRecipeByName(query);
    displayRecipes(recipes, 'search-results');
  });
}

async function loadRecipeOfTheDayPage() {
  const content = document.getElementById('content');
  const recipe = await fetchRecipeOfTheDay();
  displayRecipes([recipe], 'content');
}

async function loadRandomRecipesPage() {
  const content = document.getElementById('content');
  const recipes = await fetchRandomRecipes();
  displayRecipes(recipes, 'content');
}

function displayRecipes(recipes, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';
  if (!recipes) {
    container.innerHTML = '<p>No recipes found.</p>';
    return;
  }

  recipes.forEach(recipe => {
    const recipeCard = document.createElement('div');
    recipeCard.className = 'recipe-card';
    recipeCard.innerHTML = `
      <h2>${recipe.strMeal}</h2>
      <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
      <p>${recipe.strInstructions}</p>
    `;
    container.appendChild(recipeCard);
  });
}
