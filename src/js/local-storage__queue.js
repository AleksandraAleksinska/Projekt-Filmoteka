// NIEDOKOŃCZONE

import trendingMovies from './main-page-trending';

const queueButton = document.querySelector('.button--queue');
const userQueue = document.querySelector('.btn-queue');
const { getTrendingMovies, renderTrendingMovies } = trendingMovies;

queueButton.addEventListener('click', () => {
  localStorage.setItem('queueElements', '');
});

userQueue.addEventListener('click', () => {
  localStorage.getItem('queueElements');
});
