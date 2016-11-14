(function(window, document, undefined) {
	'use strict';
	angular.module('responsiveSlider', [])
	.provider('slider', function () {
		var defaults = this.defaults = {
			directionNav: false,
			controlNav: false,
			templateUrl: 'template/slider.html',
			interval: 3000,
			animationTransition: 400,
			responsive: true,
			breakpoints: { xs: 1, mobile: 2, tablet: 2, desktop: 3 },
			slides: {},
		};
		/* this.setBar = function (config) {
			this.bar = true;
			console.log(defaults);
			defaults = angular.extend({}, defaults, config);
			console.log(defaults);
		}; */
		this.$get = [ '$window', '$rootScope', '$timeout', function($window, $rootScope, $timeout) {
			function SliderFactory(element, controller, config){
				var $slider = {};
				var options = $slider.$options = angular.extend({}, defaults, config);
				var scope = $slider.$scope = options.scope && options.scope.$new() || $rootScope.$new();
				$slider.prev = function(){
					console.log(options);
				};
				return $slider;
			}
			SliderFactory.defaults = defaults;
			return SliderFactory;
		}];
	}).directive('sliderResponsive', ['$http', '$compile', 'slider', function($http, $compile, slider){
		return {
			restrict : 'AE',
			templateUrl : 'template/slider.html',
			link: function(scope, element, attrs, ) {
				var options = {
					scope: scope,
					element: element
				};
				var sliderres = slider(options);
					sliderres.prev();
				angular.element(element[0].querySelector('a.back-slide')).bind('click', function(){
				});
				angular.element(element[0].querySelector('a.forward-slide')).bind('click', function(){
					sliderres.next();
				});
			}
		};
	}]);
})(window, document);