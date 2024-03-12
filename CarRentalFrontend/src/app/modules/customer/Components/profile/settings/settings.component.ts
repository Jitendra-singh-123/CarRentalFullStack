import { Component } from '@angular/core';
import { CustomerService } from '../../../Services/customer.service';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/auth/Services/storage/storage.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
  customer: any;
  enteredPassword: string = '';
  confirmPassword: string = '';
  constructor(private service: CustomerService, private router: Router) {
    this.getProfileByUserId();
  }
  
  confirmDelete() {
    debugger;
    if (this.enteredPassword.trim() === '') {
      alert('Please enter your password.');
      return;
    }
    
    if (this.enteredPassword === this.confirmPassword) {
      this.service.deleteProfileByUserId(this.customer).subscribe(
        (res) => {
          console.log(res);
          alert('Profile deleted successfully');
          this.router.navigateByUrl('/login');
        },
        (err) => {
          console.log('Error: ' + err);
          alert('Failed to delete profile. Please try again later.');
        }
      );
    } else {
      alert('Incorrect password. Please try again.');
    }
  }

  getProfileByUserId() {
    debugger;
    this.service.getProfileByUserId().subscribe((res) => {
      this.customer = res;
      console.log(this.customer);
      this.confirmPassword = this.customer.Password;
    }, err => {
      alert("Error: " + err);
      console.log(err);
    });
  }



  cancelDelete() {
    this.router.navigateByUrl('/customer/profile/updateProfile');
  }


}
