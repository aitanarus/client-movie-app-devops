import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { Profile } from 'src/app/models/profile';
import { User } from 'src/app/models/user';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
})
export class ProfilePageComponent {
  user: User | undefined;

  // profile: Profile = {  // change to | undifined
  //   ProfileId: '1',
  //   Picture: 'path/to/profile-picture.jpg',
  //   FavoriteMovies: ['tt1234567', 'tt9876543'],
  //   Reviews: [
  //     {
  //       ReviewId: 'r1',
  //       imdbID: 'tt1234567',
  //       AuthorName: 'John Doe',
  //       MovieTitle: 'Sample Movie 1',
  //       ReviewTitle: 'Great Movie!',
  //       Review: 'This movie was fantastic. I highly recommend it.',
  //       Rating: 4.5,
  //       PublishedOn: new Date(),
  //       ProfileId: '1',
  //     },
  //     // Add more reviews as needed
  //   ],
  //   UserId: 'user123',
  // };

  profile: Profile | undefined;
  requestResponse: string | undefined;

  constructor(
    private profileService: ProfileService,
    private authService: AuthService
  ) {}

  public ngOnInit(): void {
    this.getLoggedInUser();
    this.getProfile();
  }

  public getLoggedInUser(): void {
    this.authService.loggedInUser$.subscribe((user) => {
      this.user = user;
    });
  }

  public getProfile(): void {
    this.profileService.getProfile().subscribe(
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

  public updateProfile(): void {
    if (this.profile) {
      this.profileService.updateProfile(this.profile).subscribe(
        (updatedProfile) => {
          console.log('Profile updated successfully:', updatedProfile);
          this.profile = updatedProfile;
          this.requestResponse = 'Profile updated successfully';
        },
        (error) => {
          console.error('Error updating profile:', error);
          this.requestResponse = error;
        }
      );
    }
  }

  public deleteProfile(): void {
    this.profileService.deleteProfile().subscribe(
      () => {
        console.log('Profile deleted successfully');
        //this.profile = undefined;
        this.requestResponse = 'Profile deleted successfully';
      },
      (error) => {
        console.error('Error deleting profile:', error);
        this.requestResponse = error;
      }
    );
  }

  onFileSelected($event: Event) {
    throw new Error('Method not implemented.');
  }
}
