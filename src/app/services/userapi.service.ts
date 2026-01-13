import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Users } from '../models/users.interface';


@Injectable({
  providedIn: 'root'
})
export class UserapiService {
  
  // Base URL for our JSON Server API
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(this.apiUrl);
  }

  getUserByEmail(email: string): Observable<Users | undefined> {
    // Query the API with email filter: http://localhost:3000/users?email=user@example.com
    return this.http.get<Users[]>(`${this.apiUrl}?email=${email}`).pipe(
      // The API returns an array, so we take the first element (or undefined if empty)
      map(users => users.length > 0 ? users[0] : undefined)
    );
  }

  registerUser(user: Users): Observable<Users> {
    // POST request to create a new user
    return this.http.post<Users>(this.apiUrl, user);
  }

  login(email: string, password: string): Observable<Users | null> {
    // Query for user with matching email and password
    return this.http.get<Users[]>(`${this.apiUrl}?email=${email}&password=${password}`).pipe(
      map(users => {
        // If we found a matching user, return it; otherwise return null
        if (users.length > 0) {
          return users[0];
        }
        return null;
      })
    );
  }

 
  emailExists(email: string): Observable<boolean> {
    return this.http.get<Users[]>(`${this.apiUrl}?email=${email}`).pipe(
      map(users => users.length > 0)
    );
  }
}
