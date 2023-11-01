import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from 'app/core/auth/auth.service';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-historical',
  templateUrl: './historical.component.html',
  styleUrls: ['./historical.component.scss']
})
export class HistoricalComponent {
  listCertif:any[];
  courOfStudent:any[];
  Email:string;
  
  constructor(private _authService: AuthService ) { }

 ngOnInit(): void {

  this._authService.getEmail().then(email => {
    this.Email = email; 
 
});

  this.ShowCertif();
  this.ShowStudentCourse();
 
}



ShowStudentCourse(){
  this._authService.getPayment().subscribe(data=>{

    this.courOfStudent = data.filter(i => i.student_email === this.Email)
    console.log(this.courOfStudent)
  })
}



ShowCertif(){

  this._authService.getcertif().subscribe(

    (data) => {
      this.listCertif= data.filter(s=>s.email_student===this.Email)
   
      console.log(this.listCertif)
     
      
    },
   
  );


}

convertImageToPdf(imageUrl: string): void {
 const pdf = new jsPDF('landscape');
  const img = new Image();

  // Load the image
  img.src = imageUrl;

  // When the image is loaded, add it to the PDF
  img.onload = () => {
    const width = 297;
    const height = (img.height * width) / img.width;
    pdf.addImage(img, 'JPEG', 0, 0, width, height);

    // Save the PDF with a dynamic filename
    const timestamp = new Date().getTime();
    const pdfFileName = `image_to_pdf_${timestamp}.pdf`;
    pdf.save(pdfFileName);
  };
}



}