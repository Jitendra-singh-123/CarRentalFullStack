import { Component } from '@angular/core';

import { AbstractControl, FormBuilder, FormGroup, MaxLengthValidator, NgForm, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../../Services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  customerForm: FormGroup;
  registrationError: string;
  constructor(private fb: FormBuilder, public authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {

    this.customerForm = this.fb.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      EmailAddress: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required, Validators.minLength(6)]],
      RePassword: ['', [Validators.required, Validators.minLength(6)]],
      PhoneNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(15)]],
      Address: ['', Validators.required],
      LicenseNumber: ['', Validators.required],
      Role: [''] ,
      Gender:['',Validators.required]
    },
      {
        validators: this.passwordMatchValidator 
      }
    );
  }

  roleCheckValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const role = control.value;
      if (role && role.toLowerCase() !== 'customer') {
        return { 'invalidRole': true };
      }
      return null;
    };
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
    if (this.customerForm.valid) {
      const formData = this.customerForm.value;
      formData.Role = 'Customer';
      this.authService.register(formData).subscribe(
        (response) => {
          alert("Registered successfully");
          this.customerForm.reset();
          this.router.navigateByUrl("/login");
        },
        (error: HttpErrorResponse) => {
          if (error.status === 409) {
            if (error.error === "Customer with the same CustomerId already exists." || error.error === "Email Already Registered.") {
              alert("You are already registered.");
            } else if (error.error === "License Number already exists.") {
              alert("The entered license number already exists.");
            } else {
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
