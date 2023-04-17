//import axios from "axios";
export {fetchMovies};

//https://api.themoviedb.org/3/search/movie?api_key=ac3e035161883f7175e5be9954a0068d&query=cosmos&page=1


//axios.defaults.baseURL = `https://api.themoviedb.org/3/search/keyword?api_key=${APIkey}`;

const APIkey= "ac3e035161883f7175e5be9954a0068d";
const keyword ="cosmos";
let page =1; 


 async function getMoviesbyKeyword()  {
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${APIkey}&query=${keyword}&page=${page}`);
    const data = response.json();
    return data; 
  }

  getMoviesbyKeyword()
  .then(data => console.log(data.results))
  .catch(error => console.log(error.message));


  // async function getMoviesbyKeyword (keyword) {
//     const response = await axios.get(
//       `&query=${keyword}`,
//     );
//     return response;
//   }