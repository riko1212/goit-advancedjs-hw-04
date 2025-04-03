import{a as f,i,S as p}from"./assets/vendor-Cgc9PhsO.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function s(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(o){if(o.ep)return;o.ep=!0;const n=s(o);fetch(o.href,n)}})();const c=(e,t,s="beforeend")=>{e.insertAdjacentHTML(s,t)},v=e=>{e.innerHTML=""},L=e=>{c(e,`
    <form class="search-form" id="search-form">
      <input
        type="text"
        name="search"
        autocomplete="off"
        placeholder="Search images..."
      />
      <button type="submit" class="button">Search</button>
    </form>
  `)},b=e=>{c(e,'<div class="gallery" id="gallery"></div>')},w=(e,t)=>{const s=t.map(r=>`
    <div class="gallery-item">
      <a href="${r.largeImageURL}">
        <img src="${r.webformatURL}" alt="${r.tags}" loading="lazy" />
      </a>
      <div class="gallery-item-info">
        <div>
          <b>Likes</b>
          ${r.likes}
        </div>
        <div>
          <b>Views</b>
          ${r.views}
        </div>
        <div>
          <b>Comments</b>
          ${r.comments}
        </div>
        <div>
          <b>Downloads</b>
          ${r.downloads}
        </div>
      </div>
    </div>
  `).join("");c(e,s)},u=(e,t)=>{w(e,t)},S=(e,t)=>{v(e),t&&t.length&&u(e,t)},I=e=>{c(e,`
    <div class="loader-wrapper hidden">
      <div class="loading ">Loading images, please wait...</div>
      <span class="loader"></span>
    </div>
  `)},q=e=>{c(e,`
    <button type="button" class="button load-more hidden">Load more</button>
  `)},E="45273601-269fa7243c6da01438f09c62a",x=f.create({baseURL:"https://pixabay.com/api",params:{key:E}}),g=async(e,t=1,s=15)=>{try{const{data:r}=await x.get("/",{params:{q:e,image_type:"photo",orientation:"horizontal",page:t,per_page:s}});return{images:r.hits,total:r.totalHits}}catch(r){return i.error({icon:"",iconText:"",title:"❌ Error",message:`Error while fetching images. Please try again! ${r}`}),{images:[],total:0}}};i.settings({timeout:3e3});const h=new p("#gallery a",{captionDelay:250,captionsData:"alt"}),d=[];let l="",m=1;const y=()=>{i.warning({icon:"",iconText:"",title:"⚠️ Warning",message:"We're sorry, but you've reached the end of search results."})},P=()=>{d.length=0,m=1},T=async(e,t)=>{e.preventDefault(),l=t.elements.search.value;const s=document.querySelector(".loader-wrapper");if(l.trim()!==""){const r=document.querySelector("#gallery");s.classList.remove("hidden"),P();const{images:o,total:n}=await g(l,m);if(S(r,o),o.length){const a=document.querySelector(".load-more");d.push(...o),o.length>=n?(y(),a.classList.add("hidden")):a.classList.remove("hidden"),h.refresh()}else i.error({icon:"",iconText:"",title:"❌ Error",message:"Sorry, there are no images matching your search query. Please try again!"})}else i.warning({icon:"",iconText:"",title:"⚠️ Warning",message:"Please enter a search query!"});s.classList.add("hidden"),t.reset()},$=async e=>{const t=document.querySelector(".loader-wrapper"),s=document.querySelector("#gallery");e.classList.add("hidden"),t.classList.remove("hidden");const{images:r,total:o}=await g(l,m+=1);if(d.push(...r),u(s,r),h.refresh(),d.length>=o||r.length===0?y():e.classList.remove("hidden"),r.length!==0){const n=document.querySelector(".gallery-item");if(n){const a=n.getBoundingClientRect().height;window.scrollBy({top:a*2,behavior:"smooth"})}}t.classList.add("hidden")};document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("root");L(e),b(e),I(e),q(e);const t=document.querySelector("#search-form");t.addEventListener("submit",async r=>{await T(r,t)});const s=document.querySelector(".load-more");s.addEventListener("click",async()=>{await $(s)})});
//# sourceMappingURL=index.js.map
