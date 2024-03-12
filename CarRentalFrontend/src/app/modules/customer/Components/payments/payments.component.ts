import { Component } from '@angular/core';
import { CustomerService } from '../../Services/customer.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.css'
})
export class PaymentsComponent {
  processedImage: any;
  //carId: number = this.activateRoute.snapshot.params["carId"];
  car: any;
  bookings: any;
  reservation: any;
  totalPrice:any;
  paymentMethod: string = ''; 
  accountDetails: string = '';
  constructor(private service: CustomerService, private router: Router, private activateRoute: ActivatedRoute) {
    this.reservation = this.router.getCurrentNavigation().extras.state['reservation'];
    console.log(this.reservation); 
    this.getCarById(this.reservation.CarID);
}

 
getCarById(carId) {
  debugger;
  this.service.getCarById(carId).subscribe((res: any) => {
    console.log(res);
    if (res.ImageUrl && res.ImageUrl.startsWith('https')) {
      // If image is an HTTPS link and ImageUrl exists, set the processed image URL directly
      this.processedImage = res.ImageUrl; // Update this line
    } else {
      // If image is not an HTTPS link or ImageUrl is undefined, handle it accordingly
      // For now, assuming ImageUrl is always base64 data
      this.processedImage = 'data:image/jpeg;base64,' + res.ImageUrl;
    }
    this.car = res;
    this.totalPrice=this.reservation.NumberOfDays * this.car.DailyRate;
  });
}

payNow(){
  debugger;
let paymentObj ={
  CustomerID : this.reservation.CustomerID,
  CarID : this.reservation.CarID,
  PaymentMethod:this.paymentMethod,
  AccountDetails:this.accountDetails,
  Amount:this.totalPrice,
  TransactionStatus: "Success",
  TransactionDate: new Date() 
}
this.service.payment(paymentObj).subscribe((res)=>{
  console.log(paymentObj);
  this.router.navigateByUrl("/customer/myBookings");
}
,err=>{
  console.log(err);
})
}

}
