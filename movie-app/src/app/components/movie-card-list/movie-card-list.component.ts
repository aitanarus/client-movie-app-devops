import { Router, RouterModule } from '@angular/router';
import { Component, Input } from '@angular/core';
import { MovieDetails } from 'src/app/models/movieDetails';

@Component({
  selector: 'app-movie-card-list',
  templateUrl: './movie-card-list.component.html',
  styleUrls: ['./movie-card-list.component.css']
})
export class MovieCardListComponent {
  title = 'movie-app';
  searchQuery: string = '';
  errorTag: string = ""

  @Input() movies: MovieDetails[] = [];
  
  constructor(private router: Router) {}

  viewDetails(movieId: string) {
    this.router.navigate(['/movie', movieId]);
  }
  
}
