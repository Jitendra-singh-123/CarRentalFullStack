import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  readonly ApiUrlCust = "https://localhost:44331/api/Customers";
  readonly ApiUrlAdmin="https://localhost:44331/api/Admins";
  readonly ApiUrlUser="https://localhost:44331/api/Logins";
  constructor(private http:HttpClient) {
  }

  register(signupRequest):any{
    return this.http.post(this.ApiUrlCust,signupRequest);
  }

  registerAdmin(signupRequest):any{
    return this.http.post(this.ApiUrlAdmin,signupRequest);

  }
  login(loginRequest:any):Observable<any>{
    return this.http.post(this.ApiUrlUser,loginRequest);
  }
}
