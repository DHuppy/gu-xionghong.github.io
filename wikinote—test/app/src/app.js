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
    var saveNote = document.getElementById('saveNote');
    if (saveNote.style.display == 'none') {
      $('.contain')[0].style.webkitTransition = '-webkit-transform 0.2s ease-out';
      $('.contain')[0].style.webkitTransform = 'translate3d(-32rem, 0, 0)';
    } else {
      alert('请保存操作');
      $('.contain')[0].style.webkitTransition = '-webkit-transform 0.2s ease-out';
      $('.contain')[0].style.webkitTransform = 'translate3d(-64rem, 0, 0)';
    }
  });

  $('#createNote').bind('tap', function() {
    $('.contain')[0].style.webkitTransition = '-webkit-transform 0.2s ease-out';
    $('.contain')[0].style.webkitTransform = 'translate3d(-64rem, 0, 0)';
  });

  (function(doc, win) {
    var docEl = doc.documentElement,
      resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
      recalc = function() {
        var clientWidth = docEl.clientWidth;
        if (!clientWidth) return;
        docEl.style.fontSize = 10 * (clientWidth / 320) + 'px';
        console.log(docEl.style.fontSize.split('p')[0]);
        if (docEl.style.fontSize.split('p')[0] > 20) {
          docEl.style.fontSize = 20 + 'px';
        }
      };

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
  })(document, window);
});