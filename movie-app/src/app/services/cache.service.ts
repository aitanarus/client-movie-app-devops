import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  private cache: { [key: string]: any } = {};

  constructor(private http: HttpClient) {}

  public get<T>(key: string, url: string): Observable<T> {
    if (this.cache[key]) {
      return of(this.cache[key] as T);
    } else {
      return this.http.get<T>(url);
    }
  }

  public set(key: string, value: any): void {
    // Set data in cache
    this.cache[key] = value;
  }

  public clear(key: string): void {
    // Clear specific key from cache
    delete this.cache[key];
  }

  public clearAll(): void {
    // Clear entire cache
    this.cache = {};
  }
}
