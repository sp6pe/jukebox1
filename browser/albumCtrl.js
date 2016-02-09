

var app = angular.module('juke',[]); 

app.controller('albumCtrl',function($rootScope, $scope, $http){
	 $http.get('/api/albums/56b9f57f214140e87a9d0785')
    .then(function (response) {
        console.log('the server responded with', response);
        response.data.imageUrl = '/api/albums/' + response.data._id + '.image';
        $scope.album = response.data;
        $scope.album.shuffled = false;
        $rootScope.$broadcast('newAlbum', $scope.album);
    }).catch(console.error.bind(console));

     $rootScope.$on('newSong', function(event, newSong){
        $scope.playAudio(newSong);
     });

     $scope.playAudio = function (song){     	
     	if($scope.currentSong === song){
     		if($scope.playingSong){
	     		audio.pause();
	     		$scope.playingSong = null;
	     	}else {
	     		audio.play();
	     		$scope.playingSong = $scope.currentSong._id;
	     	}
     	} else {
	     	audio.src = '/api/songs/'+song._id +'.audio';
			audio.load();
			audio.play();
			$scope.currentSong = song;
			$scope.playingSong = song._id;
		}

     $rootScope.$broadcast('playBtn', {
        currentSong: $scope.currentSong,
        playingSong: $scope.playingSong
     });
    };

    $rootScope.$on('shuffle', function(){
        $scope.shuffleList();
    });

    $scope.shuffleList = function(){
        if(!$scope.album.shuffled){
            $scope.album.songs = shuffleArray($scope.album.songs);
            $scope.album.shuffled = true;
        }else{
            $scope.album.songs = sortArray($scope.album.songs);
            $scope.album.shuffled = false;
        }
    };

    var audio = document.createElement('audio');

    audio.addEventListener('timeupdate', function () {
    	$rootScope.$broadcast('update', 100 * audio.currentTime / audio.duration);
	});	

    audio.addEventListener('ended', function () {
        $rootScope.$broadcast('nextSong');
    });

    $rootScope.$on('scrubbing', function(event, value){
        var time = audio.duration * value;
        audio.currentTime = time;
    });

});

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    return array;
}

function sortArray(array){
    return array.sort(function(a, b){
        return a.name > b.name;
    });
}
