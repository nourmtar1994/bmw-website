import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserapiService } from '../../services/userapi.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  
  registerForm: FormGroup;
  showMessage: boolean = false;
  messageType: 'success' | 'error' = 'success';
  message: string = '';
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private userApi: UserapiService,
    private router: Router
  ) {
    // Initialize the registration form with validation rules
    this.registerForm = this.fb.group({
      // Firstname: required, min 5 chars, must have 1 uppercase and lowercase letters
      firstname: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z]+$/) // At least 1 uppercase, 1 lowercase, only letters
      ]],
      // Lastname: required, min 5 chars, must have 1 uppercase and lowercase letters
      lastname: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z]+$/)
      ]],
      // Email: required and must match email pattern
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      // Password: required, min 8 chars, must have number, uppercase, lowercase, special char
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        // This regex ensures: at least 1 digit, 1 lowercase, 1 uppercase, 1 special char
        Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      ]]
    });
  }

  /**
   * Getter methods for easier access to form controls in template
   */
  get firstname() {
    return this.registerForm.get('firstname');
  }

  get lastname() {
    return this.registerForm.get('lastname');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  /**
   * Handle form submission
   */
  onSubmit(): void {
    // Reset message state
    this.showMessage = false;
    
    // Check if form is valid
    if (this.registerForm.valid) {
      this.isLoading = true;
      
      // Get form values
      const formData = this.registerForm.value;
      
      // Check if email already exists
      this.userApi.emailExists(formData.email).subscribe({
        next: (exists) => {
          if (exists) {
            // Email already registered
            this.isLoading = false;
            this.showMessage = true;
            this.messageType = 'error';
            this.message = 'Cet email est déjà utilisé';
          } else {
            // Email is available, proceed with registration
            const newUser = {
              fullname: `${formData.firstname} ${formData.lastname}`,
              email: formData.email,
              password: formData.password,
              profile: 'customer' // Default profile
            };
            
            // Register the user
            this.userApi.registerUser(newUser).subscribe({
              next: (user) => {
                this.isLoading = false;
                this.showMessage = true;
                this.messageType = 'success';
                this.message = 'Inscription réussie ! Redirection vers la page de connexion...';
                
                // Redirect to login page after 2 seconds
                setTimeout(() => {
                  this.router.navigate(['/login']);
                }, 2000);
              },
              error: (error) => {
                this.isLoading = false;
                this.showMessage = true;
                this.messageType = 'error';
                this.message = 'Une erreur est survenue. Veuillez réessayer.';
                console.error('Registration error:', error);
              }
            });
          }
        },
        error: (error) => {
          this.isLoading = false;
          this.showMessage = true;
          this.messageType = 'error';
          this.message = 'Une erreur est survenue. Veuillez réessayer.';
          console.error('Email check error:', error);
        }
      });
    } else {
      // Form is invalid - mark all fields as touched to show errors
      this.registerForm.markAllAsTouched();
    }
  }
}
