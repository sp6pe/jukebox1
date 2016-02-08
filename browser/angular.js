

var app = angular.module('juke',[]); 

app.controller('MainCtrl',function($scope, $http){
	 $http.get('/api/albums/56b8ededae85489397645ff5')
    .then(function (response) {
        console.log('the server responded with', response);
        response.data.imageUrl = '/api/albums/' + response.data._id + '.image';
        $scope.album = response.data;
        console.log($scope.album);
    }).catch(console.error.bind(console));

     $scope.playAudio = function (song){
     	

     	if($scope.currentSong === song){
     		if(!$scope.paused){
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

     $scope.paused = audio.paused;

    }

    $scope.next = function(){

    	var currentIdx = $scope.album.songs.indexOf($scope.currentSong) 

    	//1
    	currentIdx = (currentIdx+1)%$scope.album.songs.length;
    	//2
    	$scope.playAudio($scope.album.songs[currentIdx]) 
    	//3

    	//currentSong= +1
    }

     $scope.prev = function(){

    	var currentIdx = $scope.album.songs.indexOf($scope.currentSong) 

    	//1
    	currentIdx = (currentIdx) ? currentIdx - 1: $scope.album.songs.length - 1;
    	//2
    	$scope.playAudio($scope.album.songs[currentIdx]) 
    	//3

    	//currentSong= +1
    }

    var audio = document.createElement('audio');



    audio.addEventListener('timeupdate', function () {
    	$scope.progress = 100 * audio.currentTime / audio.duration;
    	$scope.$digest();
	});


		

})

// app.controller('AudioCtrl',function($scope){
// 	.then(function(response){

// 	})
// })





// app.controller('MainCtrl', function ($scope) {
// 	$scope.album = fakeAlbum;
// 	console.log($scope);


// });

// var fakeAlbum = {
//     name: 'Abbey Road',
//     imageUrl: 'http://fillmurray.com/300/300',
//     songs: [{
//         name: 'Romeo & Juliette',
//         artists: [{name: 'Bill'}],
//         genres: ['Smooth', 'Funk'],
//         audioUrl: 'http://www.stephaniequinn.com/Music/Commercial%20DEMO%20-%2013.mp3'
//     }, {
//         name: 'White Rabbit',
//         artists: [{name: 'Bill'}, {name: 'Bob'}],
//         genres: ['Fantasy', 'Sci-fi'],
//         audioUrl: 'http://www.stephaniequinn.com/Music/Commercial%20DEMO%20-%2008.mp3'
//     }, {
//         name: 'Lucy in the Sky with Diamonds',
//         artists: [{name: 'Bob'}],
//         genres: ['Space'],
//         audioUrl: 'http://www.stephaniequinn.com/Music/Commercial%20DEMO%20-%2001.mp3'
//     }]
// };

