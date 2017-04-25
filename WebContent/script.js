app.controller(
				'githubViewer',
				function($scope, github, $interval, $log, $anchorScroll,
						$location) {

					
					var onUsercomplete = function(data) {
						$scope.user = data;
						github.getRepos($scope.user).then(onRepos, onError);
						github.getStarred($scope.user).then(onStarred, onError);
						github.getFollowers($scope.user).then(onFollowers,
								onError);
						github.getFollowing($scope.user).then(onFollowing,
								onError);
					};

					var onRepos = function(data) {
						$scope.repos = data;
						$location.hash("userdetails");
						$anchorScroll();
					};
					var onStarred = function(data) {
						$scope.starred = data;
						$location.hash("userdetails");
						$anchorScroll();
					};
					var onFollowers = function(data) {
						$scope.followers = data;
						$location.hash("userdetails");
						$anchorScroll();
					};
					var onFollowing = function(data) {
						$scope.following = data;
						$location.hash("userdetails");
						$anchorScroll();
					};

					var onError = function(reason) {
						$scope.error = "Sorry please check your username"
					};

					var decrementCountdown = function() {
						$scope.countdown -= 1;
						if ($scope.countdown < 1) {
							$scope.search($scope.username);
						}
					};

					$scope.getFile = function($event) {
						github.getValue($event.target.id, $scope.user.login)
								.then(onFiles, onError);
						console.log($scope.user.login);
					}

					var onFiles = function(data) {
						var Base64 = {
							_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
							encode : function(e) {
								var t = "";
								var n, r, i, s, o, u, a;
								var f = 0;
								e = Base64._utf8_encode(e);
								while (f < e.length) {
									n = e.charCodeAt(f++);
									r = e.charCodeAt(f++);
									i = e.charCodeAt(f++);
									s = n >> 2;
									o = (n & 3) << 4 | r >> 4;
									u = (r & 15) << 2 | i >> 6;
									a = i & 63;
									if (isNaN(r)) {
										u = a = 64
									} else if (isNaN(i)) {
										a = 64
									}
									t = t + this._keyStr.charAt(s)
											+ this._keyStr.charAt(o)
											+ this._keyStr.charAt(u)
											+ this._keyStr.charAt(a)
								}
								return t
							},
							decode : function(e) {
								var t = "";
								var n, r, i;
								var s, o, u, a;
								var f = 0;
								e = e.replace(/[^A-Za-z0-9+/=]/g, "");
								while (f < e.length) {
									s = this._keyStr.indexOf(e.charAt(f++));
									o = this._keyStr.indexOf(e.charAt(f++));
									u = this._keyStr.indexOf(e.charAt(f++));
									a = this._keyStr.indexOf(e.charAt(f++));
									n = s << 2 | o >> 4;
									r = (o & 15) << 4 | u >> 2;
									i = (u & 3) << 6 | a;
									t = t + String.fromCharCode(n);
									if (u != 64) {
										t = t + String.fromCharCode(r)
									}
									if (a != 64) {
										t = t + String.fromCharCode(i)
									}
								}
								t = Base64._utf8_decode(t);
								return t
							},
							_utf8_encode : function(e) {
								e = e.replace(/rn/g, "n");
								var t = "";
								for (var n = 0; n < e.length; n++) {
									var r = e.charCodeAt(n);
									if (r < 128) {
										t += String.fromCharCode(r)
									} else if (r > 127 && r < 2048) {
										t += String.fromCharCode(r >> 6 | 192);
										t += String.fromCharCode(r & 63 | 128)
									} else {
										t += String.fromCharCode(r >> 12 | 224);
										t += String
												.fromCharCode(r >> 6 & 63 | 128);
										t += String.fromCharCode(r & 63 | 128)
									}
								}
								return t
							},
							_utf8_decode : function(e) {
								var t = "";
								var n = 0;
								var r = c1 = c2 = 0;
								while (n < e.length) {
									r = e.charCodeAt(n);
									if (r < 128) {
										t += String.fromCharCode(r);
										n++
									} else if (r > 191 && r < 224) {
										c2 = e.charCodeAt(n + 1);
										t += String.fromCharCode((r & 31) << 6
												| c2 & 63);
										n += 2
									} else {
										c2 = e.charCodeAt(n + 1);
										c3 = e.charCodeAt(n + 2);
										t += String.fromCharCode((r & 15) << 12
												| (c2 & 63) << 6 | c3 & 63);
										n += 3
									}
								}
								return t
							}
						};

						console.log(Base64.decode(data));
						$scope.input = Base64.decode(data);
						$anchorScroll();
					}

					var countdownInterval = null;
					var startCountdown = function() {
						countdownInterval = $interval(decrementCountdown, 1000,
								$scope.countdown);
					};

					$scope.search = function(username) {
						$log.info("Searching for " + username);
						github.getUser(username).then(onUsercomplete, onError);
						if (countdownInterval) {
							$interval.cancel(countdownInterval);
							$scope.countdown = null;
						}
					};

					
					$scope.message = "GitHub Viewer";
					$scope.repoSortOrder = "-stargazers_count";
					$scope.countdown = 10;
					$scope.file = '';
					startCountdown();
					/* $scope.readMeUrl = 'https://www.w3schools.com'; */
					$scope.query = {}
					$scope.queryBy = '$'
						
/*						$scope.input = 'Enter your [Markdown][1] here.' +
				        '\n' +
				        '\n- *first*' +
				        '\n- **second**' +
				        '\n- third' +
				        '\n' +
				        '\n[1]: http://daringfireball.net/projects/markdown/syntax';*/
				})

				.filter('markdown', function() {
				    var converter = new Showdown.converter();
				    return converter.makeHtml;
				});	
				