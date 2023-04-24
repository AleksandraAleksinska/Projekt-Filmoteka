<<<<<<< Updated upstream
const watchedMovies = JSON.parse(localStorage.getItem('watchedMovies')) || [];
const queuedMovies = JSON.parse(localStorage.getItem('queuedMovies')) || [];

const movies = [];

watchedMovies.forEach(movie => {
  const { id, title, poster_path, release_date, genres } = movie;
  movies.push({ id, title, status: 'watched', poster_path, release_date, genres });
=======
// const renderMoviesList = (movies, listElement) => {
//   const imgUrl = 'https://image.tmdb.org/t/p/w500';

//   const moviesList = movies.reduce((acc, movie) => {
//     const { id, title, release_date, poster_path, genre_ids } = movie;
//     const releaseYear = new Date(release_date).getFullYear();
//     const movieGenres = genre_ids.map(genreId => genres.find(genre => genre.id === genreId)?.name);

//     acc += `
//       <li>
//         <div class="movie-card">
//           <img class="movie-card__img" src="${imgUrl}${poster_path}" loading="lazy"/>
//           <div class="movie-card__desc">
//             <p class="movie-card__title">${title}</p>
//             <p class="movie-card__info">${movieGenres.slice(0, 3).join(', ')} | ${releaseYear}</p>
//           </div>
//         </div>
//       </li>
//     `;
//     return acc;
//   }, '');

//   listElement.innerHTML = moviesList;
// };

// const renderWatchedMovies = () => {
//   const watchedMovies = JSON.parse(localStorage.getItem('watchedMovies')) || [];
//   renderMoviesList(watchedMovies, document.querySelector('#library__watched ul'));
// };

// const renderQueuedMovies = () => {
//   const queuedMovies = JSON.parse(localStorage.getItem('queuedMovies')) || [];
//   renderMoviesList(queuedMovies, document.querySelector('#library__queue ul'));
// };

// document
//   .querySelector('.header__libBtn.btn-watched')
//   .addEventListener('click', renderWatchedMovies);
// document.querySelector('.header__libBtn.btn-queue').addEventListener('click', renderQueuedMovies);

// const watchedButton = document.querySelector('#watched-button');
// watchedButton.addEventListener('click', () => {
//   console.log('Watched button clicked');
//   // Tutaj można dodać kod do pobrania filmów z localStorage i wygenerowania ich kafelków
// });

const API_KEY = 'ac3e035161883f7175e5be9954a0068d';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const WATCHED_MOVIES_KEY = 'watchedMovies';
const QUEUED_MOVIES_KEY = 'queuedMovies';

const trendingMoviesDOM = document.querySelector('.movies__container');

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
  moviesList.classList.add('movies__container');
  movies.forEach(movie => {
    const { poster_path, title, release_date, genre_ids } = movie;
    const releaseYear = release_date.slice(0, 4);
    const savedGenres = localStorage.getItem('genres');
    const parsedGenres = JSON.parse(savedGenres);
    const movieGenres = parsedGenres.flatMap(genre => {
      let genresArray = [];
      if (genre_ids.includes(genre.id)) {
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
>>>>>>> Stashed changes
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
