import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddressVerificationServiceService {

  private finaldata = [];
  private apiurl =  environment.baseUrl;

  constructor(private http: HttpClient) { }
  
  uploadSingleFile(url, postdata ){
     return this.http.post<any>( url, postdata)
     .pipe(catchError(this.errorHandler))
  }

  callpostUrl(url,postdata){
     return this.http.post<any>(this.apiurl+""+url, postdata)
     .pipe(catchError(this.errorHandler))
  }
  
   callgetUrl(url){
     return this.http.get(this.apiurl+""+url);
  }

  callgetMapImg(url){
   return this.http.get(url);
  }
  
  LatLanData(url){
   return this.http.get(url);
}

  submitSignUp(url,postdata) {
     return this.http.post<any>(this.apiurl+""+url, postdata)
     .pipe(catchError(this.errorHandler))
  }

  errorHandler(error: HttpErrorResponse) {
   return throwError(error)
 }
 commaSeprateString(data){
    return data.replace(/,+/g, ', ');
 }
}