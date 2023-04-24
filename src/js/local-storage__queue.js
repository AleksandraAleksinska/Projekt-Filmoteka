import selectedMovie from "./modal";

const queueMoviesDOM = document.querySelector('.users-queue-list');
const savedMovieId = localStorage.getItem('movie-id');
const parsedMovieId = JSON.parse(savedMovieId);

const getQueueMovie = async (page = 1) => {
  const APIkey = 'ac3e035161883f7175e5be9954a0068d';
  const url = `https://api.themoviedb.org/3/movie/${parsedMovieId}?api_key=${APIkey}&page=${page}`;
  try {
    const movieData = await fetch(url);
    const movieDataJSON = await movieData.json();
    console.log(movieDataJSON)
    return movieDataJSON;
    
  } catch (error) {
    console.log(error.message);
  }
};
getQueueMovie()
  .then(movie => renderQueueMovie(movie))
  .catch(error => console.log(error));

const renderQueueMovie = (movie) => {
  
  const imgUrl = 'https://image.tmdb.org/t/p/w500';
  console.log(movie);
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

    }
   
   






















// const queueButton = document.querySelector('.button--queue');
// const userQueue = document.querySelector('.btn-queue');
// const queueContainer = document.querySelector('.queue-container');
// const queueList = document.querySelector('.queue-list');



// const fetchMovies = async () => {
//   try {
//     const movieId = '';
//     const API_KEY = 'ac3e035161883f7175e5be9954a0068d';
//     const movieToQueue = await fetch(
//       `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`,
//     );
//     const movieToQueueJSON = await movieToQueue.json();
//     console.log(movieToQueueJSON);
//     return movieToQueueJSON;
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// const addToQueue = movie => {
//   const imgUrl = 'https://image.tmdb.org/t/p/w500';
//   const usersMovie = `
//   <div>
//       <img src="${imgUrl}${movie.poster_path}" loading="lazy" 
//       />
//       <div>
//       <p>${movie.title}</p>
//       <p> ${movie.genre_ids
//         .map(genre => genre.name)
//         .slice(0, 3)
//         .join(', ')} | ${movie.release_date}</p>                   
//       </div>
//   </div>`;
//   queueList.innerHTML = usersMovie;
// };

// // queueButton.addEventListener('click', () => {
// //   localStorage.setItem('queueElements', addToQueue);
// // });

// // userQueue.addEventListener('click', () => {
// //   const queueElement = localStorage.getItem('queueElements');
// //   const queueItem = document.createElement('li');
// //   queueItem.textContent = queueElement;
// //   queueList.appendChild(queueItem);
// // });
