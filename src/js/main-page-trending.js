// import getGenres from "./genres";

import genres from "./genres";
console.log(genres);
const trendingMoviesDOM = document.querySelector('.movie-list');



const getTrendingMovies = async () => {
    const APIkey = 'ac3e035161883f7175e5be9954a0068d';
    const url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${APIkey}`;
    try{
        const response = await fetch(url);
        const responseJSON = await response.json();
        console.log(responseJSON);
        return responseJSON;
        
    } catch (error) {
        console.log(error.message)
    }     
}

const renderTrendingMovies = (response) => {
    const movies = response.results; 
    console.log(movies);
    const imgUrl = 'https://image.tmdb.org/t/p/w500'; 
   
    const markup = (movies)   
    .map(({poster_path, title, release_date, genre_ids}) => {
        const realeseYear = release_date.slice(0, 4);
        
        // const movieGenres = (genres).map((genre) => {
        //     if (genre_ids[0] ===genre.id) {
        //     console.log(genre.id);
        //     return genre.name;
                
        //     }
        // })

        const movieGenres = genres.forEach((genre) => {
            let genresArray = [];
            if(genre_ids.includes(genre.id) ) {
                genresArray.push(genre.name);
                
            }
            console.log(genresArray);
            return genresArray;
        })
        
        return `
        <li>
        <div class="movie-card">
            <img class="movie-card__img" src="${imgUrl}${poster_path}" loading="lazy" 
            />
            <div class="movie-card__desc">
            <p class="movie-card__title">${title}</p>
            <p class="movie-card__info"> ${movieGenres} | ${realeseYear}</p>                     
            </div>
        </div>
        </li>
        `
    })
    .join('');
    trendingMoviesDOM.innerHTML=markup;

}

getTrendingMovies()
.then((movies) => renderTrendingMovies(movies))
.catch((error) => console.log(error));

const trendingMovies = {getTrendingMovies, renderTrendingMovies};
export default trendingMovies;