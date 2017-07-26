'use strict';
(function (angular) {
	//创建模块
	var module = angular.module('movieCat.movie_list', ['ngRoute', 'movieCat.services.http'])

//  创建路由
	module.config(['$routeProvider', function ($routeProvider) {
		$routeProvider.when(
			'/:type/:page', {
				templateUrl: 'movie_list/view.html',
				controller: "movieListController"
			}
		)
	}])
	module.controller('movieListController', ['$scope','$route', '$routeParams', 'HttpService', function ($scope,$route, $routeParams, HttpService) {
		var count = 10;
		var page = parseInt($routeParams.page);
		var start = (page - 1) * count;
		$scope.subjects = [];
		$scope.message = '';
		$scope.title = '';
		$scope.totalCount = 0;
		$scope.totalPages = 0;
		$scope.loading = true;
		$scope.currentPage = page;

		HttpService.jsonp('http://api.douban.com/v2/movie/'+$routeParams.type,
			{count: count, start: start},
			function (data) {
				//console.log(111);
				$scope.subjects = data.subjects;
				$scope.title = data.title;
				$scope.totalCount = data.total;
				$scope.totalPages = Math.ceil($scope.totalCount / count);
				$scope.loading = false;
				$scope.$apply();
			});
		$scope.go=function(page){
			if(page>=1&&page<=$scope.totalPages){
				$route.updateParams({page:page})
			}

		}


		//$http.get('/app/data.json').then(function(respon){
		//		if(respon.status==200){
		//			$scope.subjects=respon.data.subjects;
		//			console.log(respon)
		//		}else{
		//			$scope.message="没有找到信息"
		//		}
		//
		//	},
		//function(err){
		//	$scope.message="没有找到信息"
		//	console.log(111)
		//}
		//)

	}])

})(angular)
