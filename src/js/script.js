class BooksList {
    constructor() {
      
      this.favoriteBooks = [];
      this.filters = [];
      this.initData();
      this.getElements();
      this.initActions();
      this.renderBooks();
    }
  
    initData() {
      
      this.data = dataSource.books;
    }
  
    getElements() {
      
      this.booksList = document.querySelector('.books-list');
      this.bookTemplate = document.getElementById('template-book').innerHTML;
      this.compiledTemplate = Handlebars.compile(this.bookTemplate);
      this.filtersForm = document.querySelector('.filters');
    }
  
    initActions() {
      
      this.booksList.addEventListener('dblclick', event => this.handleBookDoubleClick(event));
      this.filtersForm.addEventListener('change', event => this.handleFilterChange(event));
    }
  
    handleBookDoubleClick(event) {
      
      event.preventDefault();
      let clickedElement = event.target.closest('.book__image');
  
      if (clickedElement) {
        const bookId = clickedElement.getAttribute('data-id');
        if (!this.favoriteBooks.includes(bookId)) {
          this.favoriteBooks.push(bookId);
          clickedElement.classList.add('favorite');
        } else {
          this.favoriteBooks = this.favoriteBooks.filter(id => id !== bookId);
          clickedElement.classList.remove('favorite');
        }
      }
    }
  
    handleFilterChange(event) {
     
      const clickedElement = event.target;
  
      if (clickedElement.tagName === 'INPUT' && clickedElement.type === 'checkbox' && clickedElement.name === 'filter') {
        const filterValue = clickedElement.value;
        if (clickedElement.checked) {
          if (!this.filters.includes(filterValue)) {
            this.filters.push(filterValue);
          }
        } else {
          this.filters = this.filters.filter(f => f !== filterValue);
        }
        this.filterBooks();
      }
    }
  
    filterBooks() {
      
      this.data.forEach(book => {
        let shouldBeHidden = false;
  
        for (const filter of this.filters) {
          if (!book.details[filter]) {
            shouldBeHidden = true;
            break;
          }
        }
  
        const bookImage = this.booksList.querySelector(`.book__image[data-id="${book.id}"]`);
        if (shouldBeHidden) {
          bookImage.classList.add('hidden');
        } else {
          bookImage.classList.remove('hidden');
        }
      });
    }
  
    renderBooks() {
     
      this.booksList.innerHTML = '';
  
      this.data.forEach(book => {
        const ratingWidth = book.rating * 10;
        const ratingBgc = this.determineRatingBgc(book.rating);
  
        const html = this.compiledTemplate({
          ...book,
          ratingWidth,
          ratingBgc
        });
        const domElement = document.createRange().createContextualFragment(html);
        this.booksList.appendChild(domElement);
      });
    }
  
    determineRatingBgc(rating) {
      
      if (rating < 6) {
        return 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
      } else if (rating > 6 && rating <= 8) {
        return 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
      } else if (rating > 8 && rating <= 9) {
        return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      } else {
        return 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
      }
    }
  }
  
  const app = new BooksList();