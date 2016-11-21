<!DOCTYPE html>
<html ng-app="myApp">
	<head>
		<title>Slider - AngularJs</title>
		<link rel="stylesheet" href="http://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css"/>
		<link rel="stylesheet" href="css/bootstrap.min.css"/>
		<link rel="stylesheet" href="css/style.css"/>
		<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.8/angular.min.js"></script>
	</head>
	<body >
		<div class="col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2" ng-controller="SliderController">
			<slider-responsive slides="" class="ng-slider-wrapper"></slider-responsive>
		</div>
		
		<script type="text/javascript" src="script/angular-strap.js"></script>
		<script type="text/javascript" src="script/slider.js"></script>
		<script type="text/javascript" src="script/script.js"></script>
	</body>
</html>