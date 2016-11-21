(function(window, document, undefined) {
	'use strict';
	angular.module('ular.ngResponsive.slider', [])
	.provider('$slider', function () {
		var defaults = this.defaults = {
			indicators: false,
			controlNav: false,
			templateUrl: 'template/slider.html',
			interval: 3000,
			animationTransition: 400,
			responsive: true,
			breakpoints: { xs: 1, mobile: 2, tablet: 2, desktop: 3 },
			slides: [],
			autoPlay: true,
			pauseOnHover: true,
		};
		var screen = 'desktop';
		var options, scope, $slider = {};
		this.$get = ['$window', '$rootScope', '$timeout', function($window, $rootScope, $timeout){
			function SliderFactory(config){
				console.log('SliderFactory');
				options = $slider.$options = angular.extend({}, defaults, config);
				scope = $slider.$scope = options.scope && options.scope.$new() || $rootScope.$new();
				var container = findElement('slider-responsive');
				var items;
				var parentW = container[0].clientWidth;
				scope.$slidesInViewport = 1;
				scope.current = scope.direction = 0;
				scope.$indicators = scope.$controlNav = false;
				$slider.init = function(){
					scope.$slides = options.slides;
					if(options.indicators) scope.$indicators = true;
					if(options.controlNav) scope.$controlNav = true;
					//scope.viewPort();
					console.log(options);
					container[0].style.transition = 'all '+(options.animationTransition / 1000)+'s ease-in-out';
					container.on('mouseenter', scope.$onMouseEnter);
					container.on('mouseleave', scope.$onMouseLeave);
				};
				scope.$onMouseEnter = function(evt){
					console.log('onMouseEnter');
				};
				scope.$onMouseLeave = function(evt){
					console.log('onMouseLeave');
				};
				$slider.init();
				return $slider;
			}
			function findElement(query, element) {
				return angular.element((element || document).querySelector(query));
			}
			SliderFactory.defaults = defaults;
			return SliderFactory;
		}];
	}).directive('sliderResponsive', ['$sce', '$slider', function($sce, $slider){
		return {
			restrict : 'EA',
			templateUrl : 'template/slider.html',
			scope: true,
			link: function(scope, element, attr, transclusion) {
				console.log('directive');
				var options = {
					scope: scope
				};
				var slider = $slider();
				slider.$options.scope = scope;
				console.log(slider.$options);
			}
		};
	}]).directive('onLastRepeat', function(){
		return function(scope, element, attrs) {
			if (scope.$last) setTimeout(function(){
				scope.$emit('onRepeatLast', element, attrs);
			}, 1);
		};
	});
	angular.module('ular.ngResponsive', [ 'ular.ngResponsive.slider' ]);
})(window, document);