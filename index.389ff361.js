function e(e){return e&&e.__esModule?e.default:e}const t=async()=>{try{const e=await fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=ac3e035161883f7175e5be9954a0068d");return await e.json()}catch(e){console.log(e.message)}};t().then((e=>n(e))).catch((e=>console.log(e)));const n=e=>{const t=e.genres;localStorage.setItem("genres",JSON.stringify(t))};const i=document.querySelector(".modal__movie");var o={getSelectedMovieDetails:async e=>{try{const t="ac3e035161883f7175e5be9954a0068d",n=await fetch(`https://api.themoviedb.org/3/movie/${e}?api_key=${t}&language=en-US`);return await n.json()}catch(e){console.log(e.message)}},renderSelectedMovieDetails:e=>{const t="https://image.tmdb.org/t/p/w500";document.querySelector(".backdrop").style.backgroundImage=`url('${t}${e.backdrop_path}')`;const n=`<img class="modal__img" src="${t}${e.poster_path}"></img>\n        <div class="modal__wrapper">\n            <h2 class="modal__title uppercase"> ${e.title}</h2>\n                <ul class="modal__info">\n                    <li class="modal__info-item">\n                        <p class="modal__info-key">Vote / Votes</p>\n                        <p class="modal__info-number"><p class="rating-frame">${e.vote_average.toFixed(1)}</p>&nbsp/&nbsp<p class="rating-frame--gray">${e.vote_count}</p></p>\n                    </li>\n                    <li class="modal__info-item">\n                        <p class="modal__info-key">Popularity</p>\n                        <p class="modal__info-number">${e.popularity.toFixed(1)}</p>\n                    </li>\n                    <li class="modal__info-item">\n                       <p class="modal__info-key">Original Title</p>\n                       <p class="modal__info-value uppercase">${e.original_title}</p>\n                   </li>\n                    <li class="modal__info-item">\n                       <p class="modal__info-key">Genre</p>\n                       <p class="modal__info-value">${e.genres.map((e=>e.name)).slice(0,3).join(", ")}</p>\n                   </li>\n                </ul>\n            <div class="modal__overview">\n                <p class="modal__overview--about">about</p>\n                <p>${e.overview}</p>\n            </div>\n            <div class="modal__buttons">\n                <button id="add-to-watched" class="button button--accent">add to watched</button>\n                <button id="add-to-queue" class="button button--queue">add to queue</button>\n        </div>\n        </div>`;i.innerHTML=n;document.querySelector(".button--queue").addEventListener("click",(()=>{const t=JSON.parse(localStorage.getItem("queue-movie"))||[],n=e.id,i=(e.title,t.some((e=>n===e.id)));i?console.log("Ten film już istnieje w liście do obejrzenia."):(t.push(e),localStorage.setItem("queue-movie",JSON.stringify(t)))}));document.querySelector("#add-to-watched").addEventListener("click",(()=>{const t=JSON.parse(localStorage.getItem("watched-movie"))||[],n=e.id,i=(e.title,t.some((e=>n===e.id)));i?console.log("Ten film już istnieje w liście obejrzanych."):(t.push(e),localStorage.setItem("watched-movie",JSON.stringify(t)))}))}};var a=(()=>{const e={closeModalBtn:document.querySelector("[data-modal-close]"),modal:document.querySelector("[data-modal]")},t=()=>{e.modal.classList.add("is-hidden"),window.removeEventListener("keydown",n),e.closeModalBtn.classList.add("is-hidden--x")},n=()=>{document.addEventListener("keydown",(e=>{"Escape"===e.code&&t()}))},i=()=>{document.addEventListener("click",(e=>{e.target.classList.contains("backdrop")&&(t(),document.removeEventListener("click",i))}))};return{openModal:()=>{e.modal.classList.remove("is-hidden"),e.closeModalBtn.classList.remove("is-hidden--x"),window.addEventListener("keydown",n),window.addEventListener("click",i),e.closeModalBtn.addEventListener("click",t)},closeModal:t,closeOnBackdrop:i}})();const s=document.querySelector(".movie-list"),r=async(e=1)=>{const t=`https://api.themoviedb.org/3/trending/movie/day?api_key=ac3e035161883f7175e5be9954a0068d&page=${e}`;try{const e=await fetch(t);return await e.json()}catch(e){console.log(e.message)}};r().then((e=>c(e))).catch((e=>console.log(e)));const c=e=>{const t=e.results,n=t.map((({poster_path:e,title:t,release_date:n,genre_ids:i,id:o})=>{const a=n.slice(0,4),s=localStorage.getItem("genres");return`\n        <li data-id=${o}>\n        <div class="movie-card card-hover">\n            <img class="movie-card__img" src="${e?"https://image.tmdb.org/t/p/w500"+e:"https://upload.wikimedia.org/wikipedia/commons/6/62/%22No_Image%22_placeholder.png"}" loading="lazy" \n            />\n            <div class="movie-card__desc">\n            <p class="movie-card__title">${t}</p>\n            <p class="movie-card__info"> ${JSON.parse(s).flatMap((e=>{let t=[];return i.includes(e.id)&&t.push(e.name),t})).slice(0,3).join(", ")} | ${a}</p>                     \n            </div>\n        </div>\n        </li>\n        `})).join("");s&&(s.innerHTML=n);document.querySelectorAll("li").forEach((e=>{e.addEventListener("click",(()=>{const t=e.dataset.id;localStorage.setItem("movie-id",t),setTimeout((()=>a.openModal()),50),o.getSelectedMovieDetails(t).then((e=>o.renderSelectedMovieDetails(e))).catch((e=>console.log(e)))}))}))};var l={getTrendingMovies:r,renderTrendingMovies:c},u={};window,u=function(){return function(e){var t={};function n(i){if(t[i])return t[i].exports;var o=t[i]={i:i,l:!1,exports:{}};return e[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(i,o,function(t){return e[t]}.bind(null,o));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="dist",n(n.s=10)}([function(e,t,n){e.exports=function(e,t){var n,i,o,a,s=Object.prototype.hasOwnProperty;for(o=1,a=arguments.length;o<a;o+=1)for(i in n=arguments[o])s.call(n,i)&&(e[i]=n[i]);return e}},function(e,t,n){e.exports=function(e){return void 0===e}},function(e,t,n){e.exports=function(e){return e instanceof Array}},function(e,t,n){var i=n(2),o=n(17),a=n(6);e.exports=function(e,t,n){i(e)?o(e,t,n):a(e,t,n)}},function(e,t,n){e.exports=function(e){return"string"==typeof e||e instanceof String}},function(e,t,n){e.exports=function(e){return e instanceof Function}},function(e,t,n){e.exports=function(e,t,n){var i;for(i in n=n||null,e)if(e.hasOwnProperty(i)&&!1===t.call(n,e[i],i,e))break}},function(e,t,n){var i=n(18),o=n(0);e.exports=function(e,t){var n;return t||(t=e,e=null),n=t.init||function(){},e&&i(n,e),t.hasOwnProperty("static")&&(o(n,t.static),delete t.static),o(n.prototype,t),n}},function(e,t,n){var i=n(2);e.exports=function(e,t,n){var o,a;if(n=n||0,!i(t))return-1;if(Array.prototype.indexOf)return Array.prototype.indexOf.call(t,e,n);for(a=t.length,o=n;n>=0&&o<a;o+=1)if(t[o]===e)return o;return-1}},function(e,t,n){var i=n(29),o=n(30),a=n(5),s={capitalizeFirstLetter:function(e){return e.substring(0,1).toUpperCase()+e.substring(1,e.length)},isContained:function(e,t){return!!t&&(e===t||t.contains(e))},createElementByTemplate:function(e,t){var n=document.createElement("div"),o=a(e)?e(t):i(e,t);return n.innerHTML=o,n.firstChild},bind:function(e,t){var n,i=Array.prototype.slice;return e.bind?e.bind.apply(e,i.call(arguments,1)):(n=i.call(arguments,2),function(){return e.apply(t,n.length?n.concat(i.call(arguments)):arguments)})},sendHostName:function(){o("pagination","UA-129987462-1")}};e.exports=s},function(e,t,n){n(11),e.exports=n(12)},function(e,t,n){},function(e,t,n){var i=n(13),o=n(7),a=n(0),s=n(1),r=n(20),c=n(9),l={totalItems:10,itemsPerPage:10,visiblePages:10,page:1,centerAlign:!1,firstItemClassName:"tui-first-child",lastItemClassName:"tui-last-child",usageStatistics:!0},u=o({init:function(e,t){this._options=a({},l,t),this._currentPage=0,this._view=new r(e,this._options,c.bind(this._onClickHandler,this)),this._paginate(),this._options.usageStatistics&&c.sendHostName()},_setCurrentPage:function(e){this._currentPage=e||this._options.page},_getLastPage:function(){var e=Math.ceil(this._options.totalItems/this._options.itemsPerPage);return e||1},_getPageIndex:function(e){var t;return this._options.centerAlign?(t=e-Math.floor(this._options.visiblePages/2),t=Math.max(t,1),t=Math.min(t,this._getLastPage()-this._options.visiblePages+1)):Math.ceil(e/this._options.visiblePages)},_getRelativePage:function(e){var t="prev"===e,n=this.getCurrentPage();return t?n-1:n+1},_getMorePageIndex:function(e){var t=this._getPageIndex(this.getCurrentPage()),n=this._options.visiblePages,i="prev"===e;return this._options.centerAlign?i?t-1:t+n:i?(t-1)*n:t*n+1},_convertToValidPage:function(e){var t=this._getLastPage();return e=Math.max(e,1),e=Math.min(e,t)},_paginate:function(e){var t=this._makeViewData(e||this._options.page);this._setCurrentPage(e),this._view.update(t)},_makeViewData:function(e){var t={},n=this._getLastPage(),i=this._getPageIndex(e),o=this._getPageIndex(n),a=this._getEdge(e);return t.leftPageNumber=a.left,t.rightPageNumber=a.right,t.prevMore=i>1,t.nextMore=i<o,t.page=e,t.currentPageIndex=e,t.lastPage=n,t.lastPageListIndex=n,t},_getEdge:function(e){var t,n,i,o=this._getLastPage(),a=this._options.visiblePages,s=this._getPageIndex(e);return this._options.centerAlign?(i=Math.floor(a/2),(n=(t=Math.max(e-i,1))+a-1)>o&&(t=Math.max(o-a+1,1),n=o)):(t=(s-1)*a+1,n=s*a,n=Math.min(n,o)),{left:t,right:n}},_onClickHandler:function(e,t){switch(e){case"first":t=1;break;case"prev":t=this._getRelativePage("prev");break;case"next":t=this._getRelativePage("next");break;case"prevMore":t=this._getMorePageIndex("prev");break;case"nextMore":t=this._getMorePageIndex("next");break;case"last":t=this._getLastPage();break;default:if(!t)return}this.movePageTo(t)},reset:function(e){s(e)&&(e=this._options.totalItems),this._options.totalItems=e,this._paginate(1)},movePageTo:function(e){e=this._convertToValidPage(e),this.invoke("beforeMove",{page:e})&&(this._paginate(e),this.fire("afterMove",{page:e}))},setTotalItems:function(e){this._options.totalItems=e},setItemsPerPage:function(e){this._options.itemsPerPage=e},getCurrentPage:function(){return this._currentPage||this._options.page}});i.mixin(u),e.exports=u},function(e,t,n){var i=n(0),o=n(14),a=n(4),s=n(16),r=n(2),c=n(5),l=n(3),u=/\s+/g;function d(){this.events=null,this.contexts=null}d.mixin=function(e){i(e.prototype,d.prototype)},d.prototype._getHandlerItem=function(e,t){var n={handler:e};return t&&(n.context=t),n},d.prototype._safeEvent=function(e){var t,n=this.events;return n||(n=this.events={}),e&&((t=n[e])||(t=[],n[e]=t),n=t),n},d.prototype._safeContext=function(){var e=this.contexts;return e||(e=this.contexts=[]),e},d.prototype._indexOfContext=function(e){for(var t=this._safeContext(),n=0;t[n];){if(e===t[n][0])return n;n+=1}return-1},d.prototype._memorizeContext=function(e){var t,n;o(e)&&(t=this._safeContext(),(n=this._indexOfContext(e))>-1?t[n][1]+=1:t.push([e,1]))},d.prototype._forgetContext=function(e){var t,n;o(e)&&(t=this._safeContext(),(n=this._indexOfContext(e))>-1&&(t[n][1]-=1,t[n][1]<=0&&t.splice(n,1)))},d.prototype._bindEvent=function(e,t,n){var i=this._safeEvent(e);this._memorizeContext(n),i.push(this._getHandlerItem(t,n))},d.prototype.on=function(e,t,n){var i=this;a(e)?(e=e.split(u),l(e,(function(e){i._bindEvent(e,t,n)}))):s(e)&&(n=t,l(e,(function(e,t){i.on(t,e,n)})))},d.prototype.once=function(e,t,n){var i=this;if(s(e))return n=t,void l(e,(function(e,t){i.once(t,e,n)}));this.on(e,(function o(){t.apply(n,arguments),i.off(e,o,n)}),n)},d.prototype._spliceMatches=function(e,t){var n,i=0;if(r(e))for(n=e.length;i<n;i+=1)!0===t(e[i])&&(e.splice(i,1),n-=1,i-=1)},d.prototype._matchHandler=function(e){var t=this;return function(n){var i=e===n.handler;return i&&t._forgetContext(n.context),i}},d.prototype._matchContext=function(e){var t=this;return function(n){var i=e===n.context;return i&&t._forgetContext(n.context),i}},d.prototype._matchHandlerAndContext=function(e,t){var n=this;return function(i){var o=e===i.handler,a=t===i.context,s=o&&a;return s&&n._forgetContext(i.context),s}},d.prototype._offByEventName=function(e,t){var n=this,i=c(t),o=n._matchHandler(t);e=e.split(u),l(e,(function(e){var t=n._safeEvent(e);i?n._spliceMatches(t,o):(l(t,(function(e){n._forgetContext(e.context)})),n.events[e]=[])}))},d.prototype._offByHandler=function(e){var t=this,n=this._matchHandler(e);l(this._safeEvent(),(function(e){t._spliceMatches(e,n)}))},d.prototype._offByObject=function(e,t){var n,i=this;this._indexOfContext(e)<0?l(e,(function(e,t){i.off(t,e)})):a(t)?(n=this._matchContext(e),i._spliceMatches(this._safeEvent(t),n)):c(t)?(n=this._matchHandlerAndContext(t,e),l(this._safeEvent(),(function(e){i._spliceMatches(e,n)}))):(n=this._matchContext(e),l(this._safeEvent(),(function(e){i._spliceMatches(e,n)})))},d.prototype.off=function(e,t){a(e)?this._offByEventName(e,t):arguments.length?c(e)?this._offByHandler(e):s(e)&&this._offByObject(e,t):(this.events={},this.contexts=[])},d.prototype.fire=function(e){this.invoke.apply(this,arguments)},d.prototype.invoke=function(e){var t,n,i,o;if(!this.hasListener(e))return!0;for(t=this._safeEvent(e),n=Array.prototype.slice.call(arguments,1),i=0;t[i];){if(!1===(o=t[i]).handler.apply(o.context,n))return!1;i+=1}return!0},d.prototype.hasListener=function(e){return this.getListenerLength(e)>0},d.prototype.getListenerLength=function(e){return this._safeEvent(e).length},e.exports=d},function(e,t,n){var i=n(1),o=n(15);e.exports=function(e){return!i(e)&&!o(e)}},function(e,t,n){e.exports=function(e){return null===e}},function(e,t,n){e.exports=function(e){return e===Object(e)}},function(e,t,n){e.exports=function(e,t,n){var i=0,o=e.length;for(n=n||null;i<o&&!1!==t.call(n,e[i],i,e);i+=1);}},function(e,t,n){var i=n(19);e.exports=function(e,t){var n=i(t.prototype);n.constructor=e,e.prototype=n}},function(e,t,n){e.exports=function(e){function t(){}return t.prototype=e,new t}},function(e,t,n){var i=n(3),o=n(7),a=n(21),s=n(22),r=n(24),c=n(25),l=n(0),u=n(4),d=n(28),p=n(9),f={page:'<a href="#" class="tui-page-btn">{{page}}</a>',currentPage:'<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',moveButton:'<a href="#" class="tui-page-btn tui-{{type}}"><span class="tui-ico-{{type}}">{{type}}</span></a>',disabledMoveButton:'<span class="tui-page-btn tui-is-disabled tui-{{type}}"><span class="tui-ico-{{type}}">{{type}}</span></span>',moreButton:'<a href="#" class="tui-page-btn tui-{{type}}-is-ellip"><span class="tui-ico-ellip">...</span></a>'},h=["first","prev","next","last"],m=["prev","next"],g=o({init:function(e,t,n){this._containerElement=null,this._firstItemClassName=t.firstItemClassName,this._lastItemClassName=t.lastItemClassName,this._template=l({},f,t.template),this._buttons={},this._enabledPageElements=[],this._setRootElement(e),this._setMoveButtons(),this._setDisabledMoveButtons(),this._setMoreButtons(),this._attachClickEvent(n)},_setRootElement:function(e){if(u(e)?e=document.getElementById(e)||document.querySelector(e):e.jquery&&(e=e[0]),!d(e))throw new Error("The container element is invalid.");this._containerElement=e},_setMoveButtons:function(){i(h,(function(e){this._buttons[e]=p.createElementByTemplate(this._template.moveButton,{type:e})}),this)},_setDisabledMoveButtons:function(){i(h,(function(e){var t="disabled"+p.capitalizeFirstLetter(e);this._buttons[t]=p.createElementByTemplate(this._template.disabledMoveButton,{type:e})}),this)},_setMoreButtons:function(){i(m,(function(e){var t=e+"More";this._buttons[t]=p.createElementByTemplate(this._template.moreButton,{type:e})}),this)},_getContainerElement:function(){return this._containerElement},_appendFirstButton:function(e){var t;t=e.page>1?this._buttons.first:this._buttons.disabledFirst,this._getContainerElement().appendChild(t)},_appendPrevButton:function(e){var t;t=e.currentPageIndex>1?this._buttons.prev:this._buttons.disabledPrev,this._getContainerElement().appendChild(t)},_appendNextButton:function(e){var t;t=e.currentPageIndex<e.lastPageListIndex?this._buttons.next:this._buttons.disabledNext,this._getContainerElement().appendChild(t)},_appendLastButton:function(e){var t;t=e.page<e.lastPage?this._buttons.last:this._buttons.disabledLast,this._getContainerElement().appendChild(t)},_appendPrevMoreButton:function(e){var t;e.prevMore&&(t=this._buttons.prevMore,c(t,this._firstItemClassName),this._getContainerElement().appendChild(t))},_appendNextMoreButton:function(e){var t;e.nextMore&&(t=this._buttons.nextMore,c(t,this._lastItemClassName),this._getContainerElement().appendChild(t))},_appendPages:function(e){var t,n,i=e.leftPageNumber,o=e.rightPageNumber;for(n=i;n<=o;n+=1)n===e.page?t=p.createElementByTemplate(this._template.currentPage,{page:n}):(t=p.createElementByTemplate(this._template.page,{page:n}),this._enabledPageElements.push(t)),n!==i||e.prevMore||c(t,this._firstItemClassName),n!==o||e.nextMore||c(t,this._lastItemClassName),this._getContainerElement().appendChild(t)},_attachClickEvent:function(e){var t=this._getContainerElement();s(t,"click",(function(t){var n,i,o=a(t);r(t),(i=this._getButtonType(o))||(n=this._getPageNumber(o)),e(i,n)}),this)},_getButtonType:function(e){var t,n=this._buttons;return i(n,(function(n,i){return!p.isContained(e,n)||(t=i,!1)}),this),t},_getPageNumber:function(e){var t,n=this._findPageElement(e);return n&&(t=parseInt(n.innerText,10)),t},_findPageElement:function(e){for(var t,n=0,i=this._enabledPageElements.length;n<i;n+=1)if(t=this._enabledPageElements[n],p.isContained(e,t))return t;return null},_empty:function(){this._enabledPageElements=[],i(this._buttons,(function(e,t){this._buttons[t]=e.cloneNode(!0)}),this),this._getContainerElement().innerHTML=""},update:function(e){this._empty(),this._appendFirstButton(e),this._appendPrevButton(e),this._appendPrevMoreButton(e),this._appendPages(e),this._appendNextMoreButton(e),this._appendNextButton(e),this._appendLastButton(e)}});e.exports=g},function(e,t,n){e.exports=function(e){return e.target||e.srcElement}},function(e,t,n){var i=n(4),o=n(3),a=n(23);function s(e,t,n,i){function s(t){n.call(i||e,t||window.event)}"addEventListener"in e?e.addEventListener(t,s):"attachEvent"in e&&e.attachEvent("on"+t,s),function(e,t,n,i){var s=a(e,t),r=!1;o(s,(function(e){return e.handler!==n||(r=!0,!1)})),r||s.push({handler:n,wrappedHandler:i})}(e,t,n,s)}e.exports=function(e,t,n,a){i(t)?o(t.split(/\s+/g),(function(t){s(e,t,n,a)})):o(t,(function(t,i){s(e,i,t,n)}))}},function(e,t,n){var i="_feEventKey";e.exports=function(e,t){var n,o=e[i];return o||(o=e[i]={}),(n=o[t])||(n=o[t]=[]),n}},function(e,t,n){e.exports=function(e){e.preventDefault?e.preventDefault():e.returnValue=!1}},function(e,t,n){var i=n(3),o=n(8),a=n(26),s=n(27);e.exports=function(e){var t,n=Array.prototype.slice.call(arguments,1),r=e.classList,c=[];r?i(n,(function(t){e.classList.add(t)})):((t=a(e))&&(n=[].concat(t.split(/\s+/),n)),i(n,(function(e){o(e,c)<0&&c.push(e)})),s(e,c))}},function(e,t,n){var i=n(1);e.exports=function(e){return e&&e.className?i(e.className.baseVal)?e.className:e.className.baseVal:""}},function(e,t,n){var i=n(2),o=n(1);e.exports=function(e,t){t=(t=i(t)?t.join(" "):t).replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,""),o(e.className.baseVal)?e.className=t:e.className.baseVal=t}},function(e,t,n){e.exports=function(e){return"object"==typeof HTMLElement?e&&(e instanceof HTMLElement||!!e.nodeType):!(!e||!e.nodeType)}},function(e,t,n){var i=n(8),o=n(3),a=n(2),s=n(4),r=n(0),c=/{{\s?|\s?}}/g,l=/^[a-zA-Z0-9_@]+\[[a-zA-Z0-9_@"']+\]$/,u=/\[\s?|\s?\]/,d=/^[a-zA-Z_]+\.[a-zA-Z_]+$/,p=/\./,f=/^["']\w+["']$/,h=/"|'/g,m=/^-?\d+\.?\d*$/,g={if:function(e,t,n){var i=function(e,t){var n=[e],i=[],a=0,s=0;return o(t,(function(e,o){0===e.indexOf("if")?a+=1:"/if"===e?a-=1:a||0!==e.indexOf("elseif")&&"else"!==e||(n.push("else"===e?["true"]:e.split(" ").slice(1)),i.push(t.slice(s,o)),s=o+1)})),i.push(t.slice(s)),{exps:n,sourcesInsideIf:i}}(e,t),a=!1,s="";return o(i.exps,(function(e,t){return(a=b(e,n))&&(s=x(i.sourcesInsideIf[t],n)),!a})),s},each:function(e,t,n){var i=b(e,n),s=a(i)?"@index":"@key",c={},l="";return o(i,(function(e,i){c[s]=i,c["@this"]=e,r(n,c),l+=x(t.slice(),n)})),l},with:function(e,t,n){var o=i("as",e),a=e[o+1],s=b(e.slice(0,o),n),c={};return c[a]=s,x(t,r(n,c))||""}},v=3==="a".split(/a/).length?function(e,t){return e.split(t)}:function(e,t){var n,i,o=[],a=0;for(t.global||(t=new RegExp(t,"g")),n=t.exec(e);null!==n;)i=n.index,o.push(e.slice(a,i)),a=i+n[0].length,n=t.exec(e);return o.push(e.slice(a)),o};function _(e,t){var n,i=t[e];return"true"===e?i=!0:"false"===e?i=!1:f.test(e)?i=e.replace(h,""):l.test(e)?i=_((n=e.split(u))[0],t)[_(n[1],t)]:d.test(e)?i=_((n=e.split(p))[0],t)[n[1]]:m.test(e)&&(i=parseFloat(e)),i}function y(e,t,n){for(var i,o,a,r,c=g[e],l=1,u=2,d=t[u];l&&s(d);)0===d.indexOf(e)?l+=1:0===d.indexOf("/"+e)&&(l-=1,i=u),d=t[u+=2];if(l)throw Error(e+" needs {{/"+e+"}} expression.");return t[0]=c(t[0].split(" ").slice(1),(o=0,a=i,(r=t.splice(o+1,a-o)).pop(),r),n),t}function b(e,t){var n=_(e[0],t);return n instanceof Function?function(e,t,n){var i=[];return o(t,(function(e){i.push(_(e,n))})),e.apply(null,i)}(n,e.slice(1),t):n}function x(e,t){for(var n,i,o,a=1,r=e[a];s(r);)i=(n=r.split(" "))[0],g[i]?(o=y(i,e.splice(a,e.length-a),t),e=e.concat(o)):e[a]=b(n,t),r=e[a+=2];return e.join("")}e.exports=function(e,t){return x(v(e,c),t)}},function(e,t,n){var i=n(1),o=n(31);e.exports=function(e,t){var n=location.hostname,a="TOAST UI "+e+" for "+n+": Statistics",s=window.localStorage.getItem(a);(i(window.tui)||!1!==window.tui.usageStatistics)&&(s&&!function(e){return(new Date).getTime()-e>6048e5}(s)||(window.localStorage.setItem(a,(new Date).getTime()),setTimeout((function(){"interactive"!==document.readyState&&"complete"!==document.readyState||o("https://www.google-analytics.com/collect",{v:1,t:"event",tid:t,cid:n,dp:n,dh:e,el:e,ec:"use"})}),1e3)))}},function(e,t,n){var i=n(6);e.exports=function(e,t){var n=document.createElement("img"),o="";return i(t,(function(e,t){o+="&"+t+"="+e})),o=o.substring(1),n.src=e+"?"+o,n.style.display="none",document.body.appendChild(n),document.body.removeChild(n),n}}])}();let d="";const p=e=>document.querySelector(e),f=p(".movie-list"),h=p("#header__form");async function m(e,t=1){return(await fetch(`https://api.themoviedb.org/3/search/movie?api_key=ac3e035161883f7175e5be9954a0068d&query=${e}&page=${t}&language=en-US`)).json()}const g=e=>{const t=e.results.map((({poster_path:e,title:t,release_date:n,genre_ids:i,id:o})=>{const a=n.slice(0,4),s=localStorage.getItem("genres");return`\n      <li data-id=${o}>\n      <div class="movie-card card-hover">\n      <img class="movie-card__img" src="${e?"https://image.tmdb.org/t/p/original"+e:"https://upload.wikimedia.org/wikipedia/commons/6/62/%22No_Image%22_placeholder.png"}" loading="lazy"  \n          />\n          <div class="movie-card__desc">\n          <p class="movie-card__title">${t}</p>\n          <p class="movie-card__info"> ${JSON.parse(s).flatMap((e=>{let t=[];return i.includes(e.id)&&t.push(e.name),t})).slice(0,3).join(", ")} | ${a}</p>                     \n          </div>\n      </div>\n      </li>\n      `})).join("");f.insertAdjacentHTML("beforeend",t);document.querySelectorAll("li").forEach((e=>{e.addEventListener("click",(()=>{const t=e.dataset.id;localStorage.setItem("movie-id",t),setTimeout((()=>a.openModal()),50),o.getSelectedMovieDetails(t).then((e=>o.renderSelectedMovieDetails(e))).catch((e=>console.log(e)))}))}))};h&&h.addEventListener("submit",(t=>{t.preventDefault(),d=t.currentTarget.name.value.trim(),f.innerHTML="",m(d).then((t=>{new(e(u))("pagination",{totalItems:t.total_results,itemsPerPage:20,visiblePages:5,centerAlign:!0,currentPage:1}).on("beforeMove",(e=>{const t=e.page;m(d,t).then((e=>{f.innerHTML="",g(e)})).catch((e=>console.log(e)))})),g(t)})).catch((e=>console.log(e.message)))}));const v=async()=>{try{const t=await l.getTrendingMovies();(t=>{const n={totalItems:t,itemsPerPage:20,visiblePages:5,centerAlign:!0};return new(e(u))("pagination",n)})(t.total_results).on("afterMove",(e=>{const t=e.page;Loader.open(),l.getTrendingMovies(t).then((e=>{Loader.close(),l.renderTrendingMovies(e)})).catch((e=>console.log(e)))}))}catch(e){console.log(e)}};v();const _=document.querySelector(".users-queue-list"),y=document.querySelector(".users-watched-list"),b=localStorage.getItem("queue-movie"),x=JSON.parse(b);if(_)if(x){x.forEach((e=>{const t=e.release_date.slice(0,4),n=`\n          <li data-id=${e.id}>\n          <div class="movie-card card-hover">\n              <img class="movie-card__img" src="${e.poster_path?"https://image.tmdb.org/t/p/w500"+e.poster_path:"https://upload.wikimedia.org/wikipedia/commons/6/62/%22No_Image%22_placeholder.png"}" loading="lazy" \n              />\n              <div class="movie-card__desc">\n              <p class="movie-card__title">${e.title}</p>\n              <p class="movie-card__info"> ${e.genres.map((e=>e.name)).slice(0,3).join(", ")} | ${t}</p>                     \n              </div>\n          </div>\n          </li>\n          `;_.insertAdjacentHTML("beforeend",n);document.querySelectorAll("li").forEach((e=>{e.addEventListener("click",(()=>{const t=e.dataset.id;localStorage.setItem("movie-id",t),document.querySelector(".backdrop").classList.remove("is-hidden"),o.getSelectedMovieDetails(t).then((e=>o.renderSelectedMovieDetails(e))).catch((e=>console.log(e)))}))}));const i=document.querySelector(".active-button"),a=document.querySelector(".btn-watched");a.addEventListener("click",(()=>{_.classList.add("d-none"),y.classList.remove("d-none"),a.classList.add("active-button"),i.classList.remove("active-button")})),i.addEventListener("click",(()=>{y.classList.add("d-none"),_.classList.remove("d-none"),a.classList.remove("active-button"),i.classList.add("active-button")}))}))}else console.log("You don’t have any video in queue");const M=document.querySelector(".users-queue-list"),P=document.querySelector(".users-watched-list"),E=localStorage.getItem("watched-movie"),w=JSON.parse(E);if(P)if(w){w.forEach((e=>{const t=e.release_date.slice(0,4),n=`\n            <li data-id=${e.id}>\n            <div class="movie-card card-hover">\n                <img class="movie-card__img" src="${e.poster_path?"https://image.tmdb.org/t/p/w500"+e.poster_path:"https://upload.wikimedia.org/wikipedia/commons/6/62/%22No_Image%22_placeholder.png"}" loading="lazy" \n                />\n                <div class="movie-card__desc">\n                <p class="movie-card__title">${e.title}</p>\n                <p class="movie-card__info"> ${e.genres.map((e=>e.name)).slice(0,3).join(", ")} | ${t}</p>                     \n                </div>\n            </div>\n            </li>\n            `;P.insertAdjacentHTML("beforeend",n);document.querySelectorAll("li").forEach((e=>{e.addEventListener("click",(()=>{const t=e.dataset.id;localStorage.setItem("movie-id",t),document.querySelector(".backdrop").classList.remove("is-hidden"),o.getSelectedMovieDetails(t).then((e=>o.renderSelectedMovieDetails(e))).catch((e=>console.log(e)))}))}));const i=document.querySelector(".active-button"),a=document.querySelector(".btn-watched");a.addEventListener("click",(()=>{M.classList.add("d-none"),P.classList.remove("d-none"),a.classList.add("active-button"),i.classList.remove("active-button")})),i.addEventListener("click",(()=>{P.classList.add("d-none"),M.classList.remove("d-none"),a.classList.remove("active-button"),i.classList.add("active-button")}))}))}else console.log("You haven’t watched any video");
//# sourceMappingURL=index.389ff361.js.map