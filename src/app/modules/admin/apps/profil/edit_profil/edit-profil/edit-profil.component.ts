import { ChangeDetectorRef, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { NgForm, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
@Component({
  selector: 'app-edit-profil',
  templateUrl: './edit-profil.component.html',
  styleUrls: ['./edit-profil.component.scss']
})
export class EditProfilComponent {
  selector: 'datepicker-overview-example'
  templateUrl: 'datepicker-overview-example.html'
  standalone: true
  imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule]
  startDate = new Date(1990, 0, 1);
  @ViewChild('updateuserNgForm') updateuserNgForm: NgForm;
  @ViewChild('profileImage') profileImage: ElementRef;
alert: { type: FuseAlertType; message: string } = {
  type   : 'success',
  message: '',
 
};
constructor( private  _authService: AuthService,
  private _formBuilder: UntypedFormBuilder,
  private _router: Router,private route: ActivatedRoute , private cdr: ChangeDetectorRef){

  

}

@Input() user:any;
PhotoUrl ="http://localhost:61860/photo";
id:string;
username:string;
password:string;
phone:string;
image:string;
PhotoFilePath:string;
showAlert: boolean = false;
updateuserForm: UntypedFormGroup;
userList:any=[];
Email: string = '';
listuser:any=[];
s:any;
date_of_birth:any;
linkedin:any;
git_hub:any;
headline:any;

ngOnInit():void{


  this._authService.getEmail().then(email => {
    this.Email = email; // Assign the email value to the Email variable
  });


   
    this.updateuserForm = this._formBuilder.group({
    id: [null],
      username: [''],
      phone : [''],
      image:[''],
      password:[''],
      Oldpassword:[''],
     
      date_of_birth:[''],
      linkedin:[''],
      git_hub:[''],
      headline:[''],
     
  
  },

  
    )  

   

    this.route.queryParams.subscribe(params => {
      if (params.user) {
        const user = JSON.parse(params.user);
        // Set form values with user data
        this.updateuserForm.patchValue({
          id: user.id,
          username:user.username,
          phone: user.phone,
          date_of_birth: user.date_of_birth,
          linkedin: user.linkedin,
          git_hub: user.git_hub,
          headline: user.headline,
         
        });
        console.log('User image:', user.image);
        this.image = this.removeFakePathPrefix(user.image);
        this.PhotoFilePath = this._authService.PhotoUrl + this.image;
  
        // Log the cleaned PhotoFilePath
        console.log('Cleaned PhotoFilePath in ngOnInit:', this.PhotoFilePath)
        
      
      }
    });
   
    this.loaduserList();

  }
  loaduserList(){
    this._authService.getlistusers().subscribe((data:any)=>{
      this.userList=data;
  
      this.id=this.user.id;
      this.username=this.user.username;
      this.phone=this.user.phone;
      this.image=this.user.image;
      this.date_of_birth= this.user.date_of_birth,
      this.linkedin= this.user.linkedin,
      this.git_hub=this.user.git_hub,
      this.headline= this.user.headline,
      this.PhotoFilePath=this._authService.PhotoUrl+this.image;
    
    });
   




    
  }




  

  
 


  update_user() {
    const updatedData = this.updateuserForm.value;
    updatedData.image = 'C:\\fakepath\\' + this.image;
  
    console.log('updated data neww ', updatedData);
  
    // Remove the 'Oldpassword' field from the updatedData object
    delete updatedData.Oldpassword;
  
    this._authService.getusers().subscribe((r) => {
      const x = r.find((p) => p.email === this.Email);
      var pass = x.password;
      const newPassword = this.updateuserForm.get('password').value;
      const currentPassword = this.updateuserForm.get('Oldpassword').value;
  
   //derty ta3mel verif tchouf estque password fih valeur wili la 
      if (this.updateuserForm.get('password').dirty) {
       
         
          if (currentPassword === x.password) {
            updatedData.password = newPassword;
          } else {
            alert('Password Incorrect, please try again');
            this.updateuserNgForm.resetForm();
            return;
          
        } 
      } else {
    
        updatedData.password = pass;
        console.log(updatedData)
      }
  
      this._authService.updateuser(updatedData).subscribe(
        (res) => {
          alert('Updated successfully');
         
          console.log(res);
          this._router.navigate(['apps/profil']);
          setTimeout(() => {
            window.location.reload();
          }, 100);
        },
      );
    });
  }
  
  
  
  

uploadPhoto(event) {
  const file = event.target.files[0];
  const formData: FormData = new FormData();
  formData.append('uploadedFile', file);

  this._authService.uplodephoto(formData).subscribe((data: any) => {
    this.image = data.toString();

    // Remove the "C:\fakepath\" from this.image
    this.image = this.removeFakePathPrefix(this.image);

    // Construct the complete URL with the file name
    this.PhotoFilePath = this._authService.PhotoUrl + this.image;
    console.log('New PhotoFilePath:', this.PhotoFilePath);

    // Update the <img> src attribute to display the new image
    const profileImageElement = document.getElementById('profileImage') as HTMLImageElement;
    if (profileImageElement) {
      profileImageElement.src = this.PhotoFilePath;
    }
  });
}



removeFakePathPrefix(inputValue) {
  if (inputValue.indexOf('\\fakepath\\') !== -1) {
    const parts = inputValue.split('\\fakepath\\');
    return parts[parts.length - 1];
  }
  return inputValue;
}


FetchOldPasswordByEmail(){

  this._authService.getusers().subscribe(data=>{
 
    const x = data.find(p=>p.email === this.Email)

    if(x.password === this.updateuserForm.get('oldpassword').value){
 
     
    const newPassword = this.updateuserForm.get('newpassword').value;

     
  const formData = new FormData();
  formData.append('password', newPassword);


    this._authService.updateuser(formData).subscribe(res=>{
    alert('Password updated successfully');
   })

    } else {
    
      alert('Passwords do not match');
    }

  })
}

backtoprofile() :void
{
    this._router.navigate(['/apps/profil']);
}

}