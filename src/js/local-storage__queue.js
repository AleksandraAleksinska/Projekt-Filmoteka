import trendingMovies from './main-page-trending';

const queueButton = document.querySelector('.button--queue');
const { getTrendingMovies, renderTrendingMovies } = trendingMovies;

queueButton.addEventListener('click', () => {
  localStorage.setItem('queueElement'); // to tylko wstępny szkic, wiadomo, że w takiej formie nic nie robi
});
