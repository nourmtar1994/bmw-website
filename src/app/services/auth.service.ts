import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Users } from '../models/users.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  /**
   * BehaviorSubject to track the current user
   * BehaviorSubject is like a variable that components can "subscribe" to.
   * When it changes, all subscribed components are automatically notified.
   * 
   * We initialize it with the user from localStorage (if any)
   */
  private currentUserSubject: BehaviorSubject<Users | null>;
  
  /**
   * Observable that components can subscribe to for user changes
   */
  public currentUser: Observable<Users | null>;

  constructor() {
    // Try to get the user from localStorage when the service is created
    const storedUser = localStorage.getItem('currentUser');
    const user = storedUser ? JSON.parse(storedUser) : null;
    
    // Initialize the BehaviorSubject with the stored user (or null)
    this.currentUserSubject = new BehaviorSubject<Users | null>(user);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): Users | null {
    return this.currentUserSubject.value;
  }

 
  login(user: Users): void {
    // Store user in localStorage (so they stay logged in after refresh)
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    // Update the BehaviorSubject (this notifies all subscribers)
    this.currentUserSubject.next(user);
  }

 
  logout(): void {
    // Remove user from localStorage
    localStorage.removeItem('currentUser');
    
    // Update the BehaviorSubject to null (this notifies all subscribers)
    this.currentUserSubject.next(null);
  }

 
  isLoggedIn(): boolean {
    return this.currentUserValue !== null;
  }

 
  getCurrentUserEmail(): string {
    return this.currentUserValue?.email || '';
  }


  getCurrentUserName(): string {
    return this.currentUserValue?.fullname || '';
  }
}
