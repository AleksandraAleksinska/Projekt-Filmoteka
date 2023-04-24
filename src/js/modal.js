import toggleModal from "./toggleModal";

const movieCard = document.querySelector('.modal__movie');

const getSelectedMovieDetails = async () => {
    try {
        const API_KEY = 'ac3e035161883f7175e5be9954a0068d';
        const selectedMovieFetch = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`);
        const selectedMovieData = await selectedMovieFetch.json();
        return selectedMovieData;      
    } catch (error) {
        console.log(error.message)
    }
}
const renderSelectedMovieDetails = (movie) => {
    const imgUrl = 'https://image.tmdb.org/t/p/w500';
    const backdrop = document.querySelector('.backdrop');
    backdrop.style.backgroundImage = `url('${imgUrl}${movie.backdrop_path}')`;

    const selectedMovie =
        `<img class="modal__img" src="${imgUrl}${movie.poster_path}"></img>
        <div class="modal__wrapper">
            <h2 class="modal__title uppercase"> ${movie.title}</h2>
                <ul class="modal__info">
                    <li class="modal__info-item">
                        <p class="modal__info-key">Vote / Votes</p>
                        <p class="modal__info-number"><p class="rating-frame">${movie.vote_average.toFixed(1)}</p>&nbsp/&nbsp<p class="rating-frame--gray">${movie.vote_count}</p></p>
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
                       <p class="modal__info-value">${movie.genres.map(genre => genre.name).slice(0,3).join(', ')}</p>
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
        </div>`

    movieCard.innerHTML = selectedMovie;

    const btnAddToQueue = document.querySelector('.button--queue');
    btnAddToQueue.addEventListener('click', () => {
        let queueArray = [];
        localStorage.setItem('queue-movie', JSON.stringify(movie));
    })
}

getSelectedMovieDetails()
    .then((movie) => renderSelectedMovieDetails(movie))
    .catch((error) => console.log(error));

const SelectedMovie = { getSelectedMovieDetails, renderSelectedMovieDetails }
export default SelectedMovie;