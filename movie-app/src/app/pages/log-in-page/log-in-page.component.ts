import { Component } from '@angular/core';

@Component({
  selector: 'app-log-in-page',
  templateUrl: './log-in-page.component.html',
  styleUrls: ['./log-in-page.component.css']
})
export class LogInPageComponent {
  username: string = '';
  password: string = '';

  login() {
    // Implement your login logic here (e.g., call an authentication service)
    console.log('Login clicked with username:', this.username, 'and password:', this.password);
  }

}
