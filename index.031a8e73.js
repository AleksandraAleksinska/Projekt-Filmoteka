const e=async()=>{try{const e=await fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=ac3e035161883f7175e5be9954a0068d");return await e.json()}catch(e){console.log(e.message)}};e().then((e=>o(e))).catch((e=>console.log(e)));const o=e=>{const o=e.genres;localStorage.setItem("genres",JSON.stringify(o))};const a=document.querySelector(".movie-list"),n=async()=>{try{const e=await fetch("https://api.themoviedb.org/3/trending/movie/day?api_key=ac3e035161883f7175e5be9954a0068d"),o=await e.json();return console.log(o),o}catch(e){console.log(e.message)}};n().then((e=>i(e))).catch((e=>console.log(e)));const i=e=>{const o=e.results,n=o.map((({poster_path:e,title:o,release_date:a,genre_ids:n})=>{const i=a.slice(0,4),t=localStorage.getItem("genres"),s=JSON.parse(t).flatMap((e=>{let o=[];return n.includes(e.id)&&o.push(e.name),o}));return console.log(s),`\n        <li>\n        <div class="movie-card card-hover">\n            <img class="movie-card__img" src="https://image.tmdb.org/t/p/w500${e}" loading="lazy" \n            />\n            <div class="movie-card__desc">\n            <p class="movie-card__title">${o}</p>\n            <p class="movie-card__info"> ${s.slice(0,3).join(", ")} | ${i}</p>                     \n            </div>\n        </div>\n        </li>\n        `})).join("");a.innerHTML=n};let t="";const s=document.querySelector(".movie-list");async function l(){return(await fetch(`https://api.themoviedb.org/3/search/movie?api_key=ac3e035161883f7175e5be9954a0068d&query=${t}&page=1`)).json()}document.querySelector("#header__form").addEventListener("submit",(function(e){e.preventDefault();t=e.currentTarget.name.value.trim(),console.log(t),s.innerHTML="",l().then((e=>{!function(e){const o="https://image.tmdb.org/t/p/original",a=e.results.map((e=>` <li>\n        <div class="movie-card">\n            <img class="movie-card__img" src="${o}${e.poster_path}" loading="lazy" \n            />\n            <div class="movie-card__desc">\n            <p class="movie-card__title">${e.title}</p>\n            <p class="movie-card__info"> Drama, Action | ${e.release_date}</p>                     \n            </div>\n        </div>\n        </li>\n        `)).join("");s.insertAdjacentHTML("beforeend",a)}(e)})).catch((e=>console.log(e.message)))})),l().then((e=>console.log(e.results))).catch((e=>console.log(e.message)));const c=document.querySelector(".modal__movie"),r=async()=>{try{const e=76600,o="ac3e035161883f7175e5be9954a0068d",a=await fetch(`https://api.themoviedb.org/3/movie/${e}?api_key=${o}&language=en-US`),n=await a.json();return console.log(n),n}catch(e){console.log(e.message)}},m=e=>{const o=`<img class="modal__img" src="https://image.tmdb.org/t/p/w500${e.poster_path}"></img>\n        <h2 class="modal__title"> ${e.title}</>\n        <div class="modal__info-wrapper">\n            <ul class="modal__info">\n                <li class="modal__info modal__info--key">Vote / Votes</li>\n                <li class="modal__info modal__info--key">Popularity</li>\n                <li class="modal__info modal__info--key">Original Title</li>\n                <li class="modal__info modal__info--key">Genre</li>\n            </ul>\n            <ul class="modal__info">\n                <li class="modal__info modal__info--number"><span class="rating-frame">${e.vote_average.toFixed(1)}</span> / <span class="rating-frame rating-frame--gray">${e.vote_count}</span></li>\n                <li class="modal__info modal__info--number">${e.popularity.toFixed(1)}</li>\n                <li class="modal__info modal__info--value">${e.original_title}</li>\n                <li class="modal__info modal__info--value">${e.genres.map((e=>e.name)).join(", ")}</li>\n            </ul>\n        </div>\n        <div class="modal__overview">\n            <p class="modal__overview--about">about</p>\n            <p>${e.overview}</p>\n        </div>`;c.innerHTML=o};r().then((e=>m(e))).catch((e=>console.log(e)));
//# sourceMappingURL=index.031a8e73.js.map
