const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export async function fetchRecipeByName(name) {
  const response = await fetch(`${BASE_URL}/search.php?s=${name}`);
  const data = await response.json();
  return data.meals;
}

export async function fetchRecipeOfTheDay() {
  const response = await fetch(`${BASE_URL}/random.php`);
  const data = await response.json();
  return data.meals[0];
}

export async function fetchRandomRecipes() {
  const response = await fetch(`${BASE_URL}/randomselection.php`);
  const data = await response.json();
  return data.meals;
}
