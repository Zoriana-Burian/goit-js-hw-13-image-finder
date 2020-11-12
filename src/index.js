import getRefs from './refs';
import './css/common.css';
import NewsApiService from './apiService';
import imagesTempl from './templates/images.hbs'
import LoadMoreBtn from './load-more-btn.js'

const refs = getRefs();

const newsApiService = new NewsApiService();

refs.form.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', fetchImgGall);

const loadMoreBtn = new LoadMoreBtn({
    selector: '[data-action="load-more"]',
    hidden: true,
  });

  
function onSearch(e){
 e.preventDefault();
 newsApiService.query = e.currentTarget.elements.query.value;

 if (newsApiService.query === '') {
    return alert('Введите название');
  }

  loadMoreBtn.show();
  newsApiService.resetPage();
  clearImagesGallery();
  fetchImgGall();
}


function fetchImgGall() {
    loadMoreBtn.disable();
    newsApiService.fetchImgGall().then(images => {
        appendImagesGall(images);
      loadMoreBtn.enable();
      scrollImg();
    }).catch(error => console.log(error));
  }

function scrollImg() {
    window.scrollBy({
      top: document.documentElement.clientHeight - 100,
      behavior: 'smooth',
    });
}


function appendImagesGall(images) {
    refs.gallery.insertAdjacentHTML('beforeend', imagesTempl(images));
  }

function clearImagesGallery() {
    refs.gallery.innerHTML = '';
  }