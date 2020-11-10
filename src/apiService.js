const API_KEY = '19054407-f71c417dea239df63beb23abd';
const BASE_URL = 'https://pixabay.com/api/';
const options = {
  headers: {
    Authorization: API_KEY,
  },
};


export default class NewsApiService {
    constructor() {
      this.searchQuery = '';
      this.page = 1;
    }
  
    fetchArticles() {
      const url = `${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`;
  
      return fetch(url, options)
        .then(response => response.json())
        .then(({ images }) => {
          this.incrementPage();
          return images;
        });
    }
  
    incrementPage() {
      this.page += 1;
    }
  
    resetPage() {
      this.page = 1;
    }
  
    get query() {
      return this.searchQuery;
    }
  
    set query(newQuery) {
      this.searchQuery = newQuery;
    }
  }