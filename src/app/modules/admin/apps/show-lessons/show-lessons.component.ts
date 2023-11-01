import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';

@Component({
  selector: 'app-show-lessons',
  templateUrl: './show-lessons.component.html',
  styleUrls: ['./show-lessons.component.scss']
})
export class ShowLessonsComponent {
  lesson:any=[]
list:any=[]
  constructor( private _authService: AuthService , private router:Router , private route: ActivatedRoute){}
  email_List
  ngOnInit():void{
  
    this._authService.getemailfooter().subscribe(data => {
      this.email_List = data;
      console.log("nnnhbks",this.email_List)
    })
    this.getsocial()
    this.route.queryParams.subscribe(params => {
      const title = params.title;
      const course = params.course;
  
      console.log('this is title: ', title);
      console.log('this is course: ', course);
  
      if (title && course) {
        this.lessonTitle_show(title, course);
      }
    });
  }
  
  lessonTitle_show(title: string, course: string): void {
    const concatenatedValue = title + course;
    console.log('concatenated data:', concatenatedValue);
    this._authService.getlistlesson().subscribe(data => {
      const filteredData = data.filter(lesson => lesson.chapters === concatenatedValue);
      this.lesson = filteredData;
      console.log(filteredData);
      if (filteredData.length === 0) {
        alert("No Lessons For This Chapter");
        this.router.navigateByUrl('/apps/home');
      }
    });
  }
  get currentYear(): number
  {
      return new Date().getFullYear();
  }
  show_lessonsContent(titles: string , discription :string) {
    this.router.navigate(['/apps/showLessonDisc'], {
      queryParams: {
        titles: titles,
        discription:discription
        
      }
    });
  }

 

  show_exerciceName(chapters:string){

    this.router.navigate(['/apps/show-exercice'], {
      queryParams: {
        chapters: chapters
        
      }
    });

  }

  getsocial(){
    this._authService.get_social().subscribe(data=>{
      this.list=data;
      console.log('xccxc',data)})
  }
  contact(){
    this.router.navigate(['/apps/contact'])
  }
  partner(){
    this.router.navigate(['/apps/partners'])
  }
  meet(){
    this.router.navigate(['/apps/metting'])
  }
  about(){
    this.router.navigate(['/apps/about'])
  }
  profil(){
    this.router.navigate(['/apps/profil'])
  }
 
  
  
  
}
