import * as angular from "angular";
angular.module('musicApp').controller('TracksController', [
  '$scope', '$http', '$timeout',
  function (
    $scope: {
      tracks: any[];
      currentTrack: { id: any } | null;
      isPlaying: boolean;
      audio: HTMLAudioElement;
      loadTracks: () => void;
      selectTrack: (track: any) => void;
      playNextTrack: () => void;
      playPreviousTrack: () => void;
      updateTrackStates: (trackId: any, isPlaying: boolean) => void;
    },
    $http: { get: (url: string) => Promise<any> },
    $timeout: (callback: () => void) => void
  ) {
    // Initialize controller properties
    $scope.tracks = [];
    $scope.currentTrack = null;
    $scope.isPlaying = false;
    $scope.audio = new Audio();

    // Load tracks from backend
    $scope.loadTracks = function () {
      $http.get('/api/tracks')
        .then(response => {
          $scope.tracks = response.data.map((track: any) => ({
            ...track,
            isPlaying: false
          }));
        })
        .catch(error => {
          console.error('Error fetching tracks:', error);
          alert('Failed to load tracks. Please try again later.');
        });
    };

    // Update the state of all tracks
    $scope.updateTrackStates = function (trackId, isPlaying) {
      $scope.tracks = $scope.tracks.map(track => ({
        ...track,
        isPlaying: track.id === trackId && isPlaying
      }));
    };

    // Select and play/pause a track
    $scope.selectTrack = function (track) {
      if ($scope.currentTrack && $scope.currentTrack.id === track.id) {
        $scope.isPlaying = !$scope.isPlaying; // Toggle play/pause
      } else {
        $scope.currentTrack = track;
        $scope.audio.src = track.audio;
        $scope.isPlaying = true;
      }

      $scope.updateTrackStates(track.id, $scope.isPlaying);

      if ($scope.isPlaying) {
        $scope.audio.play();
      } else {
        $scope.audio.pause();
      }
    };

    // Play the next track
    $scope.playNextTrack = function () {
      if (!$scope.currentTrack) return; // Null check for currentTrack

      const currentIndex = $scope.tracks.findIndex(t => t.id === $scope.currentTrack?.id);
      const nextIndex = (currentIndex + 1) % $scope.tracks.length;
      const nextTrack = $scope.tracks[nextIndex];

      $scope.selectTrack(nextTrack);
    };

    // Play the previous track
    $scope.playPreviousTrack = function () {
      if (!$scope.currentTrack) return; // Null check for currentTrack

      const currentIndex = $scope.tracks.findIndex(t => t.id === $scope.currentTrack?.id);
      const prevIndex = (currentIndex - 1 + $scope.tracks.length) % $scope.tracks.length;
      const prevTrack = $scope.tracks[prevIndex];

      $scope.selectTrack(prevTrack);
    };

    // Automatically play the next track when the current one ends
    $scope.audio.addEventListener('ended', function () {
      $timeout($scope.playNextTrack);
    });

    // Initialize by loading tracks
    $scope.loadTracks();
  }
]);
