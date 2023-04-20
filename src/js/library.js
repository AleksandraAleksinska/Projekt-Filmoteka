const renderMoviesList = (movies, listElement) => {
  const imgUrl = 'https://image.tmdb.org/t/p/w500';

  const moviesList = movies.reduce((acc, movie) => {
    const { id, title, release_date, poster_path, genre_ids } = movie;
    const releaseYear = new Date(release_date).getFullYear();
    const movieGenres = genre_ids.map(genreId => genres.find(genre => genre.id === genreId)?.name);

    acc += `
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
    return acc;
  }, '');

  listElement.innerHTML = moviesList;
};

const renderWatchedMovies = () => {
  const watchedMovies = JSON.parse(localStorage.getItem('watchedMovies')) || [];
  renderMoviesList(watchedMovies, document.querySelector('#library__watched ul'));
};

const renderQueuedMovies = () => {
  const queuedMovies = JSON.parse(localStorage.getItem('queuedMovies')) || [];
  renderMoviesList(queuedMovies, document.querySelector('#library__queue ul'));
};

document
  .querySelector('.header__libBtn.btn-watched')
  .addEventListener('click', renderWatchedMovies);
document.querySelector('.header__libBtn.btn-queue').addEventListener('click', renderQueuedMovies);

const watchedButton = document.querySelector('#watched-button');
watchedButton.addEventListener('click', () => {
  console.log('Watched button clicked');
  // Tutaj można dodać kod do pobrania filmów z localStorage i wygenerowania ich kafelków
});
