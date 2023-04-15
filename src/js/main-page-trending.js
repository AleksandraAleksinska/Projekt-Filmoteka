
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
    const imgUrl = 'https://image.tmdb.org/t/p/w500';   
    const markup = (movies)    
    .map(({poster_path, title, release_date }) => {
        return `
        <div class="movie-card">
            <img src="${imgUrl}${poster_path}" loading="lazy" 
            width=336
            height=455/>
            <div class="movie-card_desc">
            <p class="movie-card_title">${title}</p>
            <p class="movie-card_info"> category ??? | ${release_date}</p>                     
            </div>
        </div>
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