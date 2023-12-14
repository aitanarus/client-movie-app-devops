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
import { CacheService } from 'src/app/services/cache.service';

@Component({
  selector: 'app-movie-details-page',
  templateUrl: './movie-details-page.component.html',
  styleUrls: ['./movie-details-page.component.css'],
})
export class MovieDetailsPageComponent {
  private movieId?: string;
  public movie?: MovieDetails;
  public title: string = '';
  public rating: number = 0;
  public isReadOnly: boolean = false;
  public reviewText: string = '';

  @ViewChild(ModalPopupComponent) modalPopup!: ModalPopupComponent;

  user: User | undefined;
  profile: Profile | undefined;
  requestResponse: string | undefined;

  constructor(
    private profileService: ProfileService,
    private authService: AuthService,
    private movieService: MovieService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private reviewService: ReviewService,
    private cacheService: CacheService
  ) {}

  public ngOnInit(): void {
    this.getLoggedInUser();
    this.getProfile();
    this.route.params.subscribe((params) => {
      this.movieId = params['id'];
    });

    if (this.movieId) {

      this.cacheService.set('lastVisitedMovieDetailsId', this.movieId);

      this.movieService.getMovieDetails(this.movieId).subscribe(
        (data: any) => {
          this.movie = data[0] as MovieDetails;
          console.error(this.movie.Ratings);
        },
        (error) => {}
      );

      this.reviewService.getReviewsByMovieId(this.movieId).subscribe(
        (data: any) => {
          this.movie!.Reviews = [...data];
        },
        (error) => {}
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
        this.profile = profile;
      },
      (error) => {
        console.error('Error retrieving profile:', error);
        this.requestResponse = error;
      }
    );
  }

  public onRateChange(newRating: number) {
    if (this.rating === undefined) {
      this.rating = 0;
    } else {
      this.rating = newRating;
    }
  }

  public openModal(): void {
    this.modalPopup.open(this.movieId);
  }

  public createReview(): void {
    if (this.movie) {
      const review: Review = {
        ReviewId: '',
        ReviewTitle: this.title,
        Rating: this.rating,
        ReviewText: this.reviewText,
        ImdbID: this.movieId?.toString()!,
        MovieTitle: this.movie?.Title,
        PublishedOn: new Date(),
        RProfileId: this.profile?.ProfileId!,
        Author: this.user?.Username!,

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
}
