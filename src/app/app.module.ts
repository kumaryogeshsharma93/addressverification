import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AgmCoreModule } from '@agm/core';
import { SignaturePadModule } from 'angular2-signaturepad';
import { UserlocationComponent } from './userlocation/userlocation.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { LogInFormComponent } from './log-in-form/log-in-form.component';
import {HttpClientModule} from '@angular/common/http';
import { AddressVerificationServiceService } from './address-verification-service.service';
import {NgxImageCompressService} from 'ngx-image-compress';
// Import ng-circle-progress
import { NgCircleProgressModule } from 'ng-circle-progress';
//import { ToastrModule } from 'ngx-toastr';
//import { ToastNotificationsModule} from 'ngx-toast-notifications'
// "ngx-toast-notifications": "^1.3.0",
//     "ngx-toastr": "^10.1.0",
declare var $: any;

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    UserlocationComponent,
    LogInFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBZ6nfhjzenF9LRwbUQUxHKfwPLmGnEffs'
    }),
    SignaturePadModule,
    BrowserAnimationsModule,
     // Specify ng-circle-progress as an import
     NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,
    })
    // required animations module
    // ToastrModule.forRoot({ 
    //   timeOut: 30000,
    //   positionClass: 'top-center',
    //   preventDuplicates: true,
    // }),
    // ToastNotificationsModule
  ],
  providers: [AddressVerificationServiceService, NgxImageCompressService],
  bootstrap: [AppComponent]
})
export class AppModule { }
