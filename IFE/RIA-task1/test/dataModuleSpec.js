define(['data'], function(data) {

  var initialNoteBooks = [{
    id: 0,
    title: "FrontSeat",
    createDate: '2015/7/25',
    modifyDate: '2015/7/25',
    notes: [{
      id: 0,
      title: "WikiNote",
      content: "",
      tag: [],
      createDate: '2015/7/25 下午9:18:01',
      modifyDate: '2015/7/25 下午9:18:01',
    }]
  }];

  describe('Data Module Test Specs', function() {

    describe('Notebook Related Private API', function() {

      /////////////////////////////
      // _checkNotebookExistence //
      /////////////////////////////

      it('should find the existing notebook with same title', function() {
        expect(data._checkNotebookExistence('default')).toBe(true);
        expect(data._checkNotebookExistence('Default')).toBe(true);
        expect(data._checkNotebookExistence('dEfAuLT')).toBe(true);

        expect(data._checkNotebookExistence('Li Xinyang')).toBe(false);
      });

      // it('should delete notebook by using notebook index', function() {
      //   var notebook = data._deleteNoteBookAtIndex(0);
      //   expect(JSON.stringify(notebook)).toEqual(JSON.stringify(initialNoteBooks[0]));
      //   expect(data.getAllNotebook.length).toBe(0);
      // });

      it('should find the the index by using notebook ID', function() {
        expect(data._findNotebookIndexById(0)).toBe(0);
      });
    });

    describe('Notebook Related Public API', function() {

      ////////////////////
      // getAllNotebook //
      ////////////////////

      it('should get all initial notebooks', function() {
        var notebooks = data.getAllNotebook();
        expect(JSON.stringify(notebooks) === JSON.stringify(initialNoteBooks)).toBe(true);
      });

      /////////////////////
      // getNoteBookById //
      /////////////////////

      it('should get notebook by ID', function() {
        var notebook = {
          id: 0,
          title: "default",
          createDate: 1437313304462,
          modifyDate: 1437313304462,
          notes: [{
            id: 0,
            title: "WikiNote",
            content: "**Hello, world!**",
            tag: [],
            createDate: 1437313304462,
            modifyDate: 1437313304462
          }],
        };
        var targetNotebook = data.getNoteBookById(0);

        expect(targetNotebook.id).toEqual(notebook.id);
        expect(targetNotebook.title).toEqual(notebook.title);
      });

      ////////////////////////
      // getNoteBookByTitle //
      ////////////////////////

      it('shoud get notebook by title', function() {
        var notebook = initialNoteBooks[0];
        expect(notebook.id).toBe(data.getNoteBookByTitle('default').id);
        expect(notebook.title).toBe(data.getNoteBookByTitle('default').title);
      });

      /////////////////////////////
      // updateNoteBookTitleById //
      /////////////////////////////

      it('should change notebook title by ID', function() {
        var state = data.updateNoteBookTitleById(0, 'IP Man');
        expect(state).toBe(true);
        expect(data.getNoteBookById(0).title).toEqual('IP Man');

        state = data.updateNoteBookTitleById(0, 'default');
        expect(state).toBe(true);
        expect(data.getNoteBookById(0).title).toEqual('default');
      });

      ////////////////////////////////
      // updateNoteBookTitleByTitle //
      ////////////////////////////////

      it('should change notebook title by existing title', function() {
        var state = data.updateNoteBookTitleByTitle('default', 'IP Man');
        expect(state).toBe(true);
        expect(data.getNoteBookById(0).title).toEqual('IP Man');

        state = data.updateNoteBookTitleByTitle('IP Man', 'default');
        expect(state).toBe(true);
        expect(data.getNoteBookById(0).title).toEqual('default');
      });

      ////////////////////
      // createNotebook //
      ////////////////////

      it('should create a new notebook', function() {
        var state = data.createNotebook('New Notebook');
        var currentTime = new Date();
        var notebooks = data.getAllNotebook();
        var lastNoteBook = notebooks[notebooks.length - 1];

        expect(lastNoteBook.id).toBe(1);
        expect(lastNoteBook.title).toBe('New Notebook');
        expect(state).toBe(true);
      });

      it('should not create a new notebook with existing title', function() {
        var state = data.createNotebook('Default');
        expect(state).toBe(false);
      });

      ////////////////////////
      // deleteNoteBookById //
      ////////////////////////

      it('should delete notebook by using ID', function() {
        var targetNotebook = data.getAllNotebook()[1];
        var deletedNotebook = data.deleteNoteBookById(1);
        expect(deletedNotebook).toEqual(targetNotebook);
        expect(data.getAllNotebook().length).toBe(1);
      });

      ////////////////////////////
      // deleteNotebookByTitle  //
      ////////////////////////////

      it('should delete notebook by using title', function() {
        var state = data.createNotebook('New Notebook');
        data.deleteNotebookByTitle('New Notebook');
        expect(data.getAllNotebook().length).toBe(1);
      });
    });

    describe('Note Related Private API', function() {
      it('shoud find existing note with the same title in the target notebook', function() {
        expect(data._checkNoteExistence(0, 'WikiNote')).toBe(true);
        expect(data._checkNoteExistence(0, 'Iron Man')).toBe(false);
      });
    });

    describe('Note Related Public API', function() {
      it('should gat all note in the target notebook', function() {
        expect(data.getAllNote(0).length).toEqual(initialNoteBooks[0].notes.length);
      });

      it('should get note by ID', function() {
        expect(data.getNoteById(0, 0)).toEqual(initialNoteBooks[0].notes[0]);
      });

      it('shoud be able to create a new note', function() {
        var creationState = data.createNote('Iron Man', '**Iron Man**', 0);
        var createNote = data.getNoteById(1, 0);
        expect(creationState).toBe(true);
        expect(createNote.title).toEqual('Iron Man');
        expect(createNote.id).toEqual(1);
      });

      ///////////////////////////
      // updateNoteContentByID //
      ///////////////////////////

      it('should be able to update the note content by ID', function() {
        var note = data.getNoteById(0, 0);
        data.updateNoteContentByID(0, 0, '**Iron Man** is awesome');
        expect(note.content).toEqual('**Iron Man** is awesome');
        data.updateNoteContentByID(0, 0, '**Hello, world!**');
        expect(note.content).toEqual('**Hello, world!**');
      });

      //////////////////////////////
      // updateNoteContentByTitle //
      //////////////////////////////

      it('should be able to update the note content by title', function() {
        var note = data.getNoteByTitle('WikiNote', 0);
        data.updateNoteContentByTitle('WikiNote', 0, '**Iron Man**');
        expect(note.content).toEqual('**Iron Man**');
        data.updateNoteContentByTitle('WikiNote', 0, '**Hello, world!**');
        expect(note.content).toEqual('**Hello, world!**');
      });

      it('should find the note by title', function() {
        var targetNote = initialNoteBooks[0].notes[0];
        expect(data.getNoteByTitle('Wikinote', 0).id).toEqual(targetNote.id);
      });

      /////////////////////////////
      //// updateNoteTitleById ////
      /////////////////////////////

      it('should change note title by ID', function() {
        var state = data.updateNoteTitleById(0, 'IP Man', 0);
        expect(state).toBe(true);
        expect(data.getNoteById(0, 0).title).toEqual('IP Man');

        state = data.updateNoteTitleById(0, 'WikiNote', 0);
        expect(state).toBe(true);
        expect(data.getNoteById(0, 0).title).toEqual('WikiNote');
      });

      ////////////////////////////////
      //// updateNoteTitleByTitle ////
      ////////////////////////////////

      it('should change note title by existing title', function() {
        var state = data.updateNoteTitleByTitle('WikiNote', 'IP Man', 0);
        expect(state).toBe(true);
        expect(data.getNoteById(0, 0).title).toEqual('IP Man');

        state = data.updateNoteTitleByTitle('IP Man', 'WikiNote', 0);
        expect(state).toBe(true);
        expect(data.getNoteById(0, 0).title).toEqual('WikiNote');
      });

      ////////////////////////
      // deleteNoteById /////
      ////////////////////////

      it('should delete note by using ID', function() {
        var targetNote = data.getAllNote(0)[0];
        var deletedNote = data.deleteNoteById(0, 0);
        expect(deletedNote).toEqual(targetNote);
        expect(data.getAllNote(0).length).toBe(1);
      });

      ////////////////////////////
      //// deleteNoteByTitle  ////
      ////////////////////////////

      it('should delete note by using title', function() {
        var state = data.createNote('New Note', 'Text', 0);
        data.deleteNoteByTitle('New Note', 0);
        expect(data.getAllNote(0).length).toBe(1);
      });
    });
  });
});