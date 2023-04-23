import getAllGenres from './genres';



const trendingMoviesDOM = document.querySelector('.movie-list');

const getTrendingMovies = async (page = 1) => {
  const APIkey = 'ac3e035161883f7175e5be9954a0068d';
  const url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${APIkey}&page=${page}`;
  try {
    const moviesData = await fetch(url);
    const moviesDataJSON = await moviesData.json();
    return moviesDataJSON;
  } catch (error) {
    console.log(error.message);
  }
};
getTrendingMovies()
  .then(movies => renderTrendingMovies(movies))
  .catch(error => console.log(error));

const renderTrendingMovies = response => {
  const movies = response.results;
  // console.log(movies);
  const imgUrl = 'https://image.tmdb.org/t/p/w500';

  const markup = movies
    .map(({ poster_path, title, release_date, genre_ids, id }) => {
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
      return `
        <li data-id=${id}>
        <div class="movie-card card-hover">
            <img class="movie-card__img" src="${imgUrl}${poster_path}" loading="lazy" 
            />
            <div class="movie-card__desc">
            <p class="movie-card__title">${title}</p>
            <p class="movie-card__info"> ${movieGenres
              .slice(0, 3)
              .join(', ')} | ${releaseYear}</p>                     
            </div>
        </div>
        </li>
        `;
    })
    .join('');
    trendingMoviesDOM.innerHTML = markup;
    const movieList = document.querySelectorAll('li');
     movieList.forEach(movieListItem => {

      movieListItem.addEventListener('click', () => {
        movieId = movieListItem.dataset.id;
        localStorage.setItem('movie-id', movieId);
        document.querySelector('.backdrop').classList.remove('is-hidden');
        console.log(movieListItem);
        
        console.log(movieId);
        
        
       
      } )
     }) 

      // for (const movie of movies) {
      //   console.log(movie);
      //   const testCard = document.querySelector('.movie-card');
      //   const movieId = movie.id;3,
      //   testCard.addEventListener('click', () => {
      //     console.log('blablabla');
      //     document.querySelector('.movie-card').setAttribute('data-modal-open', '');
      //     console.log(movieId);
      //     // document.querySelector('.backdrop').classList.remove('is-hidden');
  
      //   })
      // } 
    

          
      
    

    }
   
   

const trendingMovies = { getTrendingMovies, renderTrendingMovies };
export default trendingMovies;

