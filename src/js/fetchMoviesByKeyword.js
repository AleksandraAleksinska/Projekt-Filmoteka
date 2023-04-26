import selectedMovie from './modal';
import toggleModal from './toggleModal';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import showNotResult from './show-not-result'
import defaultFilmCardImage from '../images/no-image.png'


const API_KEY = 'ac3e035161883f7175e5be9954a0068d';
let keyword = '';
let page = 1;

const qs = s => document.querySelector(s);

const gallery = qs('.movie-list');
const form = qs('#header__form');


async function getMoviesbyKeyword(keyword,page=1) {
  Loader.open()
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${keyword}&page=${page}&language=en-US`,
  );
  Loader.close()
  const data = response.json();
  return data;
  
}

const handleSubmitKeyword = e => {
  e.preventDefault();
  keyword = e.currentTarget.name.value.trim();
  gallery.innerHTML = '';
  getMoviesbyKeyword(keyword)
    .then(data => {
      const pagination = new Pagination('pagination', {
        totalItems: data.total_results,
        itemsPerPage: 20,
        visiblePages: 5,
        centerAlign: true,
        currentPage: page,
      });
      pagination.on('beforeMove', event => {
        const currentPage = event.page;
        getMoviesbyKeyword(keyword, currentPage)
          .then(data => {
            gallery.innerHTML = '';
            renderMoviesList(data);
          })
          .catch(error => console.log(error));
      });
      renderMoviesList(data);
    })
    .catch(error => console.log(error.message));
};

const renderMoviesList = data => {
  const IMAGE_URL = 'https://image.tmdb.org/t/p/original';
  showNotResult.getShowNotResult(data.results.length);
  const markup = data.results
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
      <img class="movie-card__img" src="${poster_path ? IMAGE_URL+poster_path :defaultFilmCardImage }" loading="lazy"  
          />
          <div class="movie-card__desc">
          <p class="movie-card__title">${title}</p>
          <p class="movie-card__info"> ${movieGenres
        .slice(0, 3)
        .join(', ')} | ${releaseYear}</p>                     
          </div>
          </li>
          `;
    })
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);

  const movieList = document.querySelectorAll('li');
  movieList.forEach(movieListItem => {
    movieListItem.addEventListener('click', () => {
      const movieId = movieListItem.dataset.id;
      localStorage.setItem('movie-id', movieId);
      setTimeout(() => toggleModal.openModal(), 50);

      selectedMovie
        .getSelectedMovieDetails(movieId)
        .then(movie => selectedMovie.renderSelectedMovieDetails(movie))
        .catch(error => console.log(error));
    });
  });
};

if (form) {
  form.addEventListener('submit', handleSubmitKeyword);
}

export { getMoviesbyKeyword };
