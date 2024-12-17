export class ProfileController {
  private user: any;
  private newPassword: string = '';
  private message: string = '';
  private messageType: 'success' | 'error' = 'success';

  constructor(private authService, private databaseService, private $state) {
    'ngInject';
  }

  $onInit() {
    this.user = { ...this.authService.getUser() };
    if (!this.user) {
      this.$state.go('login');
    }
  }

  async updateProfile() {
    try {
      const updates: any = {
        name: this.user.name,
        email: this.user.email
      };

      if (this.newPassword) {
        updates.password = this.newPassword;
      }

      await this.databaseService.users.update(this.user.id, updates);
      this.message = 'Profile updated successfully';
      this.messageType = 'success';
      
      // Update the stored user data
      const updatedUser = await this.databaseService.users.get(this.user.id);
      this.authService.updateUser(updatedUser);
    } catch (error) {
      this.message = 'Failed to update profile';
      this.messageType = 'error';
    }
  }
}