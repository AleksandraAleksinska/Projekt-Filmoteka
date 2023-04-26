const movieCard = document.querySelector('.modal__movie');

const getSelectedMovieDetails = async id => {
  try {
    const API_KEY = 'ac3e035161883f7175e5be9954a0068d';
    const selectedMovieFetch = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`,
    );
    const selectedMovieData = await selectedMovieFetch.json();
    return selectedMovieData;
  } catch (error) {
    console.log(error.message);
  }
};

const renderSelectedMovieDetails = movie => {
  const imgUrl = 'https://image.tmdb.org/t/p/w500';
  const backdrop = document.querySelector('.backdrop');
    backdrop.style.backgroundImage = `url('${imgUrl}${movie.backdrop_path}')`;
  const selectedMovie = `<img class="modal__img" src="${imgUrl}${movie.poster_path}"></img>
        <div class="modal__wrapper">
            <h2 class="modal__title uppercase"> ${movie.title}</h2>
                <ul class="modal__info">
                    <li class="modal__info-item">
                        <p class="modal__info-key">Vote / Votes</p>
                        <p class="modal__info-number"><p class="rating-frame">${movie.vote_average.toFixed(
                          1,
                        )}</p>&nbsp/&nbsp<p class="rating-frame--gray">${movie.vote_count}</p></p>
                    </li>
                    <li class="modal__info-item">
                        <p class="modal__info-key">Popularity</p>
                        <p class="modal__info-number">${movie.popularity.toFixed(1)}</p>
                    </li>
                    <li class="modal__info-item">
                       <p class="modal__info-key">Original Title</p>
                       <p class="modal__info-value uppercase">${movie.original_title}</p>
                   </li>
                    <li class="modal__info-item">
                       <p class="modal__info-key">Genre</p>
                       <p class="modal__info-value">${movie.genres
                         .map(genre => genre.name)
                         .slice(0, 3)
                         .join(', ')}</p>
                   </li>
                </ul>
            <div class="modal__overview">
                <p class="modal__overview--about">about</p>
                <p>${movie.overview}</p>
            </div>
            <div class="modal__buttons">
                <button id="add-to-watched" class="button button--accent">add to watched</button>
                <button id="add-to-queue" class="button button--queue">add to queue</button>
            </div>
            <div class="modal__buttons">
                <button id="remove-from-watched" class="button button--accent d-none">remove from watched</button>
                <button id="remove-from-queue" class="button button--queue d-none">remove from queue</button>
            </div>
        </div>`;

  movieCard.innerHTML = selectedMovie;

  const btnAddToQueue = document.querySelector('.button--queue');
  const btnRemoveFromQueue = document.querySelector('#remove-from-queue');

  btnAddToQueue.addEventListener('click', () => {
    const currentQueue = JSON.parse(localStorage.getItem('queue-movie')) || [];
    const movieToAdd = { id: movie.id, title: movie.title };

    const isDuplicate = currentQueue.some(movie => movieToAdd.id === movie.id);
    if (!isDuplicate) {
        currentQueue.push(movie);
        localStorage.setItem('queue-movie', JSON.stringify(currentQueue));
      } else {
        console.log('Ten film już istnieje w liście do obejrzenia.');
        btnAddToQueue.classList.add('d-none');
        btnRemoveFromQueue.classList.remove('d-none');
        btnRemoveFromQueue.addEventListener('click', () => {
          console.log(currentQueue);
          const index = currentQueue.findIndex(movie => movie.id === movieToAdd.id);
          console.log(index)
          currentQueue.splice(index, 1);
          console.log(currentQueue);
          localStorage.setItem('queue-movie', JSON.stringify(currentQueue));
          window.location.reload();

        });
      }
  });

  const btnAddToWatched = document.querySelector('#add-to-watched');
  const btnRemoveFromWatched = document.querySelector('#remove-from-watched');

  btnAddToWatched.addEventListener('click', () => {
    const currentWatched = JSON.parse(localStorage.getItem('watched-movie')) || [];
    const movieToAdd = { id: movie.id, title: movie.title };

    const isDuplicate = currentWatched.some(movie => movieToAdd.id === movie.id);
    if (!isDuplicate) {
        currentWatched.push(movie);
        localStorage.setItem('watched-movie', JSON.stringify(currentWatched));
      } else {
        console.log('Ten film już istnieje w liście obejrzanych.');
        btnAddToWatched.classList.add('d-none');
        btnRemoveFromWatched.classList.remove('d-none');
        btnRemoveFromWatched.addEventListener('click', () => {
          console.log(currentWatched);
          const index = currentWatched.findIndex(movie => movie.id === movieToAdd.id);
          console.log(index)
          currentWatched.splice(index, 1);
          console.log(currentWatched);
          localStorage.setItem('watched-movie', JSON.stringify(currentWatched));
          window.location.reload();

        });
        
      }
  });
};

const selectedMovie = { getSelectedMovieDetails, renderSelectedMovieDetails };
export default selectedMovie;