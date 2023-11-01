import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.scss']
})
export class PartnersComponent {

  constructor( private _authService: AuthService,private router:Router){}

  partner_list:any=[]
  list:any=[]
  PhotoUrl = "http://localhost:61860/photo";
  email_List
  ngOnInit():void{
  
    this._authService.getemailfooter().subscribe(data => {
      this.email_List = data;
      console.log("nnnhbks",this.email_List)
    })

      this.subject_show();
      this.getsocial();
    }
    subject_show(){
      this._authService.get_partners().subscribe(data=>{
        this.partner_list=data;
        console.log(data)
      })
    }
    get currentYear(): number
{
    return new Date().getFullYear();
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
    meet(){
      this.router.navigate(['/apps/metting'])
    }
    cour(){
      this.router.navigate(['/apps/home'])
    }
    profil(){
      this.router.navigate(['/apps/profil'])
    }
  }
