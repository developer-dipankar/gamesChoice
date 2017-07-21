/**
*  Module
*
* Description
*/
var app = angular.module('myApp', []);
app.controller('gameShowController', gameShow);
app.controller('addGameController', addGame);

app.service('syncGameData', function($http){
	this.gameDataReload = function () {
		var getGameData = new Promise(function(resolve,reject){
			$http({
				method:'GET',
				url:"/gameData"
			})
			// .success(function(response){
		 //        return response.data;
			// }).error(function(response) {

			// })







			.then(function mySuccess(response) {
		        resolve(response.data);

		    }, function myError(response) {
		        // this.gamesData = response.statusText;
		    });
		});
		return getGameData;
	}

});

function gameShow($scope,$http,syncGameData) {
	this.gamesData = '';
 	var reloadData = function(){
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
	reloadData();

	this.reloadGame = function(){
		var data = syncGameData.gameDataReload().then(function(data){
		   //success callback
		   $scope.gamesData = data;
		   console.log($scope.gamesData);
		 });
		
	    // $scope.gamesData = data;
	    // console.log(data);
	    // return data;
	}

	// this.reloadGame = syncGameData.gameDataReload();
}

function addGame($scope,$http){
	
	this.insertGame = function(){
		$http.post('/addGame',$scope.gameInfo).then(function(response){
			this.message = response.data;

		}, function(err){
			// this.message = err;
		})
	};
	
}