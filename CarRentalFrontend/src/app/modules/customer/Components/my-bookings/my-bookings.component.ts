import { Component } from '@angular/core';
import { CustomerService } from '../../Services/customer.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.css']
})
export class MyBookingsComponent {



  bookings: any;
  numberOfDays: number = 0;
  toDate: any;
  fromDate: any;
  NumberOfDays: any = 0;
  constructor(private service: CustomerService, private router: Router,private activateRoute:ActivatedRoute) {
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

  deleteBooking(reservationId: any) {
    debugger;
    this.service.deleteReservation(reservationId).subscribe((res) => {
      this.bookings = this.bookings.filter(booking => booking.ReservationID !== reservationId);
      alert("Reservation Deleted Successfully");
    }, error => {
      alert("Error!!" + error);
    })
  }
  calculateNumberOfDays(reservation: any) {
    if (reservation.PickUpTime && reservation.DropOffTime) {
      const pickUpTime = new Date(reservation.PickUpTime);
      const dropOffTime = new Date(reservation.DropOffTime);
      const timeDifference = dropOffTime.getTime() - pickUpTime.getTime();
      const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
      reservation.NumberOfDays = daysDifference;
      this.numberOfDays=reservation.NumberOfDays;
      this.calculatePayment(reservation);
    }
  }

  calculatePayment(reservation: any) {
    reservation.totalPayment = reservation.NumberOfDays * reservation.DailyRate;
  }

  updateBooking(reservation: any) {
    debugger;
    // Check if the edited date falls within the range of available dates for the car
    if (reservation.PickUpTime <= this.bookings.AvailableFrom || reservation.DropOffTime >= reservation.AvailableTo) {
      alert("Edited date should be within the range of available dates for the car.");
      return;
    }

    // Check if the edited "From" date is not greater than the edited "To" date
    if (reservation.PickUpTime > reservation.DropOffTime) {
      alert("Edited 'From' date cannot be greater than edited 'To' date.");
      return;
    }
    // If the current status is "Accepted", change it to "Waiting"
    if (reservation.ReservationStatus === 'Accepted') {
      reservation.ReservationStatus = 'Waiting';
    }

    let bookCarData = {
      ReservationID:reservation.ReservationID,
      CustomerID: reservation.CustomerID,
      CarID: reservation.CarID,
      PickupDateTime: reservation.PickUpTime,
      DropoffDateTime: reservation.DropOffTime,
      ReservationTime:reservation.ReservationTime,
      NumberOfDays: this.numberOfDays,
      ReservationStatus: reservation.ReservationStatus,
     
    };

    // console.log(bookCarData.PaidAmount);
    this.service.updateReservation(reservation.ReservationID, bookCarData).subscribe((res) => {
      console.log(res);
      alert("Reservation updated Successfully");
      this.router.navigateByUrl("/customer/myBookings");
    }, (error: HttpErrorResponse) => {
      if (error.error === "The car is already booked by someone")
        alert("Sorry!! Car is already booked");
      else {
        alert("Error Occured while Booking: " + error);
      }
      console.log(error);
    })
  }

  navigate(reservation: any) {
    this.router.navigate(['/customer/payments'], { state: { reservation } });
}

}


