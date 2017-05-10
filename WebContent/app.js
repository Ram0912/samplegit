var app = angular.module('myApp', [ 'ngRoute', 'ngSanitize' ]);

app.config(function($routeProvider) {
	$routeProvider

	.when('/', {
		templateUrl : 'views/profile.html',
		controller : 'githubViewer'
	}).when('/demo', {
		templateUrl : 'views/repos.html',
		controller : 'githubViewer'
	}).when('/repos', {
		templateUrl : 'views/ownrepos.html',
		controller : 'githubViewer'
	})

	.when('/star', {
		templateUrl : 'views/star.html',
		controller : 'githubViewer'
	}).when('/forked', {
		templateUrl : 'views/forked.html',
		controller : 'githubViewer'
	}).when('/follower', {
		templateUrl : 'views/followers.html',
		controller : 'githubViewer'
	}).when('/following', {
		templateUrl : 'views/following.html',
		controller : 'githubViewer'
	})
.when('/ownrepocont', {
		templateUrl : 'views/ownrepocont.html',
		controller : 'githubViewer'
	})
});