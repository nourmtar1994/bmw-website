import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserapiService } from '../../services/userapi.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError: boolean = false;
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private userApi: UserapiService,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email 
      ]],
      password: ['', [
        Validators.required
      ]]
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit(): void {
    this.loginError = false;
    this.errorMessage = '';
    
    if (this.loginForm.valid) {
      this.isLoading = true;
      
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;
      
      // Call the login API
      this.userApi.login(email, password).subscribe({
        // Success callback
        next: (user) => {
          this.isLoading = false;
          
          if (user) {
            // Login successful - save user to auth service
            this.authService.login(user);
            
            // Navigate to home page
            this.router.navigate(['/home']);
          } else {
            // Login failed - show error
            this.loginError = true;
            this.errorMessage = 'Email ou mot de passe incorrect';
          }
        },
        // Error callback
        error: (error) => {
          this.isLoading = false;
          this.loginError = true;
          this.errorMessage = 'Une erreur est survenue. Veuillez réessayer.';
          console.error('Login error:', error);
        }
      });
    } else {
      // Form is invalid - mark all fields as touched to show errors
      this.loginForm.markAllAsTouched();
    }
  }
}
