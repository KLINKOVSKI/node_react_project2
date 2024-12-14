import angular from 'angular';
import 'angular-route';
import 'angular-ui-router';
import 'angular-sanitize';
import './app.css';

// Services
import { AuthService } from './services/auth.service';
import { JamendoService } from './services/jamendo.service';
import { PlayerService } from './services/player.service';
import { DatabaseService } from './services/database.service';
import { PlaylistService } from './services/playlist.service';

// Components
import { AudioPlayerComponent } from './components/audio-player/audio-player.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

// Controllers
import { HomeController } from './controllers/home.controller';
import { LibraryController } from './controllers/library.controller';
import { LoginController } from './controllers/login.controller';
import { RegisterController } from './controllers/register.controller';
import { ProfileController } from './controllers/profile.controller';
import { AdminController } from './controllers/admin.controller';
import { PlaylistController } from './controllers/playlist.controller';

angular.module('musicApp', ['ui.router', 'ngSanitize'])
  .config(($stateProvider, $urlRouterProvider) => {
    'ngInject';
    
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: '/src/views/home.html',
        controller: 'HomeController',
        controllerAs: 'vm'
      })
      .state('library', {
        url: '/library',
        templateUrl: '/src/views/library.html',
        controller: 'LibraryController',
        controllerAs: 'vm'
      })
      .state('playlist', {
        url: '/playlist/:id',
        templateUrl: '/src/views/playlist.html',
        controller: 'PlaylistController',
        controllerAs: 'vm'
      })
      .state('login', {
        url: '/login',
        templateUrl: '/src/views/login.html',
        controller: 'LoginController',
        controllerAs: 'vm'
      })
      .state('register', {
        url: '/register',
        templateUrl: '/src/views/register.html',
        controller: 'RegisterController',
        controllerAs: 'vm'
      })
      .state('profile', {
        url: '/profile',
        templateUrl: '/src/views/profile.html',
        controller: 'ProfileController',
        controllerAs: 'vm'
      })
      .state('admin', {
        url: '/admin',
        templateUrl: '/src/views/admin.html',
        controller: 'AdminController',
        controllerAs: 'vm'
      });
  })
  .service('authService', AuthService)
  .service('jamendoService', JamendoService)
  .service('playerService', PlayerService)
  .service('databaseService', DatabaseService)
  .service('playlistService', PlaylistService)
  .component('audioPlayer', AudioPlayerComponent)
  .component('sidebar', SidebarComponent)
  .controller('HomeController', HomeController)
  .controller('LibraryController', LibraryController)
  .controller('LoginController', LoginController)
  .controller('RegisterController', RegisterController)
  .controller('ProfileController', ProfileController)
  .controller('AdminController', AdminController)
  .controller('PlaylistController', PlaylistController);