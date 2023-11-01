import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { FuseNavigationService, FuseVerticalNavigationComponent } from '@fuse/components/navigation';
import { Navigation } from 'app/core/navigation/navigation.types';
import { NavigationService } from 'app/core/navigation/navigation.service';
import { User } from 'app/core/user/user.types';
import { UserService } from 'app/core/user/user.service';
import { AuthService } from 'app/core/auth/auth.service';

@Component({
    selector     : 'classy-layout',
    templateUrl  : './classy.component.html',
    encapsulation: ViewEncapsulation.None
})
export class ClassyLayoutComponent implements OnInit
{ 
  PhotoUrl = "http://localhost:61860/photo/";
    isScreenSmall: boolean;
    navigation: Navigation;
    user: User;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    users_list:any=[];
    userEmail: string = '';
    name: string = '';
    

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
        private _navigationService: NavigationService,
        private _userService: UserService,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private _fuseNavigationService: FuseNavigationService,
        private _authservice:AuthService,
       
        private cdr: ChangeDetectorRef
       
    )
    {
    

        
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for current year
     */
    get currentYear(): number
    {
        return new Date().getFullYear();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
   
    logo_List

    listapp:any=[]

    ngOnInit():void{
    
    
     
            this._authservice.getappname().subscribe(res=>{
                this.listapp=res})

    this._authservice.getlogo().subscribe(data => {
      this.logo_List = data;
      console.log("nnnhbks",this.logo_List)
    })
       
       
      
        // Subscribe to navigation data
        this._navigationService.navigation$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((navigation: Navigation) => {
                this.navigation = navigation;
            });

        // Subscribe to the user service
        this._userService.user$
            .pipe((takeUntil(this._unsubscribeAll)))
            .subscribe((user: User) => {
                this.user = user;
            });

        // Subscribe to media changes
        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({matchingAliases}) => {

                // Check if the screen is small
                this.isScreenSmall = !matchingAliases.includes('md');
            });
          
        
           
    }

    /**
     * On destroy
     */
 
  
   


    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle navigation
     *
     * @param name
     */
    toggleNavigation(name: string): void
    {
        // Get the navigation
        const navigation = this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>(name);

        if ( navigation )
        {
            // Toggle the opened status
            navigation.toggle();
        }
    }
    ngAfterViewInit(): void {
        this.fetchUserEmail(); // Move the email fetching logic here
        this.showUserData();
      }
    
  
      async fetchUserEmail(): Promise<void> {
        try {
          // Fetch the user email from your service
          const email = await this._authservice.getEmail();
          this.userEmail = email;
          console.log('Email fetched:', this.userEmail);
        } catch (error) {
          console.error('Error fetching email:', error);
        }
      }
      
  
        
      
         showUserData() {
        //   // Fetch the user data from your service
          this._authservice.getusers().subscribe((data) => {
            this.users_list = data.filter((us) => us.email === this.userEmail);
            console.log('Filtered from classy: ', this.users_list);
      
            if (this.users_list && this.users_list.length > 0) {
             const username = this.users_list[0].username;
             console.log('This is username: ', username);
      
             this.name = username;
             
           }
         });
        }
    
    
    
    
    
    
}