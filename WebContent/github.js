(function() {
	var github = function($http) {

		var getUser = function(username) {
			return $http.get('https://api.github.com/users/' + username).then(
					function(response) {
						return response.data;
					});
		};
		var getRepos = function(user) {
			return $http.get(user.repos_url).then(function(response) {
				return response.data;
			});
		};
		var getStarred = function(user) {
			return $http.get(
					"https://api.github.com/users/" + user.login + "/starred")
					.then(function(response) {
						return response.data;
					})

		};
		var getFollowers = function(user) {
			return $http.get(user.followers_url).then(function(response) {
				return response.data;
			});
		}
		var getFollowing = function(user) {
			return $http
					.get(
							"https://api.github.com/users/" + user.login
									+ "/following").then(function(response) {
						return response.data;
					})

		};
		var getValue = function(repoName, username) {

			return $http.get(
					"https://api.github.com/repos/" + username + "/" + repoName
							+ "/contents/README.md").then(function(response) {
				return response.data.content;
			})
		};
		var getContent = function(repoName, username) {

			return $http.get(
					"https://api.github.com/repos/" + username + "/" + repoName
							+ "/contents").then(function(response) {
				return response.data;
			})
		};
		return {
			getContent : getContent,
			getFollowers : getFollowers,
			getFollowing : getFollowing,
			getValue : getValue,
			getUser : getUser,
			getRepos : getRepos,
			getStarred : getStarred
		};
	};

	var module = angular.module("myApp");
	module.factory("github", github);
}());
