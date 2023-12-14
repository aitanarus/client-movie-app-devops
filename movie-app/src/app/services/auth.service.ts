import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  catchError,
  map,
  throwError,
} from 'rxjs';
import { User } from '../models/user';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';

  private isUserLoggedIn: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  private loggedInUser: BehaviorSubject<User | undefined> = new BehaviorSubject<
    User | undefined
  >(undefined);

  isLoggedIn$: Observable<boolean> = this.isUserLoggedIn.asObservable();
  loggedInUser$: Observable<User | undefined> =
    this.loggedInUser.asObservable();

  constructor(private http: HttpClient) {}

  public login(username: string, password: string): Observable<any> {
    const loginData = { username, password };
    return this.http.post(`${this.apiUrl}/login`, loginData).pipe(
      map((response: any) => {
        const user: User = 
        {
          UserId :response.userId,
          Username:response.username,
          Password:response.password,
          Email:response.email
        };
        this.isUserLoggedIn.next(true);
        this.loggedInUser.next(user);
        return user;
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Login failed:', error);
        return throwError(() => error);
      })
    );
  }

  public logout(): void {
    this.isUserLoggedIn.next(false);
    this.loggedInUser.next(undefined);
  }
}
