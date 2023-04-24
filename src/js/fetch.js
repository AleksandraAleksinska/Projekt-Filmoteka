// //import axios from "axios";
// export { getMoviesbyKeyword };

// //axios.defaults.baseURL = `https://api.themoviedb.org/3/search/keyword?api_key=${APIkey}`;

// //const trendingMoviesDOM = document.querySelector('.movie-list');
// const APIkey = 'ac3e035161883f7175e5be9954a0068d';
// let keyword = '';
// let page = 1;

// const gallery = document.querySelector('.movie-list');
// const form = document.querySelector('#header__form');
// //const input =document.querySelector(".header__input");
// form.addEventListener('submit', handleSubmit);

// async function getMoviesbyKeyword() {
//   const response = await fetch(
//     `https://api.themoviedb.org/3/search/movie?api_key=${APIkey}&query=${keyword}&page=${page}`,
//   );
//   const data = response.json();
//   return data;
// }

// getMoviesbyKeyword()
//   .then(data => console.log(data.results))
//   .catch(error => console.log(error.message));

// function handleSubmit(e) {
//   e.preventDefault();
//   //keyword=input.value.trim();
//   const APIkey = 'ac3e035161883f7175e5be9954a0068d';
//   keyword = e.currentTarget.name.value.trim();
//   console.log(keyword);
//   gallery.innerHTML = '';

//   getMoviesbyKeyword(keyword)
//     .then(data => {
//       renderMoviesList(data);
//     })
//     .catch(error => console.log(error.message));
//   //console.log(keyword);
// }

// function renderMoviesList(data) {
//   const URLimage = 'https://image.tmdb.org/t/p/original';
//   const markup = data.results
//     .map(
//       key =>
//         ` <li>
//         <div class="movie-card">
//             <img class="movie-card__img" src="${URLimage}${key.poster_path}" loading="lazy" 
//             />
//             <div class="movie-card__desc">
//             <p class="movie-card__title">${key.title}</p>
//             <p class="movie-card__info"> Drama, Action | ${key.release_date}</p>                     
//             </div>
//         </div>
//         </li>
//         `,
//     )
//     .join('');

//   return gallery.insertAdjacentHTML('beforeend', markup);
// }

// // async function getMoviesbyKeyword (keyword) {
// //     const response = await axios.get(
// //       `&query=${keyword}`,
// //     );
// //     return response;
// //   }
