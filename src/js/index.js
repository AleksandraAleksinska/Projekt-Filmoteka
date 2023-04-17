import '../sass/main.scss';

import trendingMovies from './main-page-trending';
import {fetchMovies} from './fetch.js';

const input = document.querySelector(".header-home__input");
input.addEventListener("input", (event)=> {
    console.log(event.currentTarget.value)
    trendingMovies
});