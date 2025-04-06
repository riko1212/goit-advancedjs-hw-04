import{a as h,i,S as f}from"./assets/vendor-Cgc9PhsO.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))t(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&t(n)}).observe(document,{childList:!0,subtree:!0});function a(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function t(s){if(s.ep)return;s.ep=!0;const o=a(s);fetch(s.href,o)}})();const p=(r,e,a="beforeend")=>{r.insertAdjacentHTML(a,e)},L=r=>{r.innerHTML=""},v=(r,e)=>{const a=e.map(t=>`
    <div class="gallery-item">
      <a href="${t.largeImageURL}">
        <img src="${t.webformatURL}" alt="${t.tags}" loading="lazy" />
      </a>
      <div class="gallery-item-info">
        <div>
          <b>Likes</b>
          ${t.likes}
        </div>
        <div>
          <b>Views</b>
          ${t.views}
        </div>
        <div>
          <b>Comments</b>
          ${t.comments}
        </div>
        <div>
          <b>Downloads</b>
          ${t.downloads}
        </div>
      </div>
    </div>
  `).join("");p(r,a)},g=(r,e)=>{v(r,e)},w=(r,e)=>{L(r),e&&e.length&&g(r,e)},b="45273601-269fa7243c6da01438f09c62a",S=h.create({baseURL:"https://pixabay.com/api",params:{key:b}}),u=async(r,e=1,a=15)=>{try{const{data:t}=await S.get("/",{params:{q:r,image_type:"photo",orientation:"horizontal",page:e,per_page:a}});return{images:t.hits,total:t.totalHits}}catch(t){return i.error({icon:"",iconText:"",title:"❌ Error",message:`Error while fetching images. Please try again! ${t}`}),{images:[],total:0}}};i.settings({timeout:3e3});const y=new f(".gallery a",{captionDelay:250,captionsData:"alt"}),l=[];let c="",m=1;const d=()=>{i.warning({title:"⚠️ Warning",message:"We're sorry, but you've reached the end of search results."})},q=()=>{l.length=0,m=1;const r=document.querySelector("#gallery");r.innerHTML=""},I=async(r,e)=>{r.preventDefault(),c=e.elements.search.value.trim();const a=document.querySelector(".loader-wrapper"),t=document.querySelector(".load-more"),s=document.querySelector("#gallery");if(!c){i.warning({title:"⚠️ Warning",message:"Please enter a search query!"});return}a.classList.remove("hidden"),t.classList.add("hidden"),q();try{const{images:o,total:n}=await u(c,m);o.length?(l.push(...o),w(s,o),y.refresh(),l.length<n?t.classList.remove("hidden"):d()):i.error({title:"❌ Error",message:"Sorry, there are no images matching your search query. Please try again!"})}catch(o){i.error({title:"❌ Error",message:"Something went wrong. Please try again later."}),console.error(o)}finally{a.classList.add("hidden"),e.reset()}},E=async r=>{const e=document.querySelector(".loader-wrapper"),a=document.querySelector("#gallery");r.classList.add("hidden"),e.classList.remove("hidden");try{const{images:t,total:s}=await u(c,++m);if(t.length){l.push(...t),g(a,t),y.refresh(),l.length<s?r.classList.remove("hidden"):d();const o=document.querySelector(".gallery-item");if(o){const n=o.getBoundingClientRect().height;window.scrollBy({top:n*2,behavior:"smooth"})}}else d()}catch(t){i.error({title:"❌ Error",message:"Failed to load images. Please try again."}),console.error(t)}finally{e.classList.add("hidden")}};document.addEventListener("DOMContentLoaded",()=>{const r=document.querySelector("#search-form"),e=document.querySelector(".load-more");r.addEventListener("submit",async a=>{await I(a,r)}),e.addEventListener("click",async()=>{await E(e)})});
//# sourceMappingURL=index.js.map
