import { Component } from '@angular/core';
import { AdminService } from '../../../Services/admin.service';

@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrl: './list-customer.component.css'
})
export class ListCustomerComponent {

customers:any;
constructor(private service:AdminService) {
  this.getAllCustomer();
}

getAllCustomer(){
  this.service.getAllCustomer().subscribe((res)=>{
    console.log(res);
    this.customers=res;
  })
}

deleteCustomer(custId: any) {
this.service.deleteCustomer(custId).subscribe(res=>{
  console.log(res);
  this.customers = this.customers.filter((customer: any) => customer.CustomerId !== custId);
  alert("Customer Deleted Successfully");
})
}
}
