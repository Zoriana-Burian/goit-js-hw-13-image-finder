export default function getRefs() {
    return {
         form: document.querySelector('#search-form'),
         gallery: document.querySelector('.gallery'),
         loadMoreBtn: document.querySelector('[data-action="load-more"]'),
 
    };
  }