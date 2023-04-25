import selectedMovie from "./modal";

const queueMoviesDOM = document.querySelector('.users-queue-list');
const watchedMoviesDOM = document.querySelector('.users-watched-list');
const savedMovies = localStorage.getItem('queue-movie');
const parsedMovies = JSON.parse(savedMovies);

if(queueMoviesDOM) {

const renderQueueMovie = parsedMovies.forEach((movie) => {
  
  const imgUrl = 'https://image.tmdb.org/t/p/w500';
  const releaseYear = movie.release_date.slice(0, 4);
  const markup = `
        <li data-id=${movie.id}>
        <div class="movie-card card-hover">
            <img class="movie-card__img" src="${movie.poster_path ? imgUrl+movie.poster_path :'https://upload.wikimedia.org/wikipedia/commons/6/62/%22No_Image%22_placeholder.png' }" loading="lazy" 
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
      watchedMoviesDOM.classList.remove('d-none');
      libBtnWatched.classList.add('active-button');
      libBtnQueue.classList.remove('active-button'); 
  
      })
      libBtnQueue.addEventListener('click', () => {
      watchedMoviesDOM.classList.add('d-none');
      queueMoviesDOM.classList.remove('d-none');      
      libBtnWatched.classList.remove('active-button');
      libBtnQueue.classList.add('active-button'); 
  
      })

  })
}