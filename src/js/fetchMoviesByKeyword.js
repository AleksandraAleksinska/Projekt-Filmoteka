
export { getMoviesbyKeyword };

import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

const API_KEY = 'ac3e035161883f7175e5be9954a0068d';
let keyword = '';
let page = 1;

const qs = s => document.querySelector(s);

const gallery = qs('.movie-list');
const form = qs('#header__form');

async function getMoviesbyKeyword(keyword,page=1) {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${keyword}&page=${page}&language=en-US`,
  );
  const data = response.json();
  return data;
}

getMoviesbyKeyword()
  .then(data => console.log(data.results))
  .catch(({ message }) => console.log(message));

form.addEventListener('submit', handleSubmitKeyword);

const renderMoviesList = data => {
  const IMAGE_URL = 'https://image.tmdb.org/t/p/original';
  const markup = data.results
    .map(
      ({ poster_path, title, release_date }) =>
        ` <li>
        <div class="movie-card">
            <img class="movie-card__img" src="${poster_path ? IMAGE_URL+poster_path :'https://upload.wikimedia.org/wikipedia/commons/6/62/%22No_Image%22_placeholder.png' }" loading="lazy" 
            />
            <div class="movie-card__desc">
            <p class="movie-card__title">${title}</p>
            <p class="movie-card__info"> Drama, Action | ${release_date}</p>                     
            </div>
        </div>
        </li>
        `,
    )
    .join('');
      
  gallery.insertAdjacentHTML('beforeend', markup);
};


function handleSubmitKeyword(e) {
  e.preventDefault();
  keyword = e.currentTarget.name.value.trim();
  console.log(keyword);
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
}