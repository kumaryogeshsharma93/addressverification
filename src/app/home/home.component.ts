import {Component, Input, ViewChild, OnInit, HostListener, ElementRef}
 from '@angular/core';
 import {HttpHeaders } from '@angular/common/http';
 import {SignaturePad}
from 'angular2-signaturepad';
import {jsPDF} from "jspdf"
import * as html2canvas from "html2canvas";
//import html2canvas from 'hmtl2canvas'
import {AddressVerificationServiceService} from '../address-verification-service.service';
import { Router } from '@angular/router';
declare var $: any;

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	urlOne = '';
	urlTwo = '';
	urlThree = '';
	urlFour = '';
	img;
	refId: any;
	clientName: any;
	username: any;
	contact: any;
	dateOfBirth: any;
	father: any;
	durationDate: any;
	durationStay: any;
	address: any;
	inlineFormCustomSelect: any;
	adhaarFront: any;
	adhaarBack: any;
	bill: any;
	homeImages: any;
	flag = true;
	Signature: any;
	residence: any;
	contactData : any;
	userconsent:boolean;

	location: boolean = false; //Changing Code 
	@ViewChild(SignaturePad) signaturePad: SignaturePad;

	@ViewChild('myInput1')
	myInputVariable1: ElementRef;

	@ViewChild('myInput2')
	myInputVariable2: ElementRef;

	@ViewChild('myInput3')
	myInputVariable3: ElementRef;

	@ViewChild('pdfContent')
	htmlElementRef: ElementRef;

	@ViewChild('mapContent')
	htmlElementRef2: ElementRef;

	accElement: HTMLDivElement;
 	finaldata: any = [];
 	lat;
 	lon;
	 
	 aadharFrontFile: File ;
	 aadharBackFile: File ;
	 utilityBillFile: File ;
	 homeImageFile: File ;

	constructor(private adressVerificationService:AddressVerificationServiceService, private _router: Router) {}

	
	ngAfterViewInit() {
		// this.signaturePad is now available
		this.signaturePad.set('minWidth', 5); // set szimek/signature_pad options at runtime
		this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
		
	}
	resetSign(){
		this.signaturePad.clear(); // reset Sign
		this.img="";
	}
	drawComplete() {
		// will be notified of szimek/signature_pad's onEnd event
		this.img = this.signaturePad.toDataURL();

	}

	drawStart() {
		// will be notified of szimek/signature_pad's onBegin event
		console.log('begin drawing');
	}

	dataURLtoFile(dataurl, filename) {
 
        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), 
            n = bstr.length, 
            u8arr = new Uint8Array(n);
            
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        
        return new File([u8arr], filename, {type:mime});
    }
    

	saveUserFormData() {
		
			   const form = new FormData();
               form.append("refId",this.refId);
               form.append("clientName",this.clientName);
               form.append("username",this.username);
               form.append("contact",this.contact);
               form.append("dateOfBirth",this.dateOfBirth);
               form.append("father",this.father);
               form.append("durationDate",this.durationDate);
               form.append("durationStay",this.durationStay);
               form.append("residence",this.inlineFormCustomSelect);
			   console.log(this.inlineFormCustomSelect);
			   form.append("lat",this.lat);
			   form.append("lon",this.lon);
               form.append("adhaarFront",this.urlOne);  // type file
               form.append("adhaarBack",this.urlTwo); // type file
               form.append("bill",this.urlThree); // type file
               form.append("homeImages",this.urlFour); // type file
			   var file = this.dataURLtoFile(this.img,'Signature');
               form.append("Signature",this.img); // type file
				let url ="InsertEmpDetails";
				this.adressVerificationService.callpostUrl(url,form).subscribe( (data:any) => {
					console.log('success form submit');
				
			});

	}

	//Location Code Start
	ngOnInit() {
		
		let contact = localStorage.getItem('contact');
		if(contact == null || contact == "" || contact == undefined || contact == 'undefined') {
			this._router.navigate(['/login']);
		} else {
			this.inlineFormCustomSelect = this.residenceTypes[0].name;
			let url = 'GetEmpDetails';
			const uploadData = new FormData();
			uploadData.append('contact', contact);
			this.adressVerificationService.callpostUrl(url,uploadData).subscribe( (data:any) => {
				this.finaldata = JSON.parse(data) ;
				this.updateuserInfo(this.finaldata[0]);
		});
	}
}
updateuserInfo(user) {
		let userInfo = user;
		this.refId = userInfo.refID;
		this.clientName = userInfo.clientName;
		this.username = userInfo.candidateName;
		this.father = userInfo.fatherName;
		this.dateOfBirth = userInfo.DOB;
		this.address = userInfo.currentAddress;
		this.contact = userInfo.Mobile; 
 }

  savePdf(canvas){
	var pdfname = this.refId + '_' + this.username +'.pdf';
    
    var pdf = new jsPDF('p', 'pt', [canvas.width, canvas.height]);
    var imgData = canvas.toDataURL("image/jpeg", 1.0);
    pdf.addImage(imgData, 0, 0, canvas.width, canvas.height);
	pdf.save(pdfname);
	this.saveUserFormData();
	 /*
	 // we can send PDF file from angular app to node APP
	 // and then we will download the file in server.
	const uploadData = new FormData();
	var blob = pdf.output('blob');
	uploadData.append('pdf', blob , this.refId + "_"+ this.clientName);
	this.adressVerificationService.uploadSingleFile('http://localhost:3008/api/file-upload',uploadData).subscribe( (data:any) => {
		console.log('file saved on server succesfully !');
  	});
  */
	this.resetForm();
	localStorage.clear();
	alert('Thank you, Your Information has sent Successfully !):');
	this._router.navigate(['/login']);
    return true;
  }

	saveandSend()
	{
    // save with html2canvas into pdf
	this.validateUserForm();
	if (this.flag) {
      const options = {
        proxy: "server.js",
        useCORS: true,
      };
		let DATA = this.htmlElementRef.nativeElement;
			(html2canvas as any)(document.body, options).then(canvas => {
        		let isPdf = this.savePdf(canvas);
        		
			});
		}
	}

	saveWithJSPdf() {
		let DATA = this.htmlElementRef2.nativeElement;
		this.accElement = < HTMLDivElement > (document.createElement('div'));
		this.accElement.innerHTML = DATA.innerHTML;
		this.accElement.style.width = "595px";
		this.accElement.style.fontSize = "9";
		this.accElement.style.fontFamily = "'Quicksand', sans-serif !important;";
		let doc = new jsPDF('p', 'pt', 'a4');
		doc.setFontSize(9);
		doc.html(this.accElement, {
			callback: function (doc) {
				doc.save('user_information');
			},
			x: 15,
			y: 15
		});
		let handleElement = {
			'#editor': function (element, renderer) {
				return true;
			}
		};
	}

	getLocation(loc: boolean) {
		this.location = loc;
		console.log('this.location ' + this.location);
	}

	getuserCordinates(cordinate : string) {
		let corArr : any = [];
		corArr = cordinate.split("_");
		this.lat = corArr[0];
		this.lon = corArr[1];
	
	}

	public signaturePadOptions: Object = { // passed through to szimek/signature_pad constructor
		'minWidth': 5,
		'canvasWidth': 500,
		'canvasHeight': 150
	};





	//Location Code End
	//File Upload
	onSelectFile1(event) {
		if (event.target.files && event.target.files[0]) {
			
			var reader = new FileReader();
			const file = event.target.files[0];
			//this.adhaarFront = file.name;
			if (file.type == 'image/jpeg' || file.type == 'image/jpg' || file.type == 'image/png') {
				this.aadharFrontFile = event.target.files[0];
				reader.readAsDataURL(event.target.files[0]); // read file as data url
				reader.onload = (event: any) => { // called once readAsDataURL is completed
					this.urlOne = event.target.result;
					
				}
			} else {
				this.myInputVariable1.nativeElement.value = "";
				alert(' please upload any of the given valid file type : jpeg,jpg,png');
			}

		}
	}
	// File Uploader 2
	onSelectFile2(event) {
		if (event.target.files && event.target.files[0]) {
			var reader = new FileReader();
			const file = event.target.files[0];
			//this.adhaarBack = file.name;
			if (file.type == 'image/jpeg' || file.type == 'image/jpg' || file.type == 'image/png') {
				this.aadharBackFile = event.target.files[0];
				reader.readAsDataURL(event.target.files[0]); // read file as data url
				reader.onload = (event: any) => { // called once readAsDataURL is completed
					this.urlTwo = event.target.result;
				}
			} else {
				this.myInputVariable2.nativeElement.value = "";
				alert(' please upload any of the given valid file type : jpeg,jpg,png');
			}
		}
	}

	// File Uploader 3
	onSelectFile3(event) {
		if (event.target.files && event.target.files[0]) {
			var reader = new FileReader();
			const file = event.target.files[0];
			if (file.type == 'image/jpeg' || file.type == 'image/jpg' || file.type == 'image/png') {
				this.utilityBillFile = event.target.files[0];
				reader.readAsDataURL(event.target.files[0]); // read file as data url
				reader.onload = (event: any) => { // called once readAsDataURL is completed
					this.urlThree = event.target.result;
				}
			} else {
				this.myInputVariable3.nativeElement.value = "";
				alert(' please upload any of the given valid file type : jpeg,jpg,png');
			}
		}
	}


	//Image file check

	onSelectFile4(event) {
		if (event.target.files && event.target.files[0]) {
			var reader = new FileReader();
			const file = event.target.files[0];
			if (file.type == 'image/jpeg' || file.type == 'image/jpg' || file.type == 'image/png') {
				this.homeImageFile = event.target.files[0];
				reader.readAsDataURL(event.target.files[0]); // read file as data url
				reader.onload = (event: any) => { // called once readAsDataURL is completed
					this.urlFour = event.target.result;
				}
			} else {
				this.myInputVariable1.nativeElement.value = "";
				alert(' please upload any of the given valid file type : jpeg,jpg,png');
			}

		}
	}


	//Validation start
	initErrorFormData() {
		this.signuperrordata.durationDate = false;
		this.signuperrordata.durationStay = false;
		this.signuperrordata.inlineFormCustomSelect = false;
		this.signuperrordata.adhaarFront = false;
		this.signuperrordata.adhaarBack = false;
		this.signuperrordata.bill = false;
		this.signuperrordata.homeImages = false;
		this.signuperrordata.signature = false;
		this.signuperrordata.userconsent = false;
		
	}
	trimSignUpFormData() {
		if (this.durationDate != null) {
			this.signupdata.durationDate = this.durationDate.trim();
		}

		if (this.durationStay != null) {
			this.signupdata.durationStay = this.durationStay.trim();
		}
		if (this.durationDate != null) {
			this.signupdata.durationDate = this.durationDate.trim();
		}
		if (this.inlineFormCustomSelect != null) {
			this.signupdata.inlineFormCustomSelect = this.inlineFormCustomSelect.trim();
		}
		if (this.urlOne != null) {
			this.signupdata.adhaarFront = this.urlOne.trim();
		}
		if (this.urlTwo != null) {
			this.signupdata.adhaarBack = this.urlTwo.trim();
		}
		if (this.bill != null) {
			this.signupdata.bill = this.bill.trim();
		}
		if (this.homeImages != null) {
			this.signupdata.homeImages = this.homeImages.trim();
		}
		if (this.img != null) {
			this.signupdata.signature = this.img.trim();
		}

	}

	validateUserForm() {
		
		this.trimSignUpFormData();
		this.initErrorFormData();
		this.flag = true;
		if (this.signupdata.durationDate == "" || this.signupdata.durationStay == "" || this.signupdata.inlineFormCustomSelect == "" || this.signupdata.adhaarFront == "" || this.signupdata.adhaarBack == "" || this.signupdata.bill == "" || this.signupdata.homeImages == "" || this.img == "" || this.img == null || this.userconsent == false) {
			this.flag = false;
			if (this.signupdata.durationDate == "") {
				this.signuperrordata.durationDate = true;
			}
			if (this.signupdata.durationStay == "") {
				this.signuperrordata.durationStay = true;
			}
			if (this.signupdata.inlineFormCustomSelect == 'Select Residence Type') {
				this.signuperrordata.inlineFormCustomSelect = true;
			}
			if (this.signupdata.adhaarFront == "") {
				this.signuperrordata.adhaarFront = true;
			}
			if (this.signupdata.adhaarBack == "") {
				this.signuperrordata.adhaarBack = true;
			}
			if (this.signupdata.bill == "") {
				this.signuperrordata.bill = true;
			}
			if (this.signupdata.homeImages == "") {
				this.signuperrordata.homeImages = true;
			}
			if (this.img == "" || this.img == undefined || this.img == 'undefined') {
				this.signuperrordata.signature = true;
			}
			if(this.userconsent == false || this.userconsent == undefined) {
				this.signuperrordata.userconsent = true;
			}
		
		}
	}

	residenceTypes = [{
		id: -1,
		name: 'Select Residence Type',
		value: 'Select Residence Type'
	},
	{
		id: 2,
		name: 'Owned',
		value: 'Owned'
	},
	{
		id: 3,
		name: 'Relative',
		value: 'Relative'
	},
	{
		id: 4,
		name: 'Rented',
		value: 'Rented'
	},
	{
		id: 5,
		name: 'Government Accommodation',
		value: 'Government Accommodation'
	},
	{
		id: 6,
		name: 'PG',
		value: 'PG'
	},
];


signupdata = {
	refId: "",
	clientName: "",
	username: "",
	contact: "",
	dateOfBirth: "",
	father: "",
	durationDate: "",
	durationStay: "",
	address: "",
	inlineFormCustomSelect: "",
	adhaarFront: "",
	adhaarBack: "",
	bill: "",
	homeImages: "",
	signature: "",
	userconsent:""
}
signuperrordata = {
	durationDate: false,
	durationStay: false,
	inlineFormCustomSelect: false,
	adhaarFront: false,
	adhaarBack: false,
	bill: false,
	homeImages: false,
	signature: false,
	userconsent:false
};

resetForm() {
	this.refId = "";
	this.clientName = "";
	this.username = "";
	this.contact = "";
	this.father = "";
	this.durationDate = "";
	this.durationStay = "";
	this.address = "";
	this.inlineFormCustomSelect = "";
	this.adhaarFront = "";
	this.adhaarBack = "";
	this.bill = "";
	this.homeImages = "";
	this.dateOfBirth = "";
	this.urlOne = "";
	this.urlTwo="";
	this.urlThree="";
	this.urlFour="";
	this.signaturePad.clear();
	this.img="";

}

}