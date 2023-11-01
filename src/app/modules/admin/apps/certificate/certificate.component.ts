import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.scss']
})
export class CertificateComponent {
  @ViewChild('certificateContainer', { static: false }) certificateContainer: ElementRef;
  Email:any
  courname:any
UserData:any[]
currentDate: Date;
StudentName:any;
StudentDateBirth:any;

  constructor( private route: ActivatedRoute , private _authService: AuthService, private router:Router){

    this.getCurrentDate();
  }

  logo_List
listapp
  ngOnInit():void{

    this._authService.getlogo().subscribe(data => {
      this.logo_List = data;
      console.log("nnnhbks",this.logo_List)
    })
    this._authService.getappname().subscribe(res=>{
      this.listapp=res})
    this._authService.getEmail().then(email => {
      this.Email = email;
      console.log('email from certif: ', this.Email);
      this.showStudentData();
      this.route.queryParams.subscribe(params => {
        this.courname = params.courname;
        console.log('courname from certif: ', this.courname);
      });
    });

  }

  showStudentData() {
    this._authService.getusers().subscribe(data => {
      // Check if data is available and the email matches
      const userData = data.find(user => user.email === this.Email);
  
      if (userData) {
        this.UserData = userData;
        this.StudentName = userData.username;
        this.StudentDateBirth = userData.date_of_birth;
        console.log('Data of student:', this.StudentName, this.StudentDateBirth);
      } else {
        // Handle the case where the user with the specified email is not found
        console.log('User not found.');
      }
    });
  }
  


  getCurrentDate() {
    this.currentDate = new Date();
  }

  

  generatePDF(): void {
    // Define the values you want to include in the PDF
    const email_student = this.Email;
    const cour_name = this.courname;
  
    // Create a new jsPDF instance in landscape mode
    const pdf = new jsPDF('landscape');
  
    // Access the HTML element using ViewChild
    const element = this.certificateContainer.nativeElement as HTMLElement;
  
    // Generate a dynamic PDF filename based on the current timestamp
    const timestamp = new Date().getTime();
    const _certifPDF = `certificate_${timestamp}.pdf`;
  
    // Increase the canvas resolution (scale) for better quality
    const scale = 2; // You can adjust this value as needed
  
    html2canvas(element, { scale: scale }).then((canvas) => {
      // Debugging: Log the canvas to check if it captures the content properly
      console.log('Captured Canvas:', canvas);
  
      const imgData = canvas.toDataURL('image/jpeg', 1.0); // Use JPEG format with maximum quality (1.0)
      const imgWidth = 297; // Landscape A4 page width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
      // Add the canvas image to the PDF
      pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
  
      // Generate the PDF Blob
      const pdfData = pdf.output('blob'); // This will give you a Blob object containing the PDF data
  
      // Create a download link for the PDF and set the href and download attributes
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(pdfData);
      downloadLink.download = _certifPDF; // Set the download attribute to the desired filename
  
      // Trigger a click on the download link to initiate the download
      downloadLink.click();
  
      // Convert the canvas to an image and send it to the server
      const certifPDF = canvas.toDataURL('image/jpeg', 1.0); // Convert canvas to image data URL
  
      // Send the image data to the server using an HTTP request (you'll need to implement the server-side logic)
      const imageData = {
        email_student: email_student,
        cour_name: cour_name,
        certifPDF: certifPDF, // Include the image data as a data URL
      };
  
      this._authService.addcertif(imageData).subscribe(
        (response) => {
          console.log(imageData);
          alert('Certificate registered successfully');
  
          // Redirect to another page or perform additional actions
          this.router.navigateByUrl('apps/home');
        },
      );
    });}}

