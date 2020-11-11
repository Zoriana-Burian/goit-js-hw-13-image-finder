import getRefs from './refs';
import './css/common.css';
import NewsApiService from './apiService';
import imagesTempl from './templates/images.hbs'
import LoadMoreBtn from './load-more-btn.js'

const refs = getRefs();

const newsApiService = new NewsApiService();

refs.form.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', fetchArticles);

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
  fetchArticles();
}


function fetchArticles() {
    loadMoreBtn.disable();
    newsApiService.fetchArticles().then(images => {
        appendImagesGall(images);
      loadMoreBtn.enable();
    });
  }

function appendImagesGall(images) {
    refs.gallery.insertAdjacentHTML('beforeend', imagesTempl(images));
  }

function clearImagesGallery() {
    refs.gallery.innerHTML = '';
  }