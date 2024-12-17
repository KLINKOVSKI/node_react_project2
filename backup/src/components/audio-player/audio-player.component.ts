export const AudioPlayerComponent = {
  template: `
    <div class="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 px-4 py-3">
      <div class="max-w-screen-2xl mx-auto flex items-center justify-between" ng-if="$ctrl.currentTrack">
        <div class="flex items-center space-x-4 w-1/4">
          <img ng-src="{{$ctrl.currentTrack.artwork}}" alt="{{$ctrl.currentTrack.title}}" class="w-14 h-14 rounded">
          <div>
            <h3 class="text-white font-medium">{{$ctrl.currentTrack.title}}</h3>
            <p class="text-sm text-gray-400">{{$ctrl.currentTrack.artist}}</p>
          </div>
        </div>
        
        <div class="flex flex-col items-center w-2/4">
          <div class="flex items-center space-x-6">
            <button class="text-gray-400 hover:text-white" ng-click="$ctrl.previousTrack()">
              <i class="fas fa-step-backward"></i>
            </button>
            <button 
              ng-click="$ctrl.togglePlay()"
              class="w-8 h-8 flex items-center justify-center rounded-full bg-white hover:scale-105 transition-transform"
            >
              <i class="fas" ng-class="{'fa-play': !$ctrl.isPlaying, 'fa-pause': $ctrl.isPlaying}"></i>
            </button>
            <button class="text-gray-400 hover:text-white" ng-click="$ctrl.nextTrack()">
              <i class="fas fa-step-forward"></i>
            </button>
          </div>
          <div class="w-full mt-2 flex items-center space-x-2">
            <span class="text-xs text-gray-400">{{$ctrl.currentTime | date:'mm:ss'}}</span>
            <input 
              type="range" 
              min="0" 
              max="{{$ctrl.duration}}" 
              ng-model="$ctrl.currentTime"
              class="flex-1 h-1 bg-gray-600 rounded-full"
            >
            <span class="text-xs text-gray-400">{{$ctrl.duration | date:'mm:ss'}}</span>
          </div>
        </div>
        
        <div class="flex items-center space-x-4 w-1/4 justify-end">
          <div class="flex items-center space-x-2">
            <i class="fas fa-volume-up text-gray-400"></i>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              ng-model="$ctrl.volume"
              ng-change="$ctrl.updateVolume()"
              class="w-24 accent-white"
            >
          </div>
        </div>
      </div>
      
      <audio
        id="audioPlayer"
        ng-src="{{$ctrl.currentTrack.url}}"
        ng-if="$ctrl.currentTrack"
      ></audio>
    </div>
  `,
  controller: class AudioPlayerController {
    private currentTrack: any;
    private isPlaying: boolean;
    private volume: number;
    private currentTime: number;
    private duration: number;
    private audio: HTMLAudioElement;

    constructor(private playerService) {
      'ngInject';
      this.currentTrack = null;
      this.isPlaying = false;
      this.volume = 1;
      this.currentTime = 0;
      this.duration = 0;
    }

    $onInit() {
      this.audio = document.getElementById('audioPlayer') as HTMLAudioElement;
      this.setupAudioListeners();
      this.updatePlayerState();
    }

    setupAudioListeners() {
      this.audio.addEventListener('timeupdate', () => {
        this.currentTime = this.audio.currentTime;
      });

      this.audio.addEventListener('loadedmetadata', () => {
        this.duration = this.audio.duration;
      });

      this.audio.addEventListener('ended', () => {
        this.nextTrack();
      });
    }

    updatePlayerState() {
      this.currentTrack = this.playerService.getCurrentTrack();
      this.isPlaying = this.playerService.getIsPlaying();
      this.volume = this.playerService.getVolume();
    }

    togglePlay() {
      this.playerService.togglePlay();
      this.isPlaying = this.playerService.getIsPlaying();
      if (this.isPlaying) {
        this.audio.play();
      } else {
        this.audio.pause();
      }
    }

    updateVolume() {
      this.playerService.setVolume(this.volume);
      this.audio.volume = this.volume;
    }

    nextTrack() {
      this.playerService.nextTrack();
      this.updatePlayerState();
    }

    previousTrack() {
      this.playerService.previousTrack();
      this.updatePlayerState();
    }
  }
};