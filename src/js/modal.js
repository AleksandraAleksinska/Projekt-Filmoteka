const movieCard = document.querySelector('.modal__movie');

const getSelectedMovieDetails = async () => {
    try {
        const id = 76600;
        const API_KEY = 'ac3e035161883f7175e5be9954a0068d';
        const selectedMovieFetch = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`);
        const selectedMovieData = await selectedMovieFetch.json();
        console.log(selectedMovieData);
        return selectedMovieData;      
    } catch (error) {
        console.log(error.message)
    }
}

const renderSelectedMovieDetails = (movie) => {
    const imgUrl = 'https://image.tmdb.org/t/p/w500';
    const selectedMovie =
        `<img class="modal__img" src="${imgUrl}${movie.poster_path}"></img>
        <h2 class="modal__title"> ${movie.title}</>
        <div class="modal__info-wrapper">
            <ul class="modal__info">
                <li class="modal__info modal__info--key">Vote / Votes</li>
                <li class="modal__info modal__info--key">Popularity</li>
                <li class="modal__info modal__info--key">Original Title</li>
                <li class="modal__info modal__info--key">Genre</li>
            </ul>
            <ul class="modal__info">
                <li class="modal__info modal__info--number"><span class="rating-frame">${movie.vote_average.toFixed(1)}</span> / <span class="rating-frame rating-frame--gray">${movie.vote_count}</span></li>
                <li class="modal__info modal__info--number">${movie.popularity.toFixed(1)}</li>
                <li class="modal__info modal__info--value">${movie.original_title}</li>
                <li class="modal__info modal__info--value">${movie.genres.map(genre => genre.name).join(', ')}</li>
            </ul>
        </div>
        <div class="modal__overview">
            <p class="modal__overview--about">about</p>
            <p>${movie.overview}</p>
        </div>`

    movieCard.innerHTML = selectedMovie;
}

getSelectedMovieDetails()
    .then((movie) => renderSelectedMovieDetails(movie))
    .catch((error) => console.log(error));

const SelectedMovie = { getSelectedMovieDetails, renderSelectedMovieDetails }
export default SelectedMovie;