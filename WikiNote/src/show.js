define(['jquery', 'data', 'marked'], function($, data, marked) {
  /////////////////////////
  /// NotebookList Show ///
  /////////////////////////

  /////////////////
  // Private API //
  /////////////////

  /**
   * 用来标记此时的笔记列表里面是显示全部笔记还是显示指定笔记本内笔记
   * @type {Boolean}  false为显示全部笔记，true为显示笔记本内笔记
   */
  var _tag = false;
  var _NoteTag = true;
  var marked = require('marked');

  /**
   * 点击笔记本，展示其对应的笔记列表
   * @return {boolean}         是否创建成功
   */
  var clickUpdateNoteList = function() {
    $("#notebooks-list li:last").bind('click', function() {
      $("#notes-list").html("");
      $('#notebooks-list li').removeClass('clicklist');
      $(this).addClass('clicklist');
      var notebookId = $(this).attr("id").substr(8);
      showNotesFromNotebook(notebookId);
      _tag = true;
      if ($("#notes-list").html() === '') {
        $("#notes-list").append("<div class='none'>您暂时未创建笔记</div>");
        return false;
      }
      return true;
    });
  };

  /**
   * 绑定删除笔记按钮
   * @param  {string} noteTitle  删除笔记所对应的笔记名
   * @param  {int} notebookId    删除笔记对应的笔记本ID
   * @return {boolean}           删除状态
   */
  var deleteNoteList = function(noteTitle, notebookId) {
    $("#notes-list input:last").bind("click", function() {
      if (confirm('是否删除此笔记')) {
        $(this).parent().remove();
        var tag = data.deleteNoteByTitle(noteTitle, notebookId);
        document.getElementById('notetitle').value = null;
        $('#notecontent,#date').html('');
        $('#updateNote').attr('disabled', 'true');
        $('#updateNote').removeClass('updateNote');
        $("#notes-list").html("");
        if (_tag) {
          showNotesFromNotebook(notebookId);
          if ($('#notes-list').html() === '') {
            $("#notes-list").append("<div class='none'>您暂时未创建笔记</div>");
          }
        } else {
          showAllNotes();
        }
        return tag;
      }
    });
  };

  /**
   * 点击展示笔记内容
   * @return {boolean}           
   */
  var clickupdateNote = function() {
    $("#notes-list li:last").bind("click", function() {
      $('#notes-list li').removeClass('clicklist');
      $(this).addClass('clicklist');
      var noteId = $(this).attr("id").substr(4);
      var notebookId = $(this).attr("name").substr(8);
      $('#updateNote').removeAttr('disabled');
      $('#updateNote').addClass('updateNote');
      showNote(noteId, notebookId);
    });
  };


  /**
   * 绑定删除笔记本按钮
   * @param  {string} noteTitle  删除笔记本
   * @param  {int} notebookId 删除笔记本对应的ID
   * @return {boolean}            删除状态
   */
  var deleteNotebookList = function(notebookId) {
    $("#notebooks-list input:last").bind("click", function() {
      if (confirm('是否删除此笔记本?')) {
        if (data.getNoteBookById(notebookId).notes.length === 0) {
          $(this).parent().remove();
          var tag = data.deleteNoteBookById(notebookId);
          if ($("#notebooks-list").html() === '') {
            $('#createNote').attr('disabled', 'true');
            $('#createNote').removeClass('createNote');
            $("#notebooks-list").append("<div class='none'>您暂时未创建笔记本， &nbsp&nbsp请先添加笔记本</div>");
          }
          showAllNotes();
          showSelect();
          return tag;
        } else {
          alert('该笔记本内还有笔记！');
        }
      }
    });
  };


  /**
   * 搜索结果展示
   * @param  {string} title      笔记本名或笔记名
   * @return {boolean}           是否存在此笔记本或笔记
   */
  var showSearchResults = function(title) {
    $("#wn-searchresults ul").html("");
    var notebooks = data.getAllNotebook();
    var notebooktag = false;
    // var notetag = false;
    for (var i = 0; i < notebooks.length; i++) {
      var notebook = notebooks[i];
      // var notes = notebooks[i].notes;
      if (notebooks[i].title.toLowerCase().indexOf(title.toLowerCase()) >= 0) {
        $("#wn-searchresults ul").append("<li notebookid='" + notebooks[i].id + "'><p class='search-name'>笔记本&nbsp&nbsp&nbsp&nbsp " + notebook.title + "</p></li>");
        $("#wn-searchresults ul li:last").bind('click', function() {
          $('#search-list').hide();
          var notebookId = $(this).attr('notebookid');
          $('#notes-list').html('');
          showNotesFromNotebook(notebookId);
          if ($('#notes-list').html() === '') {
            $("#notes-list").append("<div class='none'>您暂时未创建笔记</div>");
          }
          document.getElementById("search").value = '';
        });
        $("#wn-searchresults ul li:last").bind('tap', function() {
          $('.contain')[0].style.webkitTransition = '-webkit-transform 0.2s ease-out';
          $('.contain')[0].style.webkitTransform = 'translate3d(-32rem, 0, 0)';
        });


        notebooktag = true;
      }
      // for (var j = 0; j < notes.length; j++) {
      //   if (notes[j].title.toLowerCase().indexOf(title.toLowerCase()) >= 0) {
      //     $("#wn-searchresults ul").append("<li><a href='#note" + notes[j].id + "'><p class='search-name'>笔记&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp " + notes[j].title + "</p></a></li>");
      //     $("#wn-searchresults ul li:last").attr("id", (i + "searchnote" + notes[j].id));
      //     notetag = true;
      //   }
      // }
    }
    // if (!(notebooktag || notetag)) {
    if (!notebooktag) {
      $("#wn-searchresults ul").append("<div>不存在" + title + "这个笔记本</div>");
    }
    // return notebooktag || notetag;
    return notebooktag;
  };


  var showSelect = function() {
    var notebooks = data.getAllNotebook();
    $('#notebookSelect select').html('');
    for (var i = 0; i < notebooks.length; i++) {
      var notebook = notebooks[i];
      $('#notebookSelect select').append('<option value=' + notebook.title + '>' + notebook.title + '</option>');
    }
  };

  /**
   * 绑定点击添加按钮时发生的事件
   * @return {boolean}  ture为更改操作，false为添加操作
   */
  var createNote = function() {
    $('#createNote').bind('click', function() {
      document.getElementById('notetitle').value = null;
      document.getElementById('notecontentedit').value = null;
      $('#createNote').attr('disabled', 'true');
      $('#createNote').removeClass('createNote');
      $('#notebookSelect').show();
      $('#notecontent').html('');
      $('#updateNote').hide();
      $('#saveNote').show();
      $('#date').text("");
      _NoteTag = false;
      showSelect();
      var notebookTitle = $("#notebookSelect select").val();
      $('#noteScroll').hide();
      $('#noteeditScroll').show();
      if ($('#notecontentedit').css('overflow') != 'auto') {
        $('#notecontentedit').css('height', '100%');
        $('#notecontentedit').css('height', $('#notecontentedit')[0].scrollHeight + 'px');
        setTimeout(function() {
          noteeditScroll.refresh();
        }, 0);
      }
      $('#notetitle').removeAttr('disabled');
      $('#notetitle').removeClass('shownotetitle');
      $('#notetitle').addClass('editnotetitle');
      return _NoteTag;
    });
  };

  /**
   * 添加笔记情况下，点击保存按钮需要绑定的事件
   * @return {boolean} 添加笔记状态
   */
  var saveCreateNote = function() {
    var notebookTitle = $("#notebookSelect select").val();
    var notebook = data.getNoteBookByTitle(notebookTitle);
    var title = document.getElementById('notetitle').value;
    var content = document.getElementById('notecontentedit').value;
    $('#notecontent').html(marked(content));
    var tag = data.createNote(title, content, notebook.id);
    $('#notes-list').html('');
    if (tag) {
      alert('添加成功');
      _NoteTag = true;
      $('#updateNote').show();
      $('#createNote').removeAttr('disabled');
      $('#createNote').addClass('createNote');
      $('#notetitle').attr('disabled', 'true');
      $('#notetitle').addClass('shownotetitle');
      $('#notetitle').removeClass('editnotetitle');
      $('#notebookSelect').hide();
      $('#saveNote').hide();
    } else {
      _NoteTag = false;
      alert('笔记名为空或已存在同名笔记，添加失败');
      $('#createNote').attr('disabled', 'true');
      $('#createNote').removeClass('createNote');
      $('#updateNote').attr('disabled', 'true');
      $('#updateNote').removeClass('updateNote');
    }
    showNotesFromNotebook(notebook.id);
    return tag;
  };

  /**
   * 绑定点击编辑按钮时发生的事件
   * @return {boolean} ture为更改操作，false为添加操作
   */
  var updateNote = function() {
    $('#updateNote').bind('click', function() {
      $('#notetitle').removeAttr('disabled');
      $('#notetitle').removeClass('shownotetitle');
      $('#notetitle').addClass('editnotetitle');
      $('#createNote').hide();
      $('#updateNote').attr('disabled', 'true');
      $('#updateNote').removeClass('updateNote');
      $('#saveNote').show();
      $('#noteScroll').hide();
      $('#noteeditScroll').show();
      if ($('#notecontentedit').css('overflow') != 'auto') {
        $('#notecontentedit').css('height', '100%');
        $('#notecontentedit').css('height', $('#notecontentedit')[0].scrollHeight + 'px');
        setTimeout(function() {
          noteeditScroll.refresh();
        }, 0);
      }
      _NoteTag = true;
      return _NoteTag;
    });
  };


  /**
   * 编辑笔记情况下，点击保存按钮需要绑定的事件
   * @return {boolean} 编辑是否成功
   */
  var saveUpdateNote = function() {
    var noteId = document.getElementById('notetitle').getAttribute('name').substr(4);
    var notebookId = document.getElementById('notecontent').getAttribute('class').substr(8);
    var newTitle = document.getElementById('notetitle').value;
    var newContent = document.getElementById('notecontentedit').value;
    var tag = data.updateNoteTitleById(noteId, newTitle, notebookId);
    data.updateNoteContentByID(noteId, notebookId, newContent);
    $('#createNote').show();
    $('#updateNote').removeAttr('disabled');
    $('#updateNote').addClass('updateNote');
    $('#notetitle').attr('disabled', 'true');
    $('#notetitle').addClass('shownotetitle');
    $('#notetitle').removeClass('editnotetitle');
    $('#saveNote').hide();
    if (tag) {
      alert('编辑成功');
    } else {
      alert('编辑失败');
    }
    showNote(noteId, notebookId);
    showAllNotes();
    return tag;
  };

  ////////////////
  // Public API //
  ////////////////

  /**
   * 将指定笔记本的笔记列表导出到页面中(并未做清空笔记列表操作)
   * @param  {number}  notebookId 需要展示笔记的笔记本的id
   * @return {boolean} boolean    笔记列表是否添加了笔记       
   */
  var showNotesFromNotebook = function(notebookId) {
    var notes = data.getAllNote(notebookId);
    if (!notes) {
      return false;
    } else {
      for (var i = 0; i < notes.length; i++) {
        $("#notes-list").append("<li><p class='note-title'>" + notes[i].title + "</p><p class='note-createdate'>创建时间:" + notes[i].createDate.toLocaleString().substring(0, 9) +
          "</p><p class='note-modifyDate'>更新时间:" + notes[i].modifyDate.toLocaleString().substring(0, 9) + "</p><p class='note-content'> 摘要:" + notes[i].content + "</p><p class='note-img'></p><input type='button' value='删除' title='删除笔记'/></li>");
        $("#notes-list li:last").attr("id", ("note" + notes[i].id));
        $("#notes-list li:last").attr("name", ("notebook" + notebookId));
        deleteNoteList(notes[i].title, notebookId);
        clickupdateNote();
        $('#notes-list p').bind('tap', function() {
          $('.contain')[0].style.webkitTransition = '-webkit-transform 0.2s ease-out';
          $('.contain')[0].style.webkitTransform = 'translate3d(-64rem, 0, 0)';
        });
      }
      $('#notes-list li').bind('swipeLeft', function() {
        $(this)[0].style.webkitTransition = '-webkit-transform 0.2s ease-out';
        $(this)[0].style.webkitTransform = 'translate3d(-7rem, 0, 0)';
        var input = $(this)[0].getElementsByTagName('input')[0];
        $(input).attr('style', 'display:block');
      });
      $('#notes-list li').bind('swipeRight', function() {
        $(this)[0].style.webkitTransition = '-webkit-transform 0.2s ease-out';
        $(this)[0].style.webkitTransform = 'translate3d(0, 0, 0)';
        var input = $(this)[0].getElementsByTagName('input')[0];
        $(input).attr('style', 'display:none');
      });
      setTimeout(function() {
        NotelistScroll.refresh();
      }, 0);
      return true;
    }
  };

  /**
   * 将笔记本列表导出到页面中
   * @return {boolean} boolean 笔记本列表是否添加了笔记本
   */
  var showNotebooks = function() {
    var notebooks = data.getAllNotebook();
    if (notebooks.length === 0) {
      $('#createNote').attr('disabled', 'true');
      $('#creatNote').removeClass('createNote');
      $("#notebooks-list").append("<div class='none'>您暂时未创建笔记本， &nbsp&nbsp请先添加笔记本</div>");
      return false;
    } else {
      for (var i = 0; i < notebooks.length; i++) {
        $("#notebooks-list").append("<li><p class='notebook-title'>" + notebooks[i].title + "<p class='notebook-createdate'> " + notebooks[i].createDate.toLocaleString().substring(0, 9) + "</p><p class='notebook-img'></p><input type='button' value='—' title='删除笔记本'/></li>");
        $("#notebooks-list li:last").attr("id", ("notebook" + notebooks[i].id));
        clickUpdateNoteList();
        $('#notebooks-list p').bind('tap', function() {
          $('.contain')[0].style.webkitTransition = '-webkit-transform 0.2s ease-out';
          $('.contain')[0].style.webkitTransform = 'translate3d(-32rem, 0, 0)';
        });
        $('#createNote').removeAttr('disabled');
        $('#createNote').addClass('createNote');
        deleteNotebookList(notebooks[i].id);
      }
      $('#notebooks-list li').bind('swipeLeft', function() {
        $(this)[0].style.webkitTransition = '-webkit-transform 0.2s ease-out';
        $(this)[0].style.webkitTransform = 'translate3d(-7rem, 0, 0)';
        var input = $(this)[0].getElementsByTagName('input')[0];
        $(input).attr('style', 'display:block');
      });
      $('#notebooks-list li').bind('swipeRight', function() {
        $(this)[0].style.webkitTransition = '-webkit-transform 0.2s ease-out';
        $(this)[0].style.webkitTransform = 'translate3d(0, 0, 0)';
        var input = $(this)[0].getElementsByTagName('input')[0];
        $(input).attr('style', 'display:none');
      });
      setTimeout(function() {
        NotebookScroll.refresh();
      }, 0);
      return true;
    }
  };

  /**
   * 展现所有的笔记
   * @return {boolean}         是否创建成功
   */
  var showAllNotes = function() {
    $("#notes-list").html("");
    var notebooks = data.getAllNotebook();
    if (notebooks) {
      for (var i = 0; i < notebooks.length; i++) {
        var notebookid = notebooks[i].id;
        showNotesFromNotebook(notebookid);
      }
      if ($("#notes-list").html() === '') {
        $("#notes-list").append("<div class='none'>您暂时未创建笔记</div>");
        return false;
      }
    }
    return false;
  };

  /**
   * 监听查找输入框的内容改变及绑定搜索按钮的点击事件
   * @return {boolean} 是否搜索到内容
   */
  var searchByTitle = function() {
    $('#search').bind('change', function() {
      var title = document.getElementById("search").value;
      $('#search-list').show();
      return showSearchResults(title);
    });
    $('#searchButton').bind('click', function() {
      var title = document.getElementById("search").value;
      $('#search-list').show();
      return showSearchResults(title);
    });
  };

  /**
   * 添加笔记本，绑定各种事件
   * @return {boolean} 是否添加新的笔记本
   */
  var createNotebook = function() {
    $('#create').bind('click', function() {
      $('#createNotebook').show();
      $('#notebooks-list').removeClass('close');
      $('#notebooks-list').addClass('open');
    });
    $('#confirmCreate').bind('click', function() {
      var title = document.getElementById('notebookName').value;
      var tag = data.createNotebook(title);
      if (tag) {
        $("#notebooks-list").html('');
        showNotebooks();
        alert('创建成功');
        $('#createNote').removeAttr('disabled');
        $('#createNote').addClass('createNote');
        $('#createNotebook').hide();
        $('#notebooks-list').removeClass('open');
        $('#notebooks-list').addClass('close');
        document.getElementById('notebookName').value = "";
        if (!_NoteTag) {
          $('#createNote').attr('disabled', 'true');
          $('#createNote').removeClass('createNote');
          showSelect();
        }
        return true;
      } else {
        alert('名字无效,创建失败');
        return false;
      }
    });
    $('#canelCreate').bind('click', function() {
      document.getElementById('notebookName').value = "";
      $('#createNotebook').hide();
      $('#notebooks-list').removeClass('open');
      $('#notebooks-list').addClass('close');
      return false;
    });
  };


  /**
   * 实现笔记编辑区的所有操作
   * @return {boolean} 记录保存状态
   */
  var saveNote = function() {
    updateNote();
    createNote();
    $('#saveNote').bind('click', function() {
      $('#notebooks-list').html('');
      showNotebooks();
      if (_NoteTag) {
        saveUpdateNote();
        $('#noteScroll').show();
        $('#noteeditScroll').hide();
        setTimeout(function() {
          noteScroll.refresh();
        }, 0);
        return true;
      } else {
        if (saveCreateNote()) {
          $('#noteScroll').show();
          setTimeout(function() {
            noteScroll.refresh();
          }, 0);
          $('#notebookSelect').hide();
          $('#noteeditScroll').hide();
          return true;
        }
      }
    });
    return false;
  };

  /**
   * 绑定显示全部笔记按钮事件
   * @return {[type]} [description]
   */
  var clickShowAllNote = function() {
    $('#showallnotes').bind('click', function() {
      showAllNotes();
      _tag = false;
    });
  };

  /**
   * 笔记区域显示笔记内容
   * @param  {int} noteId     笔记ID
   * @param  {int} notebookId 笔记本ID
   * @return {}            
   */
  var showNote = function(noteId, notebookId) {
    var note = data.getNoteById(noteId, notebookId);
    if (note) {
      $('#date').text('创建时间:' + note.createDate.toLocaleString() + '              ' + '更新时间:' + note.modifyDate.toLocaleString());
      document.getElementById('notetitle').value = note.title;
      $('#notecontent').html(marked(note.content));
      document.getElementById('notecontentedit').value = note.content;
      $("#notetitle").attr("name", ("note" + note.id));
      $("#notecontent").attr("class", ("notebook" + notebookId));
    }
  };



  var mobileShow = function() {
    $('#closesearch').bind('click', function() {
      $('#search-list').hide();
    });

    $('#returnNotebook').bind('click', function() {
      $('.contain')[0].style.webkitTransition = '-webkit-transform 0.2s ease-out';
      $('.contain')[0].style.webkitTransform = 'translate3d(0, 0, 0)';
    });

    $('#returnNote').bind('click', function() {
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

    $('#createNote').bind('click', function() {
      if ($('#createNote').css('position') == 'absolute') {
        $('.contain')[0].style.webkitTransition = '-webkit-transform 0.2s ease-out';
        $('.contain')[0].style.webkitTransform = 'translate3d(-64rem, 0, 0)';
      }
    });
  };
  return {
    // Show list related
    showNotebooks: showNotebooks,
    showAllNotes: showAllNotes,
    showNotesFromNotebook: showNotesFromNotebook,

    //Create notebook
    createNotebook: createNotebook,

    //Search results related
    searchByTitle: searchByTitle,
    clickShowAllNote: clickShowAllNote,

    //Save note change
    saveNote: saveNote,

    //Show note related
    showNote: showNote,

    mobileShow: mobileShow,
  };
});