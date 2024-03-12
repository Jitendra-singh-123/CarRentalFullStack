import { Component } from '@angular/core';
import { AdminService } from '../../Services/admin.service';

@Component({
  selector: 'app-get-customer-bookings',
  templateUrl: './get-customer-bookings.component.html',
  styleUrl: './get-customer-bookings.component.css'
})
export class GetCustomerBookingsComponent {


  bookings: any;

 
  constructor(private adminService:AdminService) {  
  }
  ngOnInit(){
    this.getBookings();
  }
  getBookings(){
    debugger;
    this.adminService.getAllBookings().subscribe((res)=>{
      console.log(res);
      this.bookings = res;

    },error=>{
      console.log(error);
    })
  }

  rejectReservation(bookingId:any) {
    debugger;
    this.adminService.deleteReservation(bookingId).subscribe((res) => {
      this.bookings = this.bookings.filter(booking => booking.ReservationID !== bookingId);
      alert("Reservation Rejected and Deleted Successfully");
    },error=>{
      alert("Error!!"+error);
    })
  }
  
  acceptReservation(bookingObj:any):any {
    debugger;
    bookingObj.ReservationStatus="Accepted";
    console.log(bookingObj.CustomerID);
    this.adminService.updateReservationStatus(bookingObj).subscribe(
      (res) => {
        alert('Reservation Accpeted');
       // this.router.navigateByUrl('/admin/dashboard');
        console.log(res);
      },
      (error) => {
        alert("Error While updating Car" + error);
      }
  
    );
    
    return true;
  }
  
  
}
