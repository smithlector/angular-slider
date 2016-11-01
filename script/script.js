var app = angular.module('myApp', []);
app.controller('SliderController', ['$scope', '$element', function($scope, $element){
	$scope.slides = [
		{id: 1, content: 'images/1.jpg'},
		{id: 2, content: 'images/2.jpg'},
		{id: 3, content: 'images/3.jpg'},
		{id: 4, content: 'images/4.jpg'},
		{id: 5, content: 'images/5.jpg'},
		{id: 6, content: 'images/6.jpg'},
	];
	var box = document.querySelector('.slides');
	var items, current, parentW = box.parentElement.offsetWidth, direction = 0;
	$scope.$on('onRepeatLast', function(){
		items = box.querySelectorAll('.slide');
		current = 0;
		items[current].classList.add('active');
		box.style.width = (parentW * items.length)+'px';
		for(var i = 0; i < items.length; i++){
			items[i].style.width = parentW+'px';
		}
	});
	$scope.prev = function(){
		//$scope.slides = [];
		//$scope.slides.push({id: ($scope.slides.length + 1), content: 'images/4.jpg'});
		//$scope.$apply();
		direction = -1;
		$scope.updateList();
	};
	$scope.next = function(){
		//$scope.slides[5].content = 'images/6.jpg';
		//$scope.$apply();
		direction = 1;
		$scope.updateList();
	};
	$scope.moveSlide = function(){
		current = current + direction;
		if(direction === -1 && current < 0){
			current = $scope.slides.length - 1;
		}
		if(direction === 1 && !items[current]){
			current = 0;
		}
		box.style.marginLeft = '-'+(parentW * current)+'px';
	};
	$scope.updateList = function(){
		items = box.querySelectorAll('.slide');
		$scope.moveSlide();
	};
}]).directive('slider', ['$http', '$compile', function($http, $compile) {
    return {
        restrict : 'E',
		controller: 'SliderController',
		controllerAs: 'SCtrl',
		scope: {},
		templateUrl : 'template/slider.html',
		link: function(scope, element, attrs) {
			angular.element(element[0].querySelector('a.back-slide')).bind('click', function(){
				scope.prev();
				console.log('back-slide');
			});
			angular.element(element[0].querySelector('a.forward-slide')).bind('click', function(){
				scope.next();
				console.log('forward-slide');
			});
        }
    };
}]).directive('onLastRepeat', function() {
	return function(scope, element, attrs) {
		if (scope.$last) setTimeout(function(){
			scope.$emit('onRepeatLast', element, attrs);
		}, 1);
	};
});