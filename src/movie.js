import { getMovie } from './shared/api.js';

const message = document.getElementById('movie-message');
const details = document.getElementById('movie-details');

const id = new URLSearchParams(window.location.search).get('id');

function showMovie(movie) {
  document.title = movie.Title;

  const poster = movie.Poster !== 'N/A'
    ? `<img class="movie-poster" src="${movie.Poster}" alt="Affiche de ${movie.Title}">`
    : '';

  details.innerHTML = `
    ${poster}
    <div class="movie-info">
      <h1 class="movie-title">${movie.Title} (${movie.Year})</h1>
      <p>${movie.Runtime} · ${movie.Genre} · ${movie.Released}</p>
      <p>Note IMDb : ${movie.imdbRating}/10 (${movie.imdbVotes} votes)</p>
      <p>${movie.Plot}</p>
      <p><strong>Réalisateur :</strong> ${movie.Director}</p>
      <p><strong>Acteurs :</strong> ${movie.Actors}</p>
      <p><strong>Pays :</strong> ${movie.Country}</p>
      <p><strong>Langue :</strong> ${movie.Language}</p>
      <p><strong>Récompenses :</strong> ${movie.Awards}</p>
    </div>`;
}

async function loadMovie() {
  if (!id) {
    message.textContent = 'Aucun film sélectionné.';
    return;
  }

  try {
    showMovie(await getMovie(id));
  } catch (error) {
    message.textContent = error.message;
  }
}

loadMovie();