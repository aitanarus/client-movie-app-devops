import { ReviewService } from 'src/app/services/review.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { Profile } from 'src/app/models/profile';
import { User } from 'src/app/models/user';
import { ProfileService } from 'src/app/services/profile.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';
import { Review } from 'src/app/models/review';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
})
export class ProfilePageComponent {
  public emailValid: boolean = true;
  public usernameValid: boolean = true;
  public passwordValid: boolean = true;

  user: User | undefined;
  profile: Profile | undefined;
  requestResponse: string | undefined;

  constructor(
    private profileService: ProfileService,
    private userService: UserService,
    private reviewService: ReviewService,
    private authService: AuthService,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private router: Router
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

  public updateUser(): void {
    this.resetValidation();
    this.validateForm();

    if (this.user) {
      this.userService.updateUser(this.user).subscribe(
        (updatedUser) => {
          console.log('User updated successfully:', updatedUser);
          this.user = updatedUser;
          this.requestResponse = 'User updated successfully';
          this.toastr.success(this.requestResponse, 'Success');
        },
        (error) => {
          console.error('Error updating user:', error);
          this.requestResponse = 'Error updating user';
          this.toastr.error(this.requestResponse, 'Error');
        }
      );
    }

    if (this.user) {
      this.userService.updateUser(this.user).subscribe(
        (updatedUser) => {
          console.log('Profile updated successfully:', updatedUser);
          this.user = updatedUser;
          this.requestResponse = 'Profile updated successfully';
          this.toastr.success(this.requestResponse, 'Success');
        },
        (error) => {
          console.error('Error updating profile:', error);
          this.requestResponse = 'Error updating profile';
          this.toastr.error(this.requestResponse, 'Error');
        }
      );
    }
  }

  public deleteUser(): void {
    this.userService.deleteUser(this.user!.UserId).subscribe(
      () => {
        console.log('User deleted successfully');
        this.authService.logout();
        this.requestResponse = 'User deleted successfully';
        this.toastr.success(this.requestResponse, 'Success');
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error('Error deleting user:', error);
        this.requestResponse = 'Error deleting profile';
        this.toastr.error(this.requestResponse, 'Error');
      }
    );
  }

  public onFileSelected(event: any) {
    const file = event.target.files[0];
    if (this.profile) {
      this.profile.Picture = file;
    }
  }

  public openConfirmationModal(content: any): void {
    this.modalService.open(content, { centered: true });
  }

  private resetValidation(): void {
    this.emailValid = true;
    this.usernameValid = true;
    this.passwordValid = true;
  }

  private validateForm(): void {
    const passwordRegex: RegExp =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (this.user) {
      if (!this.user.Email) {
        this.emailValid = false;
      }

      if (!this.user.Username) {
        this.usernameValid = false;
      }

      if (!this.user.Password || !passwordRegex.test(this.user.Password)) {
        this.passwordValid = false;
      }
    }
  }

  public deleteReview(review: Review): void {
    this.reviewService.deleteReview(review.ReviewId).subscribe(
      () => {
        console.log('Review deleted successfully');
        this.requestResponse = 'Review deleted successfully';
        this.toastr.success(this.requestResponse, 'Success');
        this.ngOnInit();
      },
      (error) => {
        console.error('Error deleting review:', error);
      }
    );
  }
}
