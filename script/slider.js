(function(window, document, undefined) {
	'use strict';
	angular.module('ular.ngResponsive', [])
	.provider('slider', function () {
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
		this.$get = ['$window', '$rootScope', '$timeout', function($window, $rootScope, $timeout){
			function SliderFactory(element, config){
				var $slider = {};
				var options = $slider.$options = angular.extend({}, defaults, config);
				var scope = $slider.$scope = options.scope;
				var box = element[0].querySelector('.slides');
				var items;
				var parentW = element[0].clientWidth;
				scope.$slides = [];
				scope.$slidesInViewport = 1;
				scope.current = scope.direction = 0;
				scope.$indicators = scope.$controlNav = false;
				$slider.init = function(){
					scope.$slides = options.slides;
					if(options.indicators) scope.$indicators = true;
					if(options.controlNav) scope.$controlNav = true;
					scope.viewPort();
					box.style.transition = 'all '+(options.animationTransition / 1000)+'s ease-in-out';
					element.on('mouseenter', scope.$onMouseEnter);
					element.on('mouseleave', scope.$onMouseLeave);
				};
				angular.element($window).bind('resize', function(){
					scope.viewPort();
				});
				scope.viewPort = function(){
					var windowW = $window.innerWidth;
					if(windowW >= 992){
						screen = 'desktop';
					}else if(768 <= windowW && windowW < 992){
						screen = 'tablet';
					}else if(480 <= windowW && windowW < 768){
						screen = 'mobile';
					}else{
						screen = 'xs';
					}
					
					if(angular.isDefined(options.breakpoints[screen])) scope.$slidesInViewport = options.breakpoints[screen];
					scope.$indicator = (scope.$slidesInViewport === 1) ? scope.$slides.length : (scope.$slides.length - scope.$slidesInViewport + 1);
					box.style.width = ((100 / scope.$slidesInViewport) * scope.$slides.length)+'%';
					scope.current = 0;
					scope.$select(scope.current);
				};
				scope.$on('onRepeatLast', function(){
					scope.$setItems();
				});
				scope.$setItems = function(){
					items = element[0].querySelectorAll('.slide');
					items[scope.current].classList.add('active');
					for(var i = 0; i < scope.$slides.length; i++){
						items[i].style.width = (100 / items.length)+'%';
					}
					if(options.autoPlay) scope.$play();
				}
				scope.$createIndicators = function(num){
					return new Array(num);
				};
				scope.$isActive = function(state){
					return scope.current === state;
				}
				scope.$select = function(index){
					scope.current = index;
					scope.moveSlide();
				}
				scope.$prev = function(){
					scope.direction = -1;
					scope.current = scope.current + scope.direction;
					scope.moveSlide();
				};
				scope.$next = function(){
					scope.direction = 1;
					scope.current = scope.current + scope.direction;
					scope.moveSlide();
				};
				scope.moveSlide = function(){
					if(scope.direction === -1 && scope.current < 0){
						scope.current = scope.$slides.length - scope.$slidesInViewport;
					}
					if(scope.direction === 1 && !items[scope.current + (scope.$slidesInViewport - 1)]){
						scope.current = 0;
					}
					box.style.marginLeft = '-'+((100 / scope.$slidesInViewport) * scope.current)+'%';
				};
				scope.$onMouseEnter = function(evt){
					if(options.pauseOnHover) scope.$stop();
				};
				scope.$onMouseLeave = function(evt){
					if(options.autoPlay) scope.$play();
				};
				scope.$play = function(){
					scope.play = $timeout(function(){
						scope.$next();
						scope.$play();
					}, options.interval);
				};
				scope.$stop = function(){
					$timeout.cancel(scope.play);
				};
				$slider.init();
				return $slider;
			}
			SliderFactory.defaults = defaults;
			return SliderFactory;
		}];
	}).directive('sliderResponsive', ['$http', '$sce', 'slider', function($http, $sce, slider){
		return {
			restrict : 'EA',
			templateUrl : 'template/slider.html',
			scope: true,
			link: function(scope, element, attr, transclusion) {
				var options = {
					scope: scope
				};
				if(angular.isDefined(scope.slider)){
					angular.forEach(scope.slider, function(key, value) {
						options[value] = key;
					});
				}
				angular.forEach(scope.slider.slides, function(key, value) {
					scope.slider.slides[value].content = $sce.trustAsHtml(key.content);
				});
				var sliderres = slider(element, options);
			}
		};
	}]).directive('onLastRepeat', function(){
		return function(scope, element, attrs) {
			if (scope.$last) setTimeout(function(){
				scope.$emit('onRepeatLast', element, attrs);
			}, 1);
		};
	});
})(window, document);