/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

{
  'use strict';
  document.addEventListener('DOMContentLoaded', function() {
    const booksList = document.querySelector('.books-list');
    const bookTemplate = document.getElementById('template-book').innerHTML;
    const compiledTemplate = Handlebars.compile(bookTemplate);

    function renderBooks() {
      booksList.innerHTML = '';

      dataSource.books.forEach(book => {
        const html = compiledTemplate(book);
        const domElement = document.createRange().createContextualFragment(html);
        booksList.appendChild(domElement);
      });
    }

    renderBooks();
  });

  

   
}