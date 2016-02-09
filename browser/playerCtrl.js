

app.controller('playerCtrl',function($rootScope, $scope, $http){

	$rootScope.$on('playBtn', function(event, playObj){
		$scope.currentSong = playObj.currentSong;
		$scope.playingSong = playObj.playingSong;
	});


	$rootScope.$on('newAlbum', function(event, album){
		$scope.album = album;
	});

	$rootScope.$on('nextSong', function(){
		$scope.next();
	});

    $scope.next = function(){
    	console.log($scope.album);
    	var currentIdx = $scope.album.songs.indexOf($scope.currentSong);
    	currentIdx = (currentIdx+1)%$scope.album.songs.length;

    	$rootScope.$broadcast('newSong', $scope.album.songs[currentIdx]);

    };

     $scope.prev = function(){
    	var currentIdx = $scope.album.songs.indexOf($scope.currentSong);
    	currentIdx = (currentIdx) ? currentIdx - 1: $scope.album.songs.length - 1;
    	$rootScope.$broadcast('newSong', $scope.album.songs[currentIdx]);
    };

    $scope.keyboardInput = function(keycode){
    	if(keycode == 32) $scope.play();
    	if(keycode == 37) $scope.prev();
    	if(keycode == 39) $scope.next();
    };

    $scope.play = function(){
    	$rootScope.$broadcast('newSong', $scope.currentSong);
    };

    $rootScope.$on('update', function(event, progress){
    	$scope.progress = progress;
    	$scope.$digest();
    });

    $scope.shuffle = function(){
    	$rootScope.$broadcast('shuffle');
    };
	document.getElementsByClassName('progress')[0].addEventListener('click', function (e) {
   		var x = e.pageX - this.offsetLeft;
   		var clickedValue = x / this.offsetWidth;

	   	$rootScope.$broadcast('scrubbing', clickedValue);
	});

});
