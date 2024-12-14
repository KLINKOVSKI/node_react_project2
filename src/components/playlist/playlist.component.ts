export const PlaylistComponent = {
  template: `
    <div class="flex flex-col h-full">
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center space-x-4">
          <div class="w-48 h-48 bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <img
              ng-if="$ctrl.playlist.imageUrl"
              ng-src="{{$ctrl.playlist.imageUrl}}"
              alt="{{$ctrl.playlist.name}}"
              class="w-full h-full object-cover"
            >
            <div ng-if="!$ctrl.playlist.imageUrl" class="w-full h-full flex items-center justify-center">
              <i class="fas fa-music text-4xl text-gray-600"></i>
            </div>
          </div>
          <div>
            <h1 class="text-3xl font-bold text-white mb-2">{{$ctrl.playlist.name}}</h1>
            <p class="text-gray-400">{{$ctrl.tracks.length}} songs</p>
          </div>
        </div>
        
        <div class="flex items-center space-x-4">
          <button
            ng-click="$ctrl.playPlaylist()"
            class="px-8 py-3 rounded-full bg-green-500 text-black font-medium hover:bg-green-400 transition-colors"
          >
            Play
          </button>
          <div class="relative">
            <button
              ng-click="$ctrl.showOptions = !$ctrl.showOptions"
              class="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white"
            >
              <i class="fas fa-ellipsis-h"></i>
            </button>
            <div
              ng-if="$ctrl.showOptions"
              class="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1"
            >
              <button
                ng-click="$ctrl.editPlaylist()"
                class="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
              >
                Edit details
              </button>
              <button
                ng-click="$ctrl.deletePlaylist()"
                class="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700"
              >
                Delete playlist
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="flex-1 overflow-y-auto">
        <table class="w-full">
          <thead class="border-b border-gray-800">
            <tr>
              <th class="pb-4 text-left text-sm font-medium text-gray-400">#</th>
              <th class="pb-4 text-left text-sm font-medium text-gray-400">Title</th>
              <th class="pb-4 text-left text-sm font-medium text-gray-400">Artist</th>
              <th class="pb-4 text-left text-sm font-medium text-gray-400">Duration</th>
              <th class="pb-4"></th>
            </tr>
          </thead>
          <tbody>
            <tr
              ng-repeat="track in $ctrl.tracks"
              ng-click="$ctrl.playTrack(track)"
              class="group hover:bg-white hover:bg-opacity-10 cursor-pointer"
            >
              <td class="py-4 text-gray-400 w-12">{{$index + 1}}</td>
              <td class="py-4">
                <div class="flex items-center space-x-4">
                  <img
                    ng-src="{{track.artwork}}"
                    alt="{{track.title}}"
                    class="w-10 h-10 rounded"
                  >
                  <span class="text-white">{{track.title}}</span>
                </div>
              </td>
              <td class="py-4 text-gray-400">{{track.artist}}</td>
              <td class="py-4 text-gray-400">{{track.duration | date:'mm:ss'}}</td>
              <td class="py-4 text-right">
                <button
                  ng-click="$ctrl.removeTrack(track); $event.stopPropagation()"
                  class="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-white transition-opacity"
                >
                  <i class="fas fa-times"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  controller: class PlaylistController {
    private playlist: any;
    private tracks: any[];
    private showOptions: boolean;

    constructor(
      private playlistService,
      private playerService,
      private $state,
      private $stateParams
    ) {
      'ngInject';
      this.playlist = null;
      this.tracks = [];
      this.showOptions = false;
    }

    async $onInit() {
      await this.loadPlaylist();
    }

    async loadPlaylist() {
      try {
        this.playlist = await this.playlistService.getPlaylist(this.$stateParams.id);
        this.tracks = await this.playlistService.getPlaylistTracks(this.$stateParams.id);
      } catch (error) {
        console.error('Error loading playlist:', error);
      }
    }

    playTrack(track: any) {
      this.playerService.setTrack(track);
      this.playerService.setQueue(this.tracks);
    }

    playPlaylist() {
      if (this.tracks.length > 0) {
        this.playTrack(this.tracks[0]);
      }
    }

    async removeTrack(track: any) {
      try {
        await this.playlistService.removeTrackFromPlaylist(
          this.playlist.id,
          track.id
        );
        await this.loadPlaylist();
      } catch (error) {
        console.error('Error removing track:', error);
      }
    }

    async deletePlaylist() {
      if (confirm('Are you sure you want to delete this playlist?')) {
        try {
          await this.playlistService.deletePlaylist(this.playlist.id);
          this.$state.go('library');
        } catch (error) {
          console.error('Error deleting playlist:', error);
        }
      }
    }

    editPlaylist() {
      // Implementation for editing playlist details
      // This could open a modal or navigate to an edit view
    }
  }
};