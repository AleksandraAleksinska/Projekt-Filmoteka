import selectedMovie from './modal';

export { saveData };
export { addToLocalStorage };

const btnWatched = document.querySelector('#add-to-watched');

btnWatched.addEventListener('click', addToLocalStorage);

// function saveData(selectedMovieData) {

//   const movieDetails = JSON.stringify(selectedMovieData);
//     localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(movieDetails));
// }

function addToLocalStorage(movie) {
  const btnWatched = document.querySelector('#add-to-watched');
  console.log('hello');
  const statusWatched = localStorage.getItem('watched');

  if (!statusWatched) {
    btnWatched.addEventListener('click', addWatched);
  }

  function addWatched(e) {
    if (e.target.textContent === 'add to watched') {
      localStorage.setItem('watched', JSON.stringify([movie]));
    }
  }
}
