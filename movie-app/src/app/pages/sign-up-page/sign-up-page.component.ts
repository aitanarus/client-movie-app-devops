import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.css'],
})
export class SignUpPageComponent {
  public email: string = '';
  public username: string = '';
  public password: string = '';
  public emailValid: boolean = true;
  public usernameValid: boolean = true;
  public passwordValid: boolean = true;
  private requestResponse: string | undefined;
  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  public onSignUp(): void {
    this.resetValidation();
    this.validateForm();

    if (!this.emailValid || !this.usernameValid || !this.passwordValid) {
      console.error('Invalid form. Please check the fields.');
      return;
    }

    this.userService
      .signup(this.email, this.username, this.password)
      .subscribe({
        next: (user: User) => {
          this.router.navigate(['/home']);
          this.requestResponse = 'Signup successful';
          this.toastr.success(this.requestResponse, 'Success');
        },
        error: (error: HttpErrorResponse) => {
          console.error('Signup failed:', error);
          this.requestResponse = 'Signup failed';
          this.toastr.error(this.requestResponse, 'Error');
        },
      });
  }

  private resetValidation(): void {
    this.emailValid = true;
    this.usernameValid = true;
    this.passwordValid = true;
  }

  private validateForm(): void {
    const passwordRegex: RegExp =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!this.email) {
      this.emailValid = false;
    }

    if (!this.username) {
      this.usernameValid = false;
    }

    if (!this.password || !passwordRegex.test(this.password)) {
      this.passwordValid = false;
    }
  }
}
