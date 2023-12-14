import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalPopupComponent } from 'src/app/components/modal-popup/modal-popup.component';
import { MovieDetails } from 'src/app/models/movieDetails';
import { MovieService } from 'src/app/services/movie.service';
import { ProfileService } from 'src/app/services/profile.service';
import { ToastrService } from 'ngx-toastr';
import { ReviewService } from 'src/app/services/review.service';
import { AuthService } from './../../services/auth.service';
import { Review } from 'src/app/models/review';
import { User } from 'src/app/models/user';
import { Profile } from 'src/app/models/profile';

@Component({
  selector: 'app-movie-details-page',
  templateUrl: './movie-details-page.component.html',
  styleUrls: ['./movie-details-page.component.css']
})
export class MovieDetailsPageComponent {
  private movieId?: string;
  public movie?: MovieDetails;
  title: string = '';
  rating: number = 0;
  reviewText: string = '';
  @ViewChild('popupModal') popupModal!: ModalPopupComponent;

  user: User | undefined;
  profile: Profile | undefined;
  requestResponse: string | undefined;
  
  constructor(
    private profileService: ProfileService,
    private authService: AuthService,
    private movieService: MovieService, 
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private reviewService: ReviewService
    ) { }

  ngOnInit(): void {
    this.getLoggedInUser();
    this.getProfile();
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

  public getLoggedInUser(): void {
    this.authService.loggedInUser$.subscribe((user) => {
      this.user = user;
    });
  }

  public getProfile(): void {
    this.profileService.getProfile(this.user?.UserId).subscribe(
      (profile) => {
        console.log('Profile retrieved successfully:', profile);
        this.profile = profile;
      },
      (error) => {
        console.error('Error retrieving profile:', error);
        this.requestResponse = error;
      }
    );
  }
  onRatingChanged(newRating: number): void {
    // Log the new rating to check if this method is called
    console.log('New Rating:', newRating);

    // Assign the new rating to a component property if needed
    this.rating = newRating;
  }
  createReview(): void {
    const review: Review = {
      ReviewId:"",
      ReviewTitle: this.title,
      Rating: this.rating,
      ReviewText: this.reviewText,
      ImdbID: this.movieId?.toString()!,
      MovieTitle: "",
      PublishedOn: new Date(),
      RProfileId: this.profile?.ProfileId!,
      Author: this.user?.Username!

      // Include other properties as needed
    };

    this.reviewService.createReview(review).subscribe(
      (createdReview) => {
        console.log('Review created successfully:', createdReview);
        // Handle success, e.g., update UI or show a success message
        this.toastr.success('Review created successfully', 'Success');
      },
      (error) => {
        console.error('Error creating review:', error);
        // Handle error, e.g., show an error message
        this.toastr.error('Error creating review', 'Error');
      }
    );
  }
}
