import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/auth/Services/storage/storage.service';
import { AdminService } from '../../../Services/admin.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
  admin: any;
  enteredPassword: string = '';
  confirmPassword: string = '';
  constructor(private service: AdminService, private router: Router) {
    this.getProfileByAdminId();
  }
  
  confirmDelete() {
    debugger;
    if (this.enteredPassword.trim() === '') {
      alert('Please enter your password.');
      return;
    }
    
    if (this.enteredPassword === this.confirmPassword) {
      this.service.deleteProfileByUserId(this.admin).subscribe(
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

  getProfileByAdminId() {
    debugger;
    this.service.getProfileByAdminId().subscribe((res) => {
      this.admin = res;
      console.log(this.admin);
      this.confirmPassword = this.admin.Password;
    }, err => {
      alert("Error: " + err);
      console.log(err);
    });
  }



  cancelDelete() {
    this.router.navigateByUrl('/admin/profile/showProfile');
  }


}
