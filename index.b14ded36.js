const e=document.querySelector(".movie-list"),n=async()=>{try{const e=await fetch("https://api.themoviedb.org/3/trending/movie/day?api_key=ac3e035161883f7175e5be9954a0068d"),n=await e.json();return console.log(n),n}catch(e){console.log(e.message)}},t=n=>{const t=n.results,i=t.map((({poster_path:e,title:n,release_date:t})=>`\n        <li>\n        <div class="movie-card">\n            <img class="movie-card__img" src="https://image.tmdb.org/t/p/w500${e}" loading="lazy" \n            />\n            <div class="movie-card__desc">\n            <p class="movie-card__title">${n}</p>\n            <p class="movie-card__info"> Drama, Action | ${t.slice(0,4)}</p>                     \n            </div>\n        </div>\n        </li>\n        `)).join("");e.innerHTML=i};n().then((e=>t(e))).catch((e=>console.log(e)));var i={getTrendingMovies:n,renderTrendingMovies:t};const o=document.querySelector(".button--queue"),{getTrendingMovies:s,renderTrendingMovies:a}=i;o.addEventListener("click",(()=>{localStorage.setItem("queueElement")}));
//# sourceMappingURL=index.b14ded36.js.map
