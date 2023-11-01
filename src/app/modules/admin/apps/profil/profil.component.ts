import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent {
  constructor( private _authService: AuthService, private router:Router,private _router: Router , private route: ActivatedRoute)
  {
  
  }
  
  listuser:any[];
  user:any;
  Email: string = '';
  PhotoUrl = "http://localhost:61860/photo";
  
  ngOnInit(): void
  {
  
    this._authService.getEmail().then(email => {
      this.Email = email; // Assign the email value to the Email variable
    });
  
  
    this.userlist()
      // Create the form

      
      
  }
  
  

  
  UpdateUser(userId: string) {
      
    this._authService.getlistusers().subscribe(data => {
      const users = data.filter(user => user.id=== userId)[0];
      console.log("hello",users)
      this._router.navigate(['/apps/edit_profil'], { queryParams: { id: userId, user: JSON.stringify(users) } });
    });
  }

  
  userlist(){
    this._authService.getlistusers().subscribe(data=>{
     
      this.listuser = data.filter(users=> users.email === this.Email);
      console.log("ddd",this.listuser)
    }
    )
  }
  profile(){
    this._router.navigate(['/apps/edit_profil']);
  }
}