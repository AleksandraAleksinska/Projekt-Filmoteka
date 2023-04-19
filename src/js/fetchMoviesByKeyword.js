export { getMoviesbyKeyword };

const API_KEY = 'ac3e035161883f7175e5be9954a0068d';
let keyword = '';
let page = 1;

const qs = s => document.querySelector(s);

const gallery = qs('.movie-list');
const form = qs('#header__form');

form.addEventListener('submit', handleSubmitKeyword);

async function getMoviesbyKeyword() {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${keyword}&page=${page}`,
  );
  const data = response.json();
  return data;
}

getMoviesbyKeyword()
  .then(data => console.log(data.results))
  .catch(({ message }) => console.log(message));

function  handleSubmitKeyword (e) {
  e.preventDefault();
  const API_KEY = 'ac3e035161883f7175e5be9954a0068d';
  keyword = e.currentTarget.name.value.trim();
  gallery.innerHTML = '';

  getMoviesbyKeyword(keyword)
    .then(data => {
      renderMoviesList(data);
    })
    .catch(({ message }) => console.log(message));

}

const renderMoviesList = data => {
  const IMAGE_URL = 'https://image.tmdb.org/t/p/original';
  const markup = data.results
    .map(
      ({ poster_path, title, release_date }) =>
        ` <li>
        <div class="movie-card">
            <img class="movie-card__img" src="${IMAGE_URL}${poster_path}" loading="lazy" 
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