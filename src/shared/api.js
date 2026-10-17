const API_KEY = import.meta.env.VITE_OMDB_KEY;
const BASE_URL = 'https://www.omdbapi.com/';

async function request(params) {
  const url = `${BASE_URL}?apikey=${API_KEY}&${new URLSearchParams(params)}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Erreur HTTP ${response.status}`);

  const data = await response.json();
  if (data.Response === 'False') throw new Error(data.Error);
  return data;
}

export function searchMovies(query, page = 1) {
  return request({ s: query, type: 'movie', page });
}

export function getMovie(id) {
  return request({ i: id, plot: 'full' });
}