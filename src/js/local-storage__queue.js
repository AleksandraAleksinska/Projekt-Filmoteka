import selectedMovie from "./modal";

const queueMoviesDOM = document.querySelector('.users-queue-list');
const savedMovies = localStorage.getItem('queue-movie');
const parsedMovies = JSON.parse(savedMovies);
// const queueMovieId = parsedMovies.id;
// console.log(parsedMovies)


if(queueMoviesDOM) {

const renderQueueMovie = parsedMovies.forEach((movie) => {
  
  const imgUrl = 'https://image.tmdb.org/t/p/w500';
  // console.log(movie);
  const releaseYear = movie.release_date.slice(0, 4);
  const markup = `
        <li data-id=${movie.id}>
        <div class="movie-card card-hover">
            <img class="movie-card__img" src="${imgUrl}${movie.poster_path}" loading="lazy" 
            />
            <div class="movie-card__desc">
            <p class="movie-card__title">${movie.title}</p>
            <p class="movie-card__info"> ${movie.genres.map(genre => genre.name).slice(0,3).join(', ')} | ${releaseYear}</p>                     
            </div>
        </div>
        </li>
        `;
    
    
      queueMoviesDOM.insertAdjacentHTML('beforeend', markup);
      const movieList = document.querySelectorAll('li');
     movieList.forEach(movieListItem => {

      movieListItem.addEventListener('click', () => {
        const movieId = movieListItem.dataset.id;
        localStorage.setItem('movie-id', movieId);
        document.querySelector('.backdrop').classList.remove('is-hidden');
       
        
        selectedMovie.getSelectedMovieDetails(movieId)
        .then((movie) => selectedMovie.renderSelectedMovieDetails(movie))
        .catch((error) => console.log(error))
        
       
      } )
     }) 

    const libBtnQueue = document.querySelector('.active-button');
    const libBtnWatched = document.querySelector('.btn-watched');

    libBtnWatched.addEventListener('click', () => {
    queueMoviesDOM.classList.add('d-none');
    libBtnWatched.classList.add('active-button');
    libBtnQueue.classList.remove('active-button'); 

    })
    libBtnQueue.addEventListener('click', () => {
    queueMoviesDOM.classList.remove('d-none');
    libBtnWatched.classList.remove('active-button');
    libBtnQueue.classList.add('active-button'); 

    })

  })
}