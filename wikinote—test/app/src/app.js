require.config({
  // Alwats make main.js the baseUrl
  paths: {
    marked: '../bower_components/marked/marked.min',
    touch: './touch',
    zepto: './zepto',
    data: './data',
    show: './show',
  }
});

// Start the main app logic
require(['zepto', 'show', 'touch'], function(Zepto, show, touch) {
  document.addEventListener('touchmove', function(event) {
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

  $('#returnNotebook').bind('tap', function() {
    $('.contain')[0].style.webkitTransition = '-webkit-transform 0.2s ease-out';
    $('.contain')[0].style.webkitTransform = 'translate3d(0, 0, 0)';
  });

  $('#returnNote').bind('tap', function() {
    $('.contain')[0].style.webkitTransition = '-webkit-transform 0.2s ease-out';
    $('.contain')[0].style.webkitTransform = 'translate3d(-32rem, 0, 0)';
  });

});