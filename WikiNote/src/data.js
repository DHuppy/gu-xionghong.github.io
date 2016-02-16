/**
 * 数据模块用于进行笔记数据相关的操作
 * 	@class data
 */
define([], function() {
  /////////////////////////
  // Notebook Data Model //
  /////////////////////////

  // TODO: Use indexDB for Data Model

  var saveStorage = function() {
    var notebooks = getAllNotebook();
    var str = JSON.stringify(notebooks);
    localStorage.setItem('notebooks', str);
    localStorage.setItem('noteId', _noteId);
    localStorage.setItem('notebookId', _notebookId);
  };

  var loadStorage = function() {
    var str = localStorage.getItem('notebooks');
    var noteId = localStorage.getItem('noteId');
    var notebookId = localStorage.getItem('notebookId');
    if (str === null) {
      _notebooks = [];
      _noteId = 0;
      _notebookId = 0;
    } else {
      _notebooks = JSON.parse(str);
      _noteId = noteId;
      _notebookId = notebookId;
    }
  };

  var _noteId;
  var _notebookId;
  var _notebooks = [];
  loadStorage();



  /////////////////
  // Private API //
  /////////////////

  /**
   * 检查提供的笔记本名是否存在
   *
   * @method _checkNotebookExistence
   * @param  {string} notebookName 笔记本名称
   * @return {boolean} 笔记本是否存在状态
   */
  var _checkNotebookExistence = function(notebookName) {
    for (var i = 0; i < _notebooks.length; i++) {
      if (_notebooks[i].title.toLowerCase() == notebookName.toLowerCase()) {
        return true;
      }
    }
    return false;
  };

  /**
   * 检查所提供的笔记名称是否在指定笔记本中已经存在
   *
   * @method _checkNoteExistence
   * @param  {int} notebookId 笔记本 ID
   * @param  {string} noteTitle 笔记名称
   * @return {boolean} 笔记是否存在状态
   */
  var _checkNoteExistence = function(notebookId, noteTitle) {

    var notebook = getNoteBookById(notebookId);
    if (notebook !== null) {
      var notes = notebook.notes;

      for (var i = 0; i < notes.length; i++) {
        if (notes[i].title.toLowerCase() == noteTitle.toLowerCase()) {
          return true;
        }
      }
      return false;
    }
  };

  /**
   * 在笔记本数组中删除指定索引的笔记本并将删除的笔记本返回
   * @method _deleteNoteBookAtIndex
   * @param {int} notebookIndex 笔记本索引
   * @return {object} 被删除的笔记本实例对象
   */
  var _deleteNoteBookAtIndex = function(notebookIndex) {
    return _notebooks.splice(notebookIndex, 1)[0];
  };

  /**
   * 在笔记数组中删除指定索引的笔记并将删除的笔记返回
   * @method _deleteNoteAtIndex
   * @param  {int} noteIndex  笔记索引
   * @param  {int} notebookId 笔记本ID
   * @return {object}         被删除的笔记本实例对象
   */
  var _deleteNoteAtIndex = function(noteIndex, notebookId) {
    var notes = getAllNote(notebookId);
    return notes.splice(noteIndex, 1)[0];
  };

  /**
   * 找到指定 ID 对于笔记本在数组中所对应的索引
   * @method _findNotebookIndexById
   * @param {int} notebookId 笔记本 ID
   * @return {int} 笔记本索引号 （-1 为未找到）
   */
  var _findNotebookIndexById = function(notebookId) {
    var notebooks = getAllNotebook();
    for (var i = 0; i < notebooks.length; i++) {
      if (notebooks[i].id === notebookId) {
        return i;
      }
    }
    return -1;
  };

  /**
   * 找到指定 ID 对于笔记在数组中所对应的索引
   * @method _findNoteIndexById
   * @param {int} noteId 笔记 ID
   * @param {int} notebookId 笔记本 ID
   * @return {int} 笔记索引号 （-1 为未找到）
   */
  var _findNoteIndexById = function(noteId, notebookId) {
    var notes = getAllNote(notebookId);
    for (var i = 0; i < notes.length; i++) {
      if (notes[i].id === noteId) {
        return i;
      }
    }
    return -1;
  };

  ////////////////
  // Public API //
  ////////////////

  /**
   * 创建一个新的笔记本并将其保存值笔记本数组中（笔记本实例必须唯一不可重名）
   *
   * @method createNotebook
   * @param  {string} title 笔记本名称
   * @return {boolean} 创建成功状态
   */
  var createNotebook = function(title) {
    //判断新建笔记本名称是否含有空格
    var reg =/\s/;
    var tag = reg.test(title);
    if (!_checkNotebookExistence(title) && title !== '' && !tag) {
      var currentTime = new Date();

      var notebook = {
        id: _notebookId,
        title: title,
        createDate: currentTime,
        modifyDate: currentTime,
        notes: [],
        _noteId: 0
      };
      _notebooks.push(notebook);

      _notebookId++;

      saveStorage();

      return true;
    }
    return false;
  };

  /**
   * 删除指定 ID 的笔记本
   *
   * @method deleteNoteBookById
   * @param {int} notebookId 指定笔记本 ID
   * @return {object} 被删除的笔记本
   */
  var deleteNoteBookById = function(notebookId) {
    var targetNotebookIndex = _findNotebookIndexById(notebookId);

    if (targetNotebookIndex !== -1) {
      var notebook = _deleteNoteBookAtIndex(targetNotebookIndex);
      saveStorage();
      return notebook;
    } else {
      return {};
    }
  };

  /**
   * 通过笔记本 ID 更改笔记本的名称
   * @method updateNoteBookTitleById
   * @param {int} notebookId 笔记本 ID
   * @param {string} newTitle 笔记本新名称
   * @return {boolean} 笔记本更名状态
   */
  var updateNoteBookTitleById = function(notebookId, newTitle) {
    var notebook = getNoteBookById(notebookId);
    if (notebook !== null && newTitle !== '') {
      notebook.title = newTitle;
      return true;
    }
    return false;
  };

  /**
   * 通过笔记 ID 更改笔记本的名称
   * @method updateNoteTitleById
   * @param {int} noteId 笔记 ID
   * @param {string} newTitle 笔记本新名称
   * @param {int} notebookId 笔记本 ID
   * @return {boolean} 笔记更名状态
   */
  var updateNoteTitleById = function(noteId, newTitle, notebookId) {
    var note = getNoteById(noteId, notebookId);
    if (note !== null) {
      note.title = newTitle;
      note.modifyDate = new Date();
      saveStorage();
      return true;
    }
    return false;
  };

  /**
   * 通过笔记本的现有名称改变成新的名称
   * @method updateNoteBookTitleByTitle
   * @param {string} notebookTitle 笔记本现有名称
   * @param {string} newTitle 笔记本新名称
   * @return {boolean} 笔记本更名状态
   */
  var updateNoteBookTitleByTitle = function(notebookTitle, newTitle) {
    var notebook = getNoteBookByTitle(notebookTitle);
    return updateNoteBookTitleById(notebook.id, newTitle);
  };

  /**
   * 通过笔记的现有名称改变成新的名称
   * @method updateNoteTitleByTitle
   * @param {string} noteTitle 笔记现有名称
   * @param {string} newTitle 笔记新名称
   * @param {int} notebookId 笔记本 ID
   * @return {boolean} 笔记更名状态
   */
  var updateNoteTitleByTitle = function(noteTitle, newTitle, notebookId) {
    var note = getNoteByTitle(noteTitle, notebookId);
    return updateNoteTitleById(note.id, newTitle, notebookId);
  };

  /**
   * 删除指定 ID 的笔记
   *
   * @method deleteNoteById
   * @param {int} noteId 指定笔记 ID
   * @param {int} notebookId 指定笔记本 ID
   * @return {object} 被删除的笔记
   */
  var deleteNoteById = function(noteId, notebookId) {
    var targetNoteIndex = _findNoteIndexById(noteId, notebookId);

    if (targetNoteIndex !== -1) {
      var note = _deleteNoteAtIndex(targetNoteIndex, notebookId);
      saveStorage();
      return note;
    } else {
      return {};
    }
  };

  /**
   * 删除指定标题的笔记本
   *
   * @method deleteNotebookByTitle
   * @param {string} notebookTitle 笔记本标题
   * @return {object} 所删除的笔记本
   */
  var deleteNotebookByTitle = function(notebookTitle) {
    var notebook = getNoteBookByTitle(notebookTitle);
    return deleteNoteBookById(notebook.id);
  };

  /**
   * 删除指定标题的笔记
   *
   * @method deleteNoteByTitle
   * @param {string} noteTitle 笔记标题
   * @param {int}  notebookId 笔记本ID
   * @return {object} 所删除的笔记
   */
  var deleteNoteByTitle = function(noteTitle, notebookId) {
    var note = getNoteByTitle(noteTitle, notebookId);
    return deleteNoteById(note.id, notebookId);
  };

  /**
   * 获取所有现有笔记本
   *
   * @method getAllNotebook
   * @return {array} 返回现有所有保存在数组中的笔记本
   */
  var getAllNotebook = function() {
    return _notebooks;
  };

  /**
   * 更具笔记本 ID 获取笔记本
   *
   * @method getNoteBookById
   * @param  {int} id 笔记本 ID
   * @return {object} 指定 ID 的笔记本示例对象
   */
  var getNoteBookById = function(id) {
    for (var i = 0; i < _notebooks.length; i++) {
      var notebook = _notebooks[i];
      if (notebook.id == id) {
        return notebook;
      }
    }
    return null;
  };

  /**
   * 通过笔记本名称获取笔记本
   *
   * @method getNoteBookByTitle
   * @param {string} notebookTitle 笔记本名称
   * @return {object} 笔记本实例对象
   */
  var getNoteBookByTitle = function(notebookTitle) {
    for (var i = 0; i < _notebooks.length; i++) {
      if (_notebooks[i].title.toLowerCase() == notebookTitle.toLowerCase()) {
        return _notebooks[i];
      }
    }
    return null;
  };

  /**
   * 新建一个笔记并将其插入指定 ID 的笔记本之中
   *
   * @method createNote
   * @param  {string} title   笔记标题（唯一不可重复）
   * @param  {string} content 笔记内容
   * @param  {int} notebookId 指定笔记本 ID
   * @return {boolean}        笔记创建状态
   */
  var createNote = function(title, content, notebookId) {
    if (notebookId === undefined) {
      notebookId = 0;
    }

    var notebook = getNoteBookById(notebookId);

    if (!_checkNoteExistence(notebookId, title) && title !== '') {
      var currentTime = new Date();
      var note = {
        id: _noteId,
        title: title,
        content: content,
        tag: [],
        createDate: currentTime,
        modifyDate: currentTime
      };
      _noteId++;

      notebook.notes.push(note);
      saveStorage();
      return true;
    }
    return false;
  };

  /**
   *  获取指定笔记本中所有的笔记
   *
   * @method getAllNote
   * @param  {int} notebookId 指定笔记本 ID
   * @return {array} 储存在笔记本中的笔记数组
   */
  var getAllNote = function(notebookId) {
    var notebook = getNoteBookById(notebookId);
    return notebook.notes;
  };

  /**
   * 从指定 ID 的笔记本中获取指定 ID 的笔记条目
   *
   * @method getNoteById
   * @param  {int} noteId 指定的笔记 ID
   * @param  {int} notebookID 指定的笔记本 ID
   * @return {object} 笔记实例对象
   */
  var getNoteById = function(noteId, notebookID) {
    var notebook = getNoteBookById(notebookID);
    var notes = notebook.notes;
    for (var i = 0; i < notes.length; i++) {
      var note = notes[i];
      if (note.id == noteId) {
        return note;
      }
    }
    return null;
  };

  /**
   * 根据笔记的名称从指定的笔记本中取出指定的笔记
   *
   * @method getNoteByTitle
   * @param {string} noteTitle 笔记名称
   * @param {int} notebookID 笔记本所属 ID
   * @return {object} 指定笔记实例对象
   */
  var getNoteByTitle = function(noteTitle, notebookID) {
    var notebook = getNoteBookById(notebookID);
    var notes = notebook.notes;

    for (var i = 0; i < notes.length; i++) {
      if (notes[i].title.toLowerCase() == noteTitle.toLowerCase()) {
        return notes[i];
      }
    }
    return null;
  };

  /**
   * 通过笔记的 ID 与 笔记本的 ID 来更新笔记的内容
   * @method updateNoteContentByID
   * @param {int} noteId 笔记 ID
   * @param {int} notebookID 笔记本 ID
   * @param {string} newContent 笔记的
   */
  var updateNoteContentByID = function(noteId, notebookID, newContent) {
    var note = getNoteById(noteId, notebookID);
    note.content = newContent;
    saveStorage();
  };

  /**
   * 通过笔记的标题与笔记本的 ID 来更新笔记的内容
   * @method updateNoteContentByTitle
   * @param {string} noteTitle 笔记标题
   * @param {int} notebookID 笔记本 ID
   * @param {string} newContent 笔记更新内容
   */
  var updateNoteContentByTitle = function(noteTitle, notebookID, newContent) {
    var note = getNoteByTitle(noteTitle, notebookID);
    note.content = newContent;
    saveStorage();
  };

  return {
    // Private API (DO NOT USE IT, Testing Purpose ONLY)
    _checkNotebookExistence: _checkNotebookExistence,
    _checkNoteExistence: _checkNoteExistence,
    _deleteNoteBookAtIndex: _deleteNoteBookAtIndex,
    _findNotebookIndexById: _findNotebookIndexById,
    _deleteNoteAtIndex: _deleteNoteAtIndex,
    _findNoteIndexById: _findNoteIndexById,

    // Notebook related
    createNotebook: createNotebook,
    getAllNotebook: getAllNotebook,
    getNoteBookById: getNoteBookById,
    getNoteBookByTitle: getNoteBookByTitle,
    deleteNoteBookById: deleteNoteBookById,
    deleteNotebookByTitle: deleteNotebookByTitle,
    updateNoteBookTitleById: updateNoteBookTitleById,
    updateNoteBookTitleByTitle: updateNoteBookTitleByTitle,

    // Note related
    getAllNote: getAllNote,
    createNote: createNote,
    getNoteById: getNoteById,
    getNoteByTitle: getNoteByTitle,
    deleteNoteById: deleteNoteById,
    deleteNoteByTitle: deleteNoteByTitle,
    updateNoteTitleById: updateNoteTitleById,
    updateNoteTitleByTitle: updateNoteTitleByTitle,
    updateNoteContentByID: updateNoteContentByID,
    updateNoteContentByTitle: updateNoteContentByTitle
  };
});