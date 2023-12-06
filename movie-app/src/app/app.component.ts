import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MovieDetails } from 'src/app/models/movieDetails';
import { MovieService } from 'src/app/services/movie.service';
import { User } from './models/user';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'movie-app';
  user: User | undefined;

  constructor(private authService: AuthService) {}

  public ngOnInit(): void {
    this.getLoggedInUser();
  }

  public getLoggedInUser(): void {
    this.authService.loggedInUser$.subscribe((user) => {
      this.user = user;
    });
  }
}
