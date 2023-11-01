import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
@Component({
  selector: 'app-showanswer',
  templateUrl: './showanswer.component.html',
  styleUrls: ['./showanswer.component.scss']
})
export class ShowanswerComponent  implements OnInit {
    emailStudent:any;
    answerList:any[]
    idStudent:number;
    constructor(  private _authService: AuthService,
      private router:Router,private route: ActivatedRoute){}
  
      ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
         
          this.idStudent = +params.id;
          console.log('email id: ', this.idStudent);
          this.showAnswerr();
        });
        this.answerList = [];
      }
  
  
  
  
      showAnswerr() {
        this._authService.getanswer().subscribe(data => {
          this.answerList = data.filter(a => a.id === this.idStudent);
          console.log('answer list: ', this.answerList);
        });
      }
  
     
      
  
  
  
  }
