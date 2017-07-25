/**
*  Module
*
* Description
*/
var app = angular.module('myApp', []);

app.controller('gameShowController', gameShow);
// app.controller('addGameController', addGame);

app.service('syncGameData', function($http){
	this.gameDataReload = function () {
		var getGameData = new Promise(function(resolve,reject){
			$http({
				method:'GET',
				url:"/gameData"
			}).then(function mySuccess(response) {
		        resolve(response.data);

		    }, function myError(response) {
		        // this.gamesData = response.statusText;
		    });
		});
		return getGameData;
	}

});



function gameShow($scope,$http,syncGameData) {
 	var initialData = function(){
	 	$http({
			method:'GET',
			url:"/gameData"
		}).then(function mySuccess(response) {
			// console.log(response.data);
	        $scope.gamesData = response.data;

	    }, function myError(response) {
	        // this.gamesData = response.statusText;
	    });
	}
	initialData();
	// function getData(){
	// 	// var deferred = $q.defer();
	// 	syncGameData.gameDataReload($scope).then(function(data){
	// 	   $scope.gamesData = data;
			
	// 	});
	// }
	// getData();
	
	// this.reload = getData();
	// this.reloadGame = function(){
	// 	getData();
	// }

	this.reloadGame = function(){
		initialData();

		// syncGameData.gameDataReload($scope).then(function(data){
		//    //success callback
		//    $scope.gamesData = data;
		//    // console.log($scope.gamesData);
		// });
		// console.log(data);
	}
	

	this.deleteGame = function(id){
		// console.log(id);
		$http.post('/deleteGame/'+id,$scope.gameInfo).then(function(response){
			$scope.message = response.data.message;
			// console.log(response.data);
			initialData();
			// getData();

		}, function(err){
			// this.message = err;
		})
	}

	this.insertGame = function(){
		$http.post('/addGame',$scope.gameInfo).then(function(response){
			$scope.message = response.data;
			$scope.addGameClick = false;
			initialData();

		}, function(err){
			console.log('error comes')
		})
	}

	this.gameEditModalValue = function(game){
		$scope.editGame = angular.copy(game);
	}

	this.updateGame = function(id){
		delete($scope.editGame['_id']);
		// console.log($scope.editGame);
		$http.post('/updateGame/'+id,$scope.editGame).then(function(response){
			$scope.message = response.data;
			$scope.addGameClick = false;
			initialData();
			angular.element('.modal').modal('toggle');

		}, function(err){
			console.log('error comes')
		})
	}
}

// function addGame($scope,$http){

	
// 	this.insertGame = function(){
// 		$http.post('/addGame',$scope.gameInfo).then(function(response){
// 			$scope.message = response.data;
// 			$scope.addGameClick = false;

// 		}, function(err){
// 			console.log('error comes')
// 		})
// 	};
	
// }