export class LoginController {
  private email: string = '';
  private password: string = '';
  private error: string = '';

  constructor(private authService, private $state) {
    'ngInject';
  }

  async login() {
    try {
      await this.authService.login(this.email, this.password);
      this.$state.go('home');
    } catch (err) {
      this.error = 'Invalid credentials';
    }
  }
}