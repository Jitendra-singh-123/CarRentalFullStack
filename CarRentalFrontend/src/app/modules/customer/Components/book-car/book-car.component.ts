import { Component } from '@angular/core';
import { CustomerService } from '../../Services/customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Form, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { StorageService } from '../../../../auth/Services/storage/storage.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-book-car',
  templateUrl: './book-car.component.html',
  styleUrl: './book-car.component.css'
})
export class BookCarComponent {

  carId: number = this.activatedRoute.snapshot.params["id"];
  car: any;
  processedImage: any;
  totalPayment: number = 0;
  numberOfDays: number = 0;
  dateFormat: "DD-MM-YYYY";
  ValidateForm!: FormGroup;
  paymentId = 0;
  feedbacks: any;
  //reservationStatus="Waiting";
  constructor(private service: CustomerService, private activatedRoute: ActivatedRoute, private fb: FormBuilder, private router: Router) {

  }

  ngOnInit() {
    this.ValidateForm = this.fb.group({
      PickupDateTime: ['', Validators.required],
      DropoffDateTime: ['', Validators.required],
      NumberOfDays: [0],
    }, { validator: this.dateRangeValidator });
    this.getCarById();
    this.getCarFeedbacks();

  }
  getCarById() {
    debugger;
    this.service.getCarById(this.carId).subscribe((res: any) => {
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
    });
  }

  dateRangeValidator: ValidatorFn = (control: FormGroup): { [key: string]: any } | null => {
    const PickupDateTime = control.get('PickupDateTime');
    const DropoffDateTime = control.get('DropoffDateTime');

    if (PickupDateTime.value && DropoffDateTime.value) {
      const fromDate = new Date(PickupDateTime.value);
      const toDate = new Date(DropoffDateTime.value);
      const availableFromDate = new Date(this.car.AvailableFrom);
      const availableToDate = new Date(this.car.AvailableTo);

      if (fromDate > toDate) {
        return { 'dateRangeError': true };
      }

      if (fromDate < availableFromDate || toDate > availableToDate) {
        return { 'bookDateRangeError': true };
      }

      this.calculateTotalPayment(fromDate, toDate);
    }

    return null;
  };

  calculateTotalPayment(fromDate: Date, toDate: Date) {
    const timeDifference = toDate.getTime() - fromDate.getTime();
    const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
    this.totalPayment = this.car.DailyRate * daysDifference;
    this.numberOfDays = daysDifference;
  }


  bookCar(data: any) {
    debugger;
    console.log(data);

    if (this.ValidateForm.valid) {
      if (this.car && this.car.Status === 'Not Available') {
        alert("Sorry!!, Car is not currently available");
        return;
      }


      let bookCarData = {
        CustomerID: Number(StorageService.getUserId()),
        CarID: Number(this.carId),
        PickupDateTime: data.PickupDateTime,
        DropoffDateTime: data.DropoffDateTime,
        //  PaidAmount: Number(this.totalPayment),
        NumberOfDays: Number(this.numberOfDays),
        // ReservationStatus:this.reservationStatus
      };

      // console.log(bookCarData.PaidAmount);
      this.service.bookCar(bookCarData).subscribe((res) => {
        console.log(res);
        alert("Car booked Successfully");
        this.router.navigateByUrl("/customer/profile/bookings");
      }, (error: HttpErrorResponse) => {
        if (error.error === "The car is already booked by someone")
          alert("Sorry!! Car is already booked");
        else {
          alert("Error Occured while Booking: " + error);
        }
        console.log(error);
      })
    }

  }


  getCarFeedbacks() {
    debugger;
    this.service.getCarFeedbacks(this.carId).subscribe((res) => {
      console.log(res);
      this.feedbacks = res;
    }, (error: HttpErrorResponse) => {
      if (error.error === "No reviews available for this car")
        alert("No Reviews");
      else {
        alert("Error Occured Showing Reviews " + error);
      }
      console.log(error);
    })
  }
}


