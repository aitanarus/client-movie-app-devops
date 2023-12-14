import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MovieDetails } from 'src/app/models/movieDetails';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  searchQuery: string = '';
  movies: MovieDetails[] = [];
  popularMovies: MovieDetails[] = [];
  upcomingMovies: MovieDetails[] = [];
  errorTag: string = ""

  constructor(private movieService: MovieService, private router: Router) {}

  public ngOnInit(): void {
      this.movieService.getPopularMovies().subscribe(
        (data: any) => {
          this.popularMovies = data.slice(0, 6);
        },
        (error) => {
          console.error('Error:', error);
        }
      );

      this.movieService.getUpcomingMovies().subscribe(
        (data: any) => {
          this.upcomingMovies = data.slice(0, 6);
        },
        (error) => {
          console.error('Error:', error);
        }
      );
  }

  public searchMovies() {
    if (this.searchQuery) {
      this.movieService.searchMovies(this.searchQuery).subscribe(
        (data: any) => {
          this.movies = data;
        },
        (error) => {
          console.error('Error:', error);
        }
      );
    }
  }

  public viewDetails(movieId: string) {
    this.router.navigate(['/movie', movieId]);
  }
}
