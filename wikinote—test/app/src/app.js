require.config({
  // Alwats make main.js the baseUrl
  paths: {
    jquery: '../bower_components/jquery/dist/jquery.min',
    marked: '../bower_components/marked/marked.min',
    zepto: './zepto',
    data: './data',
    show: './show',
  }
});

// Start the main app logic
require(['zepto', 'data', 'show'], function(Zepto, data, show) {
  document.addEventListener('touchmove', function (event) {
event.preventDefault();
}, false);
  show.showNotebooks();
  show.showAllNotes();
  show.searchByTitle();
  show.createNotebook();
  show.saveNote();
  show.clickShowAllNote();
  $('#closesearch').bind('click', function() {
    $('#search-list').hide();
  });
});
