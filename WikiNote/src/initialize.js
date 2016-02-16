define([
	'fastclick',
], function(FastClick) {
	var initialize = function() {
		new FastClick(document.body);
	};
	return {
		initialize: initialize
	};
});