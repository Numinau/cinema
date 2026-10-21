import { searchMovies } from './shared/api.js';

// Les éléments de la page
const searchInput = document.getElementById('search-input');
const searchMessage = document.getElementById('search-message');
const searchResults = document.getElementById('search-results');
const loader = document.getElementById('loader');
const loadMoreButton = document.getElementById('load-more-results');

let movieName = '';     // le titre recherché
let page = 1;           // prochaine page OMDb à charger
let isLoading = false;  // évite deux chargements en même temps (TP08)

// Charge une page de résultats et l'ajoute à la suite (comme loadImages du TP08)
async function loadResults() {
  isLoading = true;
  loader.hidden = false;

  try {
    const data = await searchMovies(movieName, page);

    data.Search.forEach((movie) => {
      searchResults.innerHTML += `
        <article class="film-card">
          <img class="film-poster" src="${movie.Poster}" alt="Affiche de ${movie.Title}">
          <h3 class="film-title">${movie.Title}</h3>
          <a class="film-link lien" href="/movie.html?id=${movie.imdbID}">En savoir plus</a>
        </article>`;
    });

    page++;
  } catch (error) {
    searchMessage.textContent = error.message;
    loadMoreButton.hidden = true;
  }

  loader.hidden = true;
  isLoading = false;
}

// Temps réel : à chaque lettre tapée, on repart de zéro
searchInput.addEventListener('input', () => {
  movieName = searchInput.value.trim();
  searchResults.innerHTML = '';
  searchMessage.textContent = '';
  loadMoreButton.hidden = false;
  page = 1;

  if (movieName.length < 3) {
    searchMessage.textContent = 'Tapez au moins 3 lettres.';
    loadMoreButton.hidden = true;
    return;
  }
  loadResults();
});

// Bouton « Charger plus de résultats »
loadMoreButton.addEventListener('click', loadResults);

