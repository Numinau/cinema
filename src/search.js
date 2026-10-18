import { searchMovies } from './shared/api.js';

const searchInput = document.getElementById('search-input');
const searchMessage = document.getElementById('search-message');
const searchResults = document.getElementById('search-results');
function displayMovies(movies) {
  movies.forEach((movie) => {
    searchResults.innerHTML += `
      <article class="film-card">
        <img class="film-poster" src="${movie.Poster}" alt="Affiche de ${movie.Title}">
        <h3 class="film-title">${movie.Title}</h3>
        <a class="film-link" href="/movie.html?id=${movie.imdbID}">En savoir plus</a>
      </article>`;
  });
}

//ecouter la frappe
searchInput.addEventListener('input', async () => {
  const movieName = searchInput.value.trim();
  searchResults.innerHTML = '';
  searchMessage.textContent = '';

  if (movieName.length < 3) {
    searchMessage.textContent = 'Tapez au moins 3 lettres.';
    return;
  }

  try {
    const data = await searchMovies(movieName);
    displayMovies(data.Search);
  } catch (error) {
    searchMessage.textContent = error.message;
  }
});