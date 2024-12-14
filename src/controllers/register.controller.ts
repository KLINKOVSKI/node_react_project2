export class RegisterController {
  private email: string = '';
  private password: string = '';
  private name: string = '';
  private error: string = '';

  constructor(private authService, private $state) {
    'ngInject';
  }

  async register() {
    try {
      await this.authService.register(this.email, this.password, this.name);
      this.$state.go('home');
    } catch (err) {
      this.error = 'Registration failed. Email might already be in use.';
    }
  }
}