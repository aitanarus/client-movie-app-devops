import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { Profile } from 'src/app/models/profile';
import { User } from 'src/app/models/user';
import { ProfileService } from 'src/app/services/profile.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

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
    private authService: AuthService,
    private toastr: ToastrService,
    private modalService: NgbModal
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

  public updateUserProfile(): void {
    this.resetValidation();
    this.validateForm();

    if (this.profile) {
      this.profileService.updateProfile(this.profile).subscribe(
        (updatedProfile) => {
          console.log('Profile updated successfully:', updatedProfile);
          this.profile = updatedProfile;
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

  public deleteUserProfile(): void {
    this.profileService.deleteProfile(this.profile?.ProfileId).subscribe(
      () => {
        console.log('Profile deleted successfully');
        this.profile = undefined;
        this.requestResponse = 'Profile deleted successfully';
        this.toastr.success(this.requestResponse, 'Success');
      },
      (error) => {
        console.error('Error deleting profile:', error);
        this.requestResponse = 'Error deleting profile';
        this.toastr.error(this.requestResponse, 'Error');
      }
    );

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
}
