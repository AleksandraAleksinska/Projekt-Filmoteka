import getAllGenres from './genres';

const API_KEY = 'ac3e035161883f7175e5be9954a0068d';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const WATCHED_MOVIES_KEY = 'watchedMovies';
const QUEUED_MOVIES_KEY = 'queuedMovies';

const trendingMoviesDOM = document.querySelector('.movie-list');

const getMovies = async ids => {
  const moviePromises = ids.map(async id => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`,
    );
    const data = await response.json();
    return {
      id: data.id,
      title: data.title,
      release_date: data.release_date,
      poster_path: data.poster_path,
      genre_ids: data.genre_ids,
    };
  });
  return Promise.all(moviePromises);
};

const renderMovies = movies => {
  const moviesList = document.createElement('ul');
  moviesList.classList.add('movie-list');
  movies.forEach(movie => {
    const { poster_path, title, release_date, genre_ids } = movie;
    const releaseYear = release_date.slice(0, 4);
    const savedGenres = localStorage.getItem('genres');
    const parsedGenres = JSON.parse(savedGenres);
    const movieGenres = parsedGenres.flatMap(genre => {
      if (!movie.genre_ids) {
        return '';
      }
      let genresArray = [];
      if (movie.genre_ids.includes(genre.id)) {
        genresArray.push(genre.name);
      }
      return genresArray;
    });
    const movieCard = `
<li>
<div class="movie-card card-hover">
<img class="movie-card__img" src="${IMG_URL}${poster_path}" loading="lazy"/>
<div class="movie-card__desc">
 <p class="movie-card__title">${title}</p>
 <p class="movie-card__info"> ${movieGenres.slice(0, 3).join(', ')} | ${releaseYear}</p>
</div>
 </div>
</li>
`;
    moviesList.insertAdjacentHTML('beforeend', movieCard);
  });
  document.body.appendChild(moviesList);
};

const displayMoviesList = localStorageKey => {
  const moviesListContainer = document.querySelector('.movie-list');
  if (moviesListContainer) {
    moviesListContainer.remove();
  }

  const moviesList = JSON.parse(localStorage.getItem(localStorageKey));
  if (moviesList && moviesList.length) {
    getMovies(moviesList.map(movie => movie.id))
      .then(movies => {
        renderMovies(movies, trendingMoviesDOM);
      })
      .catch(error => console.log(error));
  } else {
    console.log(`No ${localStorageKey} movies in local storage.`);
  }
};

const watchedBtn = document.querySelector('.btn-watched');
watchedBtn.addEventListener('click', () => {
  displayMoviesList(WATCHED_MOVIES_KEY);
});

const queueBtn = document.querySelector('.btn-queue');
queueBtn.addEventListener('click', () => {
  displayMoviesList(QUEUED_MOVIES_KEY);
});
