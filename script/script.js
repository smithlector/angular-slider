(function(window, document, undefined) {
	'use strict';
	angular.module('myApp', ['responsiveSlider'])
	/* .config(function(sliderProvider){
		//sliderProvider.setBar({directionNav:true});
	}) */
	.controller('SloderController', function(slider){
		//slider.setBar({breakpoints:{ xs:2 }});
		this.slides = [
			{id: 1, content: 'images/1.jpg'},
			{id: 2, content: 'images/2.jpg'},
			{id: 3, content: 'images/3.jpg'},
			{id: 4, content: 'images/4.jpg'},
			{id: 5, content: 'images/5.jpg'},
			{id: 6, content: 'images/6.jpg'},
		];
		//slider({slides:this.slides});
	});
})(window, document);