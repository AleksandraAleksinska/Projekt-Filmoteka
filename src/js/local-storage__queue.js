const queueButton = document.querySelector('.button--queue');
const userQueue = document.querySelector('.btn-queue');
const queueContainer = document.querySelector('.queue-container');
const queueList = document.querySelector('.queue-list');

const fetchMovies = async () => {
  try {
    const movieId = '';
    const API_KEY = 'ac3e035161883f7175e5be9954a0068d';
    const movieToQueue = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`,
    );
    const movieToQueueJSON = await movieToQueue.json();
    console.log(movieToQueueJSON);
    return movieToQueueJSON;
  } catch (error) {
    console.log(error.message);
  }
};

const addToQueue = movie => {
  const imgUrl = 'https://image.tmdb.org/t/p/w500';
  const usersMovie = `
  <div>
      <img src="${imgUrl}${movie.poster_path}" loading="lazy" 
      />
      <div>
      <p>${movie.title}</p>
      <p> ${movie.genre_ids
        .map(genre => genre.name)
        .slice(0, 3)
        .join(', ')} | ${movie.release_date}</p>                   
      </div>
  </div>`;
  queueList.innerHTML = usersMovie;
};

// queueButton.addEventListener('click', () => {
//   localStorage.setItem('queueElements', addToQueue);
// });

// userQueue.addEventListener('click', () => {
//   const queueElement = localStorage.getItem('queueElements');
//   const queueItem = document.createElement('li');
//   queueItem.textContent = queueElement;
//   queueList.appendChild(queueItem);
// });
