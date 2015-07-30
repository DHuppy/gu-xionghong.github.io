var tests = [];
for (var file in window.__karma__.files) {
    if (/Spec\.js$/.test(file)) {
        tests.push(file);
    }
}

require.config({
  // Always make test-main.js the baseUrl
  baseUrl: '/base/app/src',
  paths: {
    jquery: '../bower_components/jquery/dist/jquery.min',
    marked: '../bower_components/marked/marked.min',
    data: './data',
    showNotesList: './showNotesList'
  },

  // dynamically load all test files
  deps: tests,

  callback: window.__karma__.start
});
