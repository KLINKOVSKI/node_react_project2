export class AdminController {
  private users: any[] = [];
  private stats = {
    totalUsers: 0,
    totalPlaylists: 0,
    totalTracks: 0
  };

  constructor(
    private authService,
    private databaseService,
    private $state,
    private $scope
  ) {
    'ngInject';
  }

  async $onInit() {
    const currentUser = this.authService.getUser();
    if (!currentUser?.isAdmin) {
      this.$state.go('home');
      return;
    }

    await this.loadUsers();
    await this.loadStats();
  }

  async loadUsers() {
    this.users = await this.databaseService.users.toArray();
  }

  async loadStats() {
    this.stats.totalUsers = await this.databaseService.users.count();
    this.stats.totalPlaylists = await this.databaseService.playlists.count();
    this.stats.totalTracks = await this.databaseService.tracks.count();
  }

  async toggleAdmin(user: any) {
    if (user.id === this.authService.getUser().id) {
      return; // Prevent self-demotion
    }

    await this.databaseService.users.update(user.id, {
      isAdmin: !user.isAdmin
    });
    await this.loadUsers();
  }

  async deleteUser(user: any) {
    if (user.id === this.authService.getUser().id) {
      return; // Prevent self-deletion
    }

    if (confirm('Are you sure you want to delete this user?')) {
      await this.databaseService.users.delete(user.id);
      // Also delete user's playlists
      const userPlaylists = await this.databaseService.playlists
        .where('userId')
        .equals(user.id)
        .toArray();
      
      for (const playlist of userPlaylists) {
        await this.databaseService.playlistTracks
          .where('playlistId')
          .equals(playlist.id)
          .delete();
        await this.databaseService.playlists.delete(playlist.id);
      }

      await this.loadUsers();
      await this.loadStats();
    }
  }
}