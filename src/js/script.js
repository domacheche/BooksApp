/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

{
  'use strict';
  document.addEventListener('DOMContentLoaded', function() {
    const booksList = document.querySelector('.books-list');
    const bookTemplate = document.getElementById('template-book').innerHTML;
    const compiledTemplate = Handlebars.compile(bookTemplate);

    function renderBooks() {
      booksList.innerHTML = ''; // Czyści obecną listę książek

      dataSource.books.forEach(book => {
        const html = compiledTemplate(book); // Generuje HTML dla każdej książki
        const domElement = document.createRange().createContextualFragment(html); // Tworzy element DOM
        booksList.appendChild(domElement); // Dodaje do listy w DOM
      });
    }

    renderBooks(); // Wywołuje funkcję renderowania książek
  });

  

   
}