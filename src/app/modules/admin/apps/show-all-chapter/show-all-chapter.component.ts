import { DOCUMENT } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, ViewChild } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { AuthService } from 'app/core/auth/auth.service';
import { Subject, takeUntil } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-show-all-chapter',
  templateUrl: './show-all-chapter.component.html',
  styleUrls: ['./show-all-chapter.component.scss']
})
export class ShowAllChapterComponent {
  @ViewChild('drawer') drawer: MatDrawer;
  currentStep: number = 0;
  chapitre:any=[]
  f:any=[]
  list:any=[]
  drawerMode: 'over' | 'side' = 'side';
  drawerOpened: boolean = true;
  selectedPanel: string = 'chapitre 1 : Installation des prérequis';
  private _unsubscribeAll: Subject<any> = new Subject<any>();
coun:any;

  constructor( @Inject(DOCUMENT) private _document: Document,private _changeDetectorRef: ChangeDetectorRef, private _fuseMediaWatcherService: FuseMediaWatcherService,private _authService: AuthService , private router:Router , private route: ActivatedRoute ,  private _sanitizer: DomSanitizer){}


  ngOnInit(): void {

    this.getsocial()
    this.route.queryParams.subscribe(params => {
      const courname = params.courname;
      console.log('ggg', courname);
  
      if (courname) {
        this.chapitre_show(courname);
        this.showCourseDescription(courname) 
      }
    });


        // Subscribe to media changes
        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({matchingAliases}) => {

                // Set the drawerMode and drawerOpened
                if ( matchingAliases.includes('lg') )
                {
                    this.drawerMode = 'side';
                    this.drawerOpened = true;
                }
                else
                {
                    this.drawerMode = 'over';
                    this.drawerOpened = false;
                }

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
           
          }
  
// -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Scrolls the current step element from
     * sidenav into the view. This only happens when
     * previous/next buttons pressed as we don't want
     * to change the scroll position of the sidebar
     * when the user actually clicks around the sidebar.
     *
     * @private
     */
    private _scrollCurrentStepElementIntoView(): void
    {
        // Wrap everything into setTimeout so we can make sure that the 'current-step' class points to correct element
        setTimeout(() => {

            // Get the current step element and scroll it into view
            const currentStepElement = this._document.getElementsByClassName('current-step')[0];
            if ( currentStepElement )
            {
                currentStepElement.scrollIntoView({
                    behavior: 'smooth',
                    block   : 'start'
                });
            }
        });
    }
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
   
   /**
     * Go to given step
     *
     * @param step
     */


  


  goToPanel(panel: string): void
  {
      this.selectedPanel = panel;

      // Close the drawer on 'over' mode
      if ( this.drawerMode === 'over' )
        {
            this.drawer.close();
        }
  }
  get currentYear(): number
  {
      return new Date().getFullYear();
  }

  /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
  trackByFn(index: number, item: any): any
  {
      return item.id || index;
  }
  chapitre_show(course: string): void {
    this._authService.get_ChapterByCourName(course).subscribe(data => {
      const filteredData = data.filter(chapitre => chapitre.courname === course );
  
      if (filteredData.length > 0) {
        this.chapitre = filteredData.map(chapitre => ({
          ...chapitre,
          sanitizedDiscription: this._sanitizer.bypassSecurityTrustHtml(chapitre.discription)
        }));
      } else {
        alert("No Chapters For This course");
        this.router.navigateByUrl('/apps/home');
      }
    });
  }
  showCourseDescription(course: string) {
    this._authService.get_cours().subscribe(data => {
    this.f = data.filter(c => c.courname === course);
  
    
     
        console.log("discription:", this.f);
      
    });
  }
  
  selectedTitle: string = '';
  selectedDiscription: string = '';


  isChecked: boolean[] = Array(this.chapitre.length).fill(false);
   sshowDescription: boolean = false;
 
   toggleDivCheck(index: number) {
    this.isChecked[index] = !this.isChecked[index];
  
    // Toggle the current step
    if (this.isChecked[index]) {
      this.currentStep = index;
    } else {
      // If unchecking an item, set the current step to the previous checked item's step
      const checkedIndex = this.isChecked.lastIndexOf(true);
      this.currentStep = checkedIndex >= 0 ? checkedIndex : 0;
    }
  }
  

  showDescription(title: string): void {
    // Find the chapter with the clicked title
   
    const chapter = this.chapitre.find(chap => chap.title === title);

    if (chapter) {
      // Set the selected title and description
      this.selectedTitle = chapter.title;
      this.selectedDiscription = chapter.discription;
    } else {
      // Handle the case when the title is not found
      this.selectedTitle = 'Title Not Found';
      this.selectedDiscription = 'Description not available.';
    }
  }



  show_lessonsName(title: string, course: string) {
    this.router.navigate(['/apps/show_lessons'], {
      queryParams: {
        title: title,
        course: course
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