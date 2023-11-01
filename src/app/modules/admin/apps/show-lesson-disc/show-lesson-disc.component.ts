import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
import { add } from 'lodash';

@Component({
  selector: 'app-show-lesson-disc',
  templateUrl: './show-lesson-disc.component.html',
  styleUrls: ['./show-lesson-disc.component.scss']
})
export class ShowLessonDiscComponent {

  constructor(  private router:Router, private _authService: AuthService, private _router: Router ,   private _sanitizer: DomSanitizer ,  private route: ActivatedRoute)
  {
  
  }

  listlesson:any[];
  list:any[]
  email_List
  ngOnInit():void{
  
    this._authService.getemailfooter().subscribe(data => {
      this.email_List = data;
      console.log("nnnhbks",this.email_List)
    })
    this.getsocial()
    this.route.queryParams.subscribe(params => {
      const titles = params.titles;
      const discription = params.discription;
  
      console.log('ggg', titles);
  
      if (titles && discription) {
        this.lessonliste(titles,discription);
      }
    });
  }
  get currentYear(): number
  {
      return new Date().getFullYear();
  }
  lessonliste(titles: string , discription:string) {
    this._authService.getlistlesson().subscribe(data => {
      const filteredLesson = data.filter(lesson => lesson.titles === titles && lesson.discription===discription)[0];
  
      if (filteredLesson) {
        this.listlesson = [{
          ...filteredLesson,
          sanitizedContent: this._sanitizer.bypassSecurityTrustHtml(filteredLesson.content)
        }];
      } else {
          alert('No Content for this Lesson!')
          this._router.navigateByUrl('/apps/show_lessons')
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

