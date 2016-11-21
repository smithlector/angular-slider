(function(window, document, undefined) {
	'use strict';
	angular.module('myApp', ['ular.ngResponsive'])
	.controller('SliderController', ['$scope', '$slider', function($scope, $slider){
		$slider({scope: $scope, indicators: true, controlNav: true, breakpoints: { xs: 1, mobile: 2, tablet: 2, desktop: 1}, slides : [
				{id: 1, image: '', content:'<p>This is test.</p><span>This is test.</span>', bgColor:'#d4d4d4'},
				{id: 2, image: 'images/2.jpg', content:''},
				{id: 3, image: 'images/3.jpg', content:''},
				{id: 4, image: 'images/4.jpg', content:''},
				{id: 5, image: 'images/5.jpg', content:''},
				{id: 6, image: 'images/6.jpg', content:''},
			]});
	}]);
})(window, document);