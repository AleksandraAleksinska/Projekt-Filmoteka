const e=document.querySelector(".movie-list"),t=async()=>{try{const e=await fetch("https://api.themoviedb.org/3/trending/movie/day?api_key=ac3e035161883f7175e5be9954a0068d"),t=await e.json();return console.log(t),t}catch(e){console.log(e.message)}},a=t=>{const a=t.results,o=a.map((({poster_path:e,title:t,release_date:a})=>`\n        <div class="movie-card">\n            <img src="https://image.tmdb.org/t/p/w500${e}" loading="lazy" \n            width=336\n            height=455/>\n            <div class="movie-card_desc">\n            <p class="movie-card_title">${t}</p>\n            <p class="movie-card_info"> category ??? | ${a}</p>                     \n            </div>\n        </div>\n        `)).join("");e.innerHTML=o};t().then((e=>a(e))).catch((e=>console.log(e)));
//# sourceMappingURL=index.b36d534f.js.map
