require.config({
  // Alwats make main.js the baseUrl
  paths: {
    marked: '../bower_components/marked/marked.min',
    jquery: '../bower_components/jquery/dist/jquery.min',
    iscroll: './iscroll-lite',
    initialize: './initialize',
    fastclick: './fastclick',
    zepto: './zepto',
    data: './data',
    show: './show',
  }
});

// Start the main app logic
require(['zepto', 'show', 'initialize'], function(Zepto, show, initialize) {
  initialize.initialize();
  document.addEventListener('touchmove', function(event) {
    event.preventDefault();
  }, false);
  setTimeout(function() {
    window.scrollTo(0, 1);
  }, 0);
  show.showNotebooks();
  show.showAllNotes();
  show.searchByTitle();
  show.createNotebook();
  show.saveNote();
  show.clickShowAllNote();
  show.mobileShow();

  if ($('#notecontentedit').css('overflow') != 'auto') {
    $('#notecontentedit').bind('input', function() {
      $('#notecontentedit').css('height', $('#notecontentedit')[0].scrollHeight + 'px');
      setTimeout(function() {
        noteeditScroll.refresh();
      }, 0);
    });
  }
});