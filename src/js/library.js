const watchedMovies = JSON.parse(localStorage.getItem('watchedMovies')) || [];
const queuedMovies = JSON.parse(localStorage.getItem('queuedMovies')) || [];

const movies = [];

watchedMovies.forEach(movie => {
  const { id, title, poster_path, release_date, genres } = movie;
  movies.push({ id, title, status: 'watched', poster_path, release_date, genres });
});

queuedMovies.forEach(movie => {
  const { id, title, poster_path, release_date, genres } = movie;
  movies.push({ id, title, status: 'queued', poster_path, release_date, genres });
});

console.log(movies);

const API_KEY = 'ac3e035161883f7175e5be9954a0068d';
const imgUrl = 'https://image.tmdb.org/t/p/w500/';

const generateMovieCardHTML = movie => {
  const { title, poster_path, release_date, genres } = movie;
  const releaseYear = new Date(release_date).getFullYear();
  const movieGenres = genres.map(genre => genre.name);

  return `
    <li>
      <div class="movie-card">
        <img class="movie-card__img" src="${imgUrl}${poster_path}" loading="lazy"/>
        <div class="movie-card__desc">
          <p class="movie-card__title">${title}</p>
          <p class="movie-card__info">${movieGenres.slice(0, 3).join(', ')} | ${releaseYear}</p>
        </div>
      </div>
    </li>
  `;
};

const fetchMovieData = async movieId => {
  const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`);
  const data = await response.json();
  return data;
};

const watchedBtn = document.querySelector('.btn-watched');
const queueBtn = document.querySelector('.btn-queue');
const movieList = document.querySelector('.movie-list');

watchedBtn.addEventListener('click', () => {
  const watchedMovies = JSON.parse(localStorage.getItem('watchedMovies')) || [];
  movieList.innerHTML = watchedMovies.map(movie => generateMovieCardHTML(movie)).join('');
});

queueBtn.addEventListener('click', async () => {
  const queuedMovies = JSON.parse(localStorage.getItem('queuedMovies')) || [];
  const movieDataArray = await Promise.all(queuedMovies.map(movie => fetchMovieData(movie.id)));
  const moviesWithDetails = queuedMovies.map((movie, index) => ({
    ...movie,
    ...movieDataArray[index],
  }));
  movieList.innerHTML = moviesWithDetails.map(movie => generateMovieCardHTML(movie)).join('');
});

const library = { generateMovieCardHTML, fetchMovieData, movies };

export default library;
