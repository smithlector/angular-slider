(function(window, document, undefined) {
	angular.module('myApp', [])
	.controller('SliderController', ['$scope', '$element', function($scope, $element){
		$scope.slides = [
			{id: 1, content: 'images/1.jpg'},
			{id: 2, content: 'images/2.jpg'},
			{id: 3, content: 'images/3.jpg'},
			{id: 4, content: 'images/4.jpg'},
			{id: 5, content: 'images/5.jpg'},
			{id: 6, content: 'images/6.jpg'},
		];
		$scope.indicator = ($scope.slideshow == 1) ? $scope.slides.length : ($scope.slides.length - $scope.slideshow + 1);
		var box = document.querySelector('.slides');
		var items, parentW = box.parentElement.offsetWidth, direction = 0;
		$scope.$on('onRepeatLast', function(){
			$scope.updateConfig();
		});
		$scope.prev = function(){
			direction = -1;
			$scope.current = $scope.current + direction;
			$scope.moveSlide();
		};
		$scope.next = function(){
			direction = 1;
			$scope.current = $scope.current + direction;
			$scope.moveSlide();
		};
		$scope.moveSlide = function(){
			if(direction === -1 && $scope.current < 0){
				$scope.current = $scope.slides.length - $scope.slideshow;
			}
			if(direction === 1 && !items[$scope.current + ($scope.slideshow - 1)]){
				$scope.current = 0;
			}
			box.style.marginLeft = '-'+((parentW / $scope.slideshow) * $scope.current)+'px';
		};
		$scope.updateList = function(){
			$scope.updateConfig();
			$scope.moveSlide();
		};
		$scope.$watch('slides', function(){
			$scope.updateConfig();
		});
		$scope.updateConfig = function(){
			items = box.querySelectorAll('.slide');
			$scope.current = 0;
			items[$scope.current].classList.add('active');
			box.style.width = (parentW * items.length)+'px';
			for(var i = 0; i < items.length; i++){
				items[i].style.width = (parentW / $scope.slideshow)+'px';
			}
		};
		$scope.createIndicators = function(num){
			return new Array(num);
		};
		$scope.select = function(index){
			$scope.current = index;
			$scope.moveSlide();
		}
		$scope.isActive = function(state){
			return $scope.current === state;
		}
	}]).directive('slider', ['$http', '$compile', function($http, $compile){
		return {
			restrict : 'E',
			controller: 'SliderController',
			controllerAs: 'SCtrl',
			scope: {
				slideshow: '@',
				slideindicator: '@',
				directionnav: '@'
			},
			templateUrl : 'template/slider.html',
			link: function(scope, element, attrs) {
				if(!scope.slideshow){
					scope.slideshow = 1;
				}else{
					scope.slideshow = attrs.slideshow;
				}
				if(!scope.slideindicator){
					scope.slideindicator = 'false';
				}else{
					scope.slideindicator = attrs.slideindicator;
				}
				if(!scope.directionnav){
					scope.directionnav = 'true';
				}else{
					scope.directionnav = attrs.directionnav;
				}
				angular.element(element[0].querySelector('a.back-slide')).bind('click', function(){
					scope.prev();
				});
				angular.element(element[0].querySelector('a.forward-slide')).bind('click', function(){
					scope.next();
				});
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