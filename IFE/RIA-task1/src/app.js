require.config({
  // Alwats make main.js the baseUrl
  paths: {
    jquery: '../bower_components/jquery/dist/jquery.min',
    marked: '../bower_components/marked/marked.min',
    data: './data',
    show: './show',
  }
});

// Start the main app logic
require(['jquery', 'data', 'show'], function($, data, show) {
  show.showNotebooks();
  show.showAllNotes();
  show.searchByTitle();
  show.createNotebook();
  show.saveNote();
  show.clickShowAllNote();
  $('#closesearch').bind('click',function(){
    $('#search-list').hide();
  });
});