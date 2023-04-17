const movieCard = document.querySelector('.modal__movie');

const getSelectedMovieDetails = async () => {
    try {
        const APIkey = 'ac3e035161883f7175e5be9954a0068d';
        const selectedMovieFetch = await fetch(`https://api.themoviedb.org/3/movie/76600?api_key=${APIkey}&language=en-US`);
        const selectedMovieData = await selectedMovieFetch.json();
        console.log(selectedMovieData);
        return selectedMovieData;
        
    } catch (error) {
        console.log(error.message)
    }     
}

const renderSelectedMovieDetails = (selectedMovieData) => {
    const imgUrl = 'https://image.tmdb.org/t/p/w500';
    const movie = selectedMovieData.map((movie) => {
        return `<img class="modal__img" src="${imgUrl}${movie.poster_path}"></img>
        <h2 class="modal__title">${movie.title}</h2>
        <div class="modal__info">
            <ul class="modal__info-keys">
                <li class="modal__info-key">Vote / Votes</li>
                <li class="modal__info-key">Popularity</li>
                <li class="modal__info-key">Original Title</li>
                <li class="modal__info-key">Genre</li>
            </ul>
            <ul class="modal__info-values">
                <li class="modal__info-key">${movie.vote_average} / ${movie.vote_count}</li>
                <li class="modal__info-key">${movie.popularity}</li>
                <li class="modal__info-key">${movie.original_title}</li>
                <li class="modal__info-key">${movie.genres.values}</li>
            </ul>
            <div class="modal__overview-wrapper">
                <p class="modal__about">about</p>
                <p class="modal__overview">${movie.overview}</p>
            </div>
        </div>`
    }).join('');
    movieCard.innerHTML = movie;
}


getSelectedMovieDetails()
renderSelectedMovieDetails(getSelectedMovieDetails)

const SelectedMovie = { getSelectedMovieDetails, renderSelectedMovieDetails }
export default SelectedMovie;