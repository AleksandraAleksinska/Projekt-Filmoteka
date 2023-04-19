const getAllGenres = async() => {
    const APIkey = 'ac3e035161883f7175e5be9954a0068d';
    const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${APIkey}`;
    try {
        const genresData = await fetch(url); 
        const genresDataJSON = await genresData.json();        
        return genresDataJSON;
    }
    catch (error) {
        console.log(error.message)
    }
}

getAllGenres()
.then((genresDataJSON) => movieGenres(genresDataJSON))
.catch((error) => console.log(error))


const movieGenres = (genresDataJSON) => {
    const genres = genresDataJSON.genres;
    localStorage.setItem('genres', JSON.stringify(genres));
}

export default getAllGenres;