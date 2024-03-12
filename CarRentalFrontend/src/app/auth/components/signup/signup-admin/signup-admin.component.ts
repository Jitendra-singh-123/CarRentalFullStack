import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/Services/auth/auth.service';

@Component({
  selector: 'app-signup-admin',
  templateUrl: './signup-admin.component.html',
  styleUrl: './signup-admin.component.css'
})
export class SignupAdminComponent {
  adminForm: FormGroup;
  registrationError: string;
  constructor(private fb: FormBuilder, public authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {

    this.adminForm = this.fb.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required, Validators.minLength(6)]],
      RePassword: ['', [Validators.required, Validators.minLength(6)]],
      Address: ['', Validators.required],
      Role: [''],
      Gender: ['', Validators.required]
    },
      {
        validators: this.passwordMatchValidator
      }
    );
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('Password');
    const confirmPassword = control.get('RePassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ 'passwordMismatch': true });
      return { 'passwordMismatch': true };
    } else {
      confirmPassword.setErrors(null);
      return null;
    }
  }





  register() {
    debugger;
    if (this.adminForm.valid) {
      const formData = this.adminForm.value;
      formData.Role = 'Admin';
      this.authService.registerAdmin(formData).subscribe(
        (response) => {
          alert("Registered successfully");
          this.adminForm.reset();
          this.router.navigateByUrl("/login");
        },
        (error: HttpErrorResponse) => {
          if (error.status === 409) {
            if (error.error === "Email Already Registered.") {
              alert("You are already registered.");
            }
            else {
              alert("An error occurred during registration.");
              console.log(error);
            }
          } else {
            alert("An error occurred during registration.");
            console.log(error);
          }
        }
      );
    } else {
      alert("Invalid form");
    }
  }
}
