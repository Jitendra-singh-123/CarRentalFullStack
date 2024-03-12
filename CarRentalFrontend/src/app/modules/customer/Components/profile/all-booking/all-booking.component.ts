import { Component } from '@angular/core';
import { CustomerService } from '../../../Services/customer.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-all-booking',
  templateUrl: './all-booking.component.html',
  styleUrl: './all-booking.component.css'
})
export class AllBookingComponent {
  bookings: any;

  constructor(private service: CustomerService, private router: Router) {
    this.getMyBookings();
  }

  getMyBookings() {
    debugger;
    this.service.getBookingsByUserId().subscribe(
      (res) => {
        this.bookings = res;
        console.log(this.bookings);

      }, (error: HttpErrorResponse) => {
        if (error.status === 404) {
          alert("You have not any reservation");
        } else {
          alert("An error occurred during registration.");
        }
      });

  }

}
