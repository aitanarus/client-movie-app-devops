import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profile } from '../models/profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = 'your_backend_api_url';

  constructor(private http: HttpClient) {}

  getProfile(): Observable<Profile> {
    return this.http.get<Profile>(`${this.apiUrl}/profile`);
  }

  updateProfile(profile: Profile): Observable<Profile> {
    return this.http.post<Profile>(`${this.apiUrl}/profile/update`, profile);
  }

  deleteProfile(): Observable<any> {
    return this.http.delete(`${this.apiUrl}/profile/delete`);
  }
}
