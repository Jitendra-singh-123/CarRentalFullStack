import { Component } from '@angular/core';
import { AdminService } from '../../Services/admin.service';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/auth/Services/storage/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  admin: any = {};
  constructor(private service:AdminService,private router: Router) {
    this.getProfile();

  }

  getProfile() {

    this.service.getProfileByAdminId().subscribe((res)=>{
      this.admin = res; 
        console.log(this.admin);
    },err=>{
      alert("Error: " + err);
      console.log(err);
    });
  }

  logout(){
    StorageService.logout();
    this.router.navigateByUrl("/login");
  }
}
