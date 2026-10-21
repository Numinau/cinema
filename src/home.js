import { getMovie, searchMoviesByYear } from './shared/api.js';

// Les éléments de la page
const trendingFilms = document.getElementById('trending-films');
const films2024 = document.getElementById('films-2024');
const loadMoreButton = document.getElementById('load-more-2024');

// 1. Films tendance : choisis par nous (OMDb n'a pas de liste « tendance »)
const trendingIds = ['tt33764258', 'tt22084616', 'tt29355505', 'tt3521164'];

const trendingMovies = await Promise.all(trendingIds.map((id) => getMovie(id)));

trendingMovies.forEach((movie) => {
  trendingFilms.innerHTML += `
    <article class="film-card">
      <img class="film-poster" src="${movie.Poster}" alt="Affiche de ${movie.Title}">
      <h3 class="film-title">${movie.Title}</h3>
      <p class="film-plot">${movie.Plot.slice(0, 100)}...</p>
      <a class="film-link lien" href="/movie.html?id=${movie.imdbID}">En savoir plus</a>
    </article>`;
});

// 2. Films de 2024 : 10 de plus à chaque clic sur le bouton
let page = 1;

async function load2024() {
  try {
    const data = await searchMoviesByYear('happy', 2024, page);

    data.Search.forEach((movie) => {
      films2024.innerHTML += `
        <article class="film-card">
          <img class="film-poster" src="${movie.Poster}" alt="Affiche de ${movie.Title}">
          <h3 class="film-title">${movie.Title}</h3>
          <a class="film-link lien" href="/movie.html?id=${movie.imdbID}">En savoir plus</a>
        </article>`;
    });

    page++;
  } catch {
    loadMoreButton.hidden = true;
  }
}

load2024();
loadMoreButton.addEventListener('click', load2024);