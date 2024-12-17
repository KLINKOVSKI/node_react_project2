export const SidebarComponent = {
  template: `
    <div class="flex flex-col w-64 bg-black text-white h-screen fixed left-0 top-0">
      <div class="p-6">
        <a ui-sref="home" class="flex items-center space-x-2">
          <div class="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <i class="fas fa-music text-black"></i>
          </div>
          <span class="text-xl font-bold">Music Stream</span>
        </a>
      </div>

      <nav class="flex-1 px-2">
        <a
          ng-repeat="item in $ctrl.navItems"
          ui-sref="{{item.state}}"
          ui-sref-active="bg-gray-800"
          class="flex items-center space-x-4 px-4 py-3 rounded-md transition-colors text-gray-400 hover:text-white"
        >
          <i class="fas {{item.icon}}"></i>
          <span>{{item.label}}</span>
        </a>
      </nav>

      <div class="p-4 border-t border-gray-800">
        <div class="flex items-center justify-between text-gray-400">
          <a
            ui-sref="profile"
            class="flex items-center space-x-2 hover:text-white transition-colors"
          >
            <i class="fas fa-user"></i>
            <span>{{$ctrl.user.name}}</span>
          </a>
          <button
            ng-click="$ctrl.logout()"
            class="hover:text-white transition-colors"
          >
            <i class="fas fa-sign-out-alt"></i>
          </button>
        </div>
      </div>
    </div>
  `,
  controller: class SidebarController {
    private user: any;
    private navItems: any[];

    constructor(private authService, private $state) {
      'ngInject';
      this.user = null;
      this.navItems = [
        { state: 'home', label: 'Home', icon: 'fa-home' },
        { state: 'search', label: 'Search', icon: 'fa-search' },
        { state: 'library', label: 'Your Library', icon: 'fa-book' },
        { state: 'playlist.create', label: 'Create Playlist', icon: 'fa-plus-square' }
      ];
    }

    $onInit() {
      this.user = this.authService.getUser();
    }

    logout() {
      this.authService.logout();
      this.$state.go('login');
    }
  }
};