import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalPopupComponent } from 'src/app/components/modal-popup/modal-popup.component';
import { MovieDetails } from 'src/app/models/movieDetails';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie-details-page',
  templateUrl: './movie-details-page.component.html',
  styleUrls: ['./movie-details-page.component.css']
})
export class MovieDetailsPageComponent {
  private movieId?: string;
  public movie?: MovieDetails;
  @ViewChild('popupModal') popupModal!: ModalPopupComponent;
  
  constructor(private movieService: MovieService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Use the ActivatedRoute service to extract the movie ID from the route parameters
    this.route.params.subscribe(params => {
      this.movieId = params['id'];
    });

    if (this.movieId) {
      this.movieService.getMovieDetails(this.movieId).subscribe(
        (data: any) => {
          this.movie = data[0] as MovieDetails;
          console.error(this.movie.Ratings)
        },
        (error) => {
        }
      );
    }
  }
}
