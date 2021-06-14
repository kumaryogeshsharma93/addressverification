import { Component, OnInit, Output, EventEmitter } from '@angular/core';
//import { ToastrService  } from 'ngx-toastr';
//import { ToastConfig, Toaster, ToastType } from "ngx-toast-notifications";

@Component({
  selector: 'app-userlocation',
  templateUrl: './userlocation.component.html',
  styleUrls: ['./userlocation.component.css']
})
export class UserlocationComponent implements OnInit {

  // constructor(
  //   private toastr: ToastrService , private toaster:  Toaster
  // ) {
      
  // }
  constructor(
    
  ) {
      
  }
  title = 'DigitalAddressVerification';
  isLocation : boolean;
  lat;
  lon;
  zoomlevel:number =14;
  @Output() locationEvent = new EventEmitter<boolean>();
  @Output() cordinateEvent = new EventEmitter<string>();

  ngOnInit() {
    this.isLocation = false;
    this.getUserLocation();
  }
 
  setCordinatesOnMap(position) {
    this.isLocation = true;
    this.locationEvent.emit(this.isLocation);
    this.lat = position.coords.latitude;
    this.lon = position.coords.longitude;
    let cordinates = this.lat + "_" + this.lon;
    this.cordinateEvent.emit(cordinates);
    console.log('position.coords.latitude '+position.coords.latitude);
    console.log('position.coords.longitude '+position.coords.longitude);

  }

  showError() {
     alert('Please turn on location of your device, allow for device location access in browser and refresh the page.');
    
    
  }

  getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
          this.setCordinatesOnMap(position);
       }, () => {
        this.showError();
       }
      )
 }else {
  this.showError();
  }
}

}
