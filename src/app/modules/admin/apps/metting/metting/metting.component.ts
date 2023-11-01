import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service'
@Component({
  selector: 'app-metting',
  templateUrl: './metting.component.html',
  styleUrls: ['./metting.component.scss']
})
export class MettingComponent {
  @ViewChild('editmeetNgForm') editmeetNgForm: NgForm;
  alert: { type: FuseAlertType; message: string } = {
    type   : 'success',
    message: ''
};
PhotoUrl = "http://localhost:61860/photo";
  showAlert: boolean = false;
  meet_List:any=[];
  list:any=[]
  constructor( private _authService: AuthService,private router:Router){

    

  }
  

  



  email_List
  ngOnInit():void{
  
    this._authService.getemailfooter().subscribe(data => {
      this.email_List = data;
      console.log("nnnhbks",this.email_List)
    })

    this._authService.get_meet().subscribe(data => {
      this.meet_List = data;
      console.log("wassimlok", this.meet_List); // This logs the data correctly
    });
    this.subject_show();
    this.getsocial();
  }      
  subject_show(){
    this._authService.get_meet().subscribe(data=>{
 this.meet_List=data;
   console.log("data",this.meet_List)

     })
 }
 getsocial(){
  this._authService.get_social().subscribe(data=>{
    this.list=data;
    console.log('xccxc',data)})
}
 about(){
  this.router.navigate(['/apps/about'])
}
contact(){
  this.router.navigate(['/apps/contact'])
}
partner(){
  this.router.navigate(['/apps/partners'])
}
cour(){
  this.router.navigate(['/apps/home'])
}
profil(){
  this.router.navigate(['/apps/profil'])
}           
    

get currentYear(): number
{
    return new Date().getFullYear();
}
   
    }