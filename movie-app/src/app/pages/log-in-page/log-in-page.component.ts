import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-log-in-page',
  templateUrl: './log-in-page.component.html',
  styleUrls: ['./log-in-page.component.css'],
})
export class LogInPageComponent {
  username: string = '';
  password: string = '';
  usernameValid: boolean = true;
  passwordValid: boolean = true;
  requestResponse: string | undefined;

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  public onLogin(): void {
    this.resetValidation();
    this.validateForm();

    if (!this.usernameValid || !this.passwordValid) {
      console.error('Invalid form. Please check the fields.');
      return;
    }

    this.authService.login(this.username, this.password).subscribe({
      next: (user: User) => {
        this.router.navigate(['/home']);
        this.toastr.success('Login successful', 'Success');
      },
      error: (error: HttpErrorResponse) => {
        console.error('Login failed:', error);
        this.requestResponse = 'Login failed';
        this.toastr.error(this.requestResponse, 'Error');
      },
    });
  }

  private resetValidation(): void {
    this.usernameValid = true;
    this.passwordValid = true;
  }

  private validateForm(): void {
    if (!this.username) {
      this.usernameValid = false;
    }

    if (!this.password) {
      this.passwordValid = false;
    }
  }
}
