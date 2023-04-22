const movieCard = document.querySelector('.modal__movie');
const closeModal = document.querySelector('[data-modal-close]');
const openModal = document.querySelector('[data-modal-open]');
const modal = document.querySelector('[data-modal]');
const backdrop = document.querySelector('.backdrop');


// openModal.addEventListener('click', toggleModal.open);
// closeModal.addEventListener('click', toggleModal.close);

const getSelectedMovieDetails = async () => {
  try {
    const id = 76600;
    const API_KEY = 'ac3e035161883f7175e5be9954a0068d';
    const selectedMovieFetch = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`,
    );
    const selectedMovieData = await selectedMovieFetch.json();
    console.log(selectedMovieData);
    return selectedMovieData;
  } catch (error) {
    console.log(error.message);
  }
};

const renderSelectedMovieDetails = (movie) => {
    const imgUrl = 'https://image.tmdb.org/t/p/w500';
    const selectedMovie =
        `<img class="modal__img" src="${imgUrl}${movie.poster_path}"></img>
        <h2 class="modal__title uppercase"> ${movie.title}</h2>
            <ul class="modal__info">
                <li class="modal__info-item">
                    <p class="modal__info--key">Vote / Votes</p>
                    <p class="modal__info--number">${movie.vote_average.toFixed(1)} / ${movie.vote_count}</p>
                    </li>
                <li class="modal__info-item">
                    <p class="modal__info--key">Popularity</p>
                    <p class="modal__info--number">${movie.popularity.toFixed(1)}</p>
                    </li>
                <li class="modal__info-item">
                   <p class="modal__info--key">Original Title</p>
                   <p class="modal__info--value uppercase">${movie.original_title}</p>
                   </li>
                <li class="modal__info-item">
                   <p class="modal__info--key">Genre</p>
                   <p class="modal__info--value">${movie.genres.map(genre => genre.name).join(', ')}</p>
                   </li>
            </ul>
        <div class="modal__overview">
            <p class="modal__overview--about">about</p>
            <p>${movie.overview}</p>
        </div>`

  movieCard.innerHTML = selectedMovie;

  const addToWatchedButton = document.querySelector('.button--watched');
  const addToQueueButton = document.querySelector('.button--queue');

  addToWatchedButton.addEventListener('click', () => {
    const watchedMovies = JSON.parse(localStorage.getItem('watchedMovies')) || [];
    const movieToAdd = { id: movie.id, title: movie.title };
    watchedMovies.push(movieToAdd);
    localStorage.setItem('watchedMovies', JSON.stringify(watchedMovies));
  });

  addToQueueButton.addEventListener('click', () => {
    const queuedMovies = JSON.parse(localStorage.getItem('queuedMovies')) || [];
    const movieToAdd = { id: movie.id, title: movie.title };
    queuedMovies.push(movieToAdd);
    localStorage.setItem('queuedMovies', JSON.stringify(queuedMovies));
  });
};

getSelectedMovieDetails()
  .then(movie => renderSelectedMovieDetails(movie))
  .catch(error => console.log(error));

modalCloseButton.addEventListener('click', () => {
  modal.classList.remove('modal--active');
});

getSelectedMovieDetails()
  .then(movie => renderSelectedMovieDetails(movie))
  .catch(error => console.log(error));

const SelectedMovie = { getSelectedMovieDetails, renderSelectedMovieDetails }
export default SelectedMovie;