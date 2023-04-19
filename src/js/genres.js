// const getGenres = async() => {
//     const APIkey = 'ac3e035161883f7175e5be9954a0068d';
//     const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${APIkey}`;
//     try {
//         const genresData = await fetch(url); 
//         const genresDataJSON = genresData.json();
//         return genresDataJSON;
//     }
//     catch (error) {
//         console.log(error.message)
//     }
// }



// getGenres()
// .then((genresDataJSON) => console.log(genresDataJSON.genres))
// .catch((error) => console.log(error))

// export default getGenres;

const genres = [
    {"id":28,"name":"Action"},
    {"id":12,"name":"Adventure"},
    {"id":16,"name":"Animation"},
    {"id":35,"name":"Comedy"},
    {"id":80,"name":"Crime"},
    {"id":99,"name":"Documentary"},
    {"id":18,"name":"Drama"},
    {"id":10751,"name":"Family"},
    {"id":14,"name":"Fantasy"},
    {"id":36,"name":"History"},
    {"id":27,"name":"Horror"},{"id":10402,"name":"Music"},
    {"id":9648,"name":"Mystery"},
    {"id":10749,"name":"Romance"},
    {"id":878,"name":"Science Fiction"},
    {"id":10770,"name":"TV Movie"},
    {"id":53,"name":"Thriller"},
    {"id":10752,"name":"War"},
    {"id":37,"name":"Western"}];

    export default genres;