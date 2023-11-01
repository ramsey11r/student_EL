import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';

@Component({
  selector: 'app-show-exercice',
  templateUrl: './show-exercice.component.html',
  styleUrls: ['./show-exercice.component.scss']
})
export class ShowExerciceComponent {
  @ViewChild('answerInput', { static: false }) answerInput!: ElementRef<HTMLInputElement>;
  
  exercice:any=[]
  Email:any
 
  answer:string;
  pageSize = 1;
  currentPage = 1;

  constructor( private _authService: AuthService,private router:Router, private formBuilder: UntypedFormBuilder, private _router: Router ,private _sanitizer: DomSanitizer,  private route: ActivatedRoute)
  {
  
  }

  ngOnInit(): void {
    

    this._authService.getEmail().then(email => {
      this.Email = email; // Assign the email value to the Email variable
  
   console.log('email from exercice : ',this.Email)
  
   

    this.route.queryParams.subscribe(params => {
      const chapters = params.chapters;
     
  
      console.log('this is chapters: ', chapters);

      if (chapters) {
        this.exercice_show(chapters);
      }
     
  
     
    });
  });
 
  }


 

  get displayedTests(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
  
    return this.exercice.slice(startIndex, endIndex);
  
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage():void{
    if(this.currentPage<this.exercice.length){
      this.currentPage++;
    }
   
  }

  


  exercice_show(chaptercourName: string): void {
    const displayedQuestions = new Set<string>(); 
  
    this._authService.get_exerciceChapterCourName(chaptercourName).subscribe(data => {
      // Filter exercises for the student's email
      const emailFilteredExercises = data.filter(ex => ex.chapters === chaptercourName && (ex.email_etudiant === this.Email || ex.email_etudiant != this.Email));
  
      // Filter exercises where email_etudiant is empty

      const emptyEmailExercises = data.filter(ex => ex.email_etudiant !== this.Email);

      // Concatenate the two arrays
      const filteredData = emailFilteredExercises.concat(emptyEmailExercises);

    
      filteredData.forEach(item => {
        if (item.emailetudiant !== this.Email) {
          console.log(item);
        }
      });



     
      // Further filter exercises to show only unique questions
      const uniqueQuestions = filteredData.filter(exercise => {
        const question = exercise.question;
        if (!displayedQuestions.has(question)) {
          displayedQuestions.add(question); // Add the question to the Set
          return true; // Display the question
        }
        return false; // Skip duplicates
      });
  
      if (uniqueQuestions.length > 0) {
        this.exercice = uniqueQuestions.map(exercice => ({
          ...exercice,
          sanitizedDiscription: this._sanitizer.bypassSecurityTrustHtml(exercice.discription)
        }));
      } else {
        alert("No exercice For This chapter");
        window.history.back();
      }
    });
  }
  
  
  add_answer(question: string, newAnswer: string) {
    const email_etudiant = this.Email;
  
   
    this._authService.getexercice().subscribe(r => {
 
      const existingExercise = r.filter(ex => ex.question === question && ex.email_etudiant === this.Email);
      console.log(existingExercise)
  
      if (existingExercise.length>0) {
      
        alert('This question is already answered!');
      } else {
     
        const existingExercises = r.find(ex => ex.question === question);
        console.log(existingExercises)
        const newEntry = {
          ...existingExercises,
          email_etudiant,
          answer: newAnswer,
        };
  
    
        this._authService.addanswer(newEntry).subscribe(
          res => {
            alert('New answer added successfully');
            this.nextPage();
          },
        );
      }
    });
  }
  
  
  
  
  
  


}