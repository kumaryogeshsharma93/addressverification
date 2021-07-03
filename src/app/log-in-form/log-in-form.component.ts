import { Component, OnInit } from '@angular/core';
import {AddressVerificationServiceService} from '../address-verification-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-log-in-form',
  templateUrl: './log-in-form.component.html',
  styleUrls: ['./log-in-form.component.css']
})
export class LogInFormComponent implements OnInit {

  constructor(private adressVerificationService:AddressVerificationServiceService, private _router: Router) {}
  contact : any;
  ngOnInit() {
 
    }
    login(){

      var phoneno = /^\d{10}$/;
  if((this.contact.match(phoneno))) {
    let url = 'Login';
    const uploadData = new FormData();
    uploadData.append('contact', this.contact);;
    this.adressVerificationService.callpostUrl(url,uploadData).subscribe( data => {

      if(data == 'Success') {
        localStorage.setItem('contact', this.contact);
        this._router.navigate(['/home']);
      }else{
        alert('Please Enter Your Registered Mobile Number.');
      }
     // console.log(data);

    });
  } else{
    alert('Please Provide Valid Mobile Number.');
  }

    
    }
}