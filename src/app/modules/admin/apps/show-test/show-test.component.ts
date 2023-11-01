import { Component, NgZone } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
import { DatePipe } from '@angular/common';
import { Location } from '@angular/common';

@Component({
  selector: 'app-show-test',
  templateUrl: './show-test.component.html',
  styleUrls: ['./show-test.component.scss'],
  providers: [DatePipe]
})
export class ShowTestComponent {
  constructor( private _authService: AuthService , private router:Router, private location: Location , private route: ActivatedRoute ,  private _sanitizer: DomSanitizer){}

  test_Data:any=[]
  pageSize = 1;
  currentPage = 1;
  showMessage: boolean = false;
  userPoints: number = 0;
  private userPoints_tf: number[] = [];
  f_socre:number;
  showButtons: boolean = true;
  isTimeUp: boolean = false;
  durationPerExercise = 10000;
    remainingTime: number;
    timer: any;
    showNbPage:boolean=true
    timeShow:boolean=true
courname:string
  



  ngOnInit():void{

   

    this.route.queryParams.subscribe(params => {
      this.courname = params.courname;
  
      console.log('ggg', this.courname);
  
      if (this.courname) {
        this.Test_show(this.courname);
      }
    });

    
    this.startTimer();
   
  
  
    }


 

    get displayedTests(): any[] {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.test_Data.slice(startIndex, endIndex);
    }

    previousPage(): void {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    }

 
  
   
    
    nextPage(): void {
      if (this.currentPage < this.test_Data.length) {
        this.currentPage++;
        this.location.replaceState('/');
      } else {
        const isLastPage = this.currentPage === this.test_Data.length;
    
        if (isLastPage) {
          this.currentPage++
          this.stopTimer();
          this.showMessage = true;
          console.log('Final Score:', this.userPoints);
          this.f_socre = this.userPoints + this.calculateTotalPoints_tf();
          this.showButtons = false;
          this.showNbPage = false;
          this.timeShow = false;
        }
      }
    }
    
    startTimer(): void {
      this.timer = setInterval(() => {
        this.remainingTime -= 1000;
    
        if (this.remainingTime <= 0 && !this.isTimeUp) {
          this.stopTimer();
          this.isTimeUp = true;
          alert("Time's up! You took more than Your Time.");
    
          console.log('Final Score:', this.userPoints);
          this.f_socre = this.userPoints + this.calculateTotalPoints_tf();
          this.showButtons = false;
          this.showNbPage = false;
          this.timeShow = false;
          this.showMessage = true;
    
          // Set currentPage after all calculations and flag updates
          this.currentPage = this.test_Data.length + 1;
        }
      }, 1000);
    }
    

 
    

    
ngOnDestroy(): void {
  this.stopTimer(); // Stop the timer when leaving the component
}
    

   
    stopTimer(): void {
      clearTimeout(this.timer);
    }


    Test_show(test_course: string): void {
      this._authService.get_TestByCourName(test_course).subscribe(data => {
        const filteredData = data.filter(test_Data => test_Data.test_course === test_course);
    
        if (filteredData.length > 0) {
          this.test_Data = filteredData.map(test_Data => ({
            ...test_Data,
            sanitizedQuestion: this._sanitizer.bypassSecurityTrustHtml(test_Data.test_question)
          }));
           this.remainingTime = this.test_Data.length * this.durationPerExercise;
        } else {
          alert("No Test For This course");
          this.router.navigateByUrl('/apps/home');
        }
      });
    }
    
    updatePoints(checked: boolean, questionNumber: number,check:number): void {

    
      if (checked && questionNumber <= 2) {
      
          this.userPoints+=0.5;
          console.log('points increased by 1:', this.userPoints);
        } else {
          this.userPoints-=0.5;
          console.log('points decreased by 1:', this.userPoints);
       
      }
      
    

     
    }

    handleCheckboxChange() {
      const checkboxes = document.querySelectorAll('input[type="checkbox"]');
      let count = 0;
    
      checkboxes.forEach((checkbox) => {
        if ((checkbox as HTMLInputElement).checked) {
          count++;
        }
      });
    
      if (count > 1) {
       
        checkboxes.forEach((checkbox) => {
          if (!(checkbox as HTMLInputElement).checked) {
            (checkbox as HTMLInputElement).disabled = true;
          }
        });
      } else {
        checkboxes.forEach((checkbox) => {
          (checkbox as HTMLInputElement).disabled = false;
        });
      }
    }
    







    updatePoints_tf(checked: boolean, selectedValue: boolean, test: any): void {
      const testIndex = test.test_id;    
     
      if (!this.userPoints_tf[testIndex]) {
        this.userPoints_tf[testIndex] = 0;
      }
    
      if (checked && Boolean(test.test_tf) === Boolean(selectedValue)) {
        this.userPoints_tf[testIndex]++;
        console.log('points increased by 1:', this.userPoints_tf[testIndex]);
      } else if (checked && Boolean(test.test_tf) !== Boolean(selectedValue)) {
        if (this.userPoints_tf[testIndex] > 0) {
          this.userPoints_tf[testIndex]--;
          console.log('points decreased by 1:', this.userPoints_tf[testIndex]);
        } else {
          console.log('points cannot be decreased ', this.userPoints_tf[testIndex]);
        }
      }

      
    
      // show total point in console
      var totalPoints = this.calculateTotalPoints_tf();
      console.log('Total Points:', totalPoints);
    }
    
    calculateTotalPoints_tf(): number {
     
     return this.userPoints_tf.reduce((sum, points) => sum + points, 0);
    }
    
    
    
    
   
  
    SendCourNameToCertifPage() {
      
      if (this.courname) {
        this.router.navigate(['/apps/certif'], { queryParams: { courname: this.courname } });
      }
    }
    
    
    
    
    
   
    get currentYear(): number
    {
        return new Date().getFullYear();
    } 
}