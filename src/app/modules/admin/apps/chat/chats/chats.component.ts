import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Chat, Profile } from 'app/modules/admin/apps/chat/chat.types';
import { ChatService } from 'app/modules/admin/apps/chat/chat.service';
import { AuthService } from 'app/core/auth/auth.service';
import { Router } from '@angular/router';
import Pusher from 'pusher-js';
import { HttpClient } from '@angular/common/http';
@Component({
    selector       : 'chat-chats',
    templateUrl    : './chats.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatsComponent implements OnInit, OnDestroy
{
    PhotoUrl = "http://localhost:61860/photo";
    chats: Chat[];
    drawerComponent: 'profile' | 'new-chat';
    drawerOpened: boolean = false;
    filteredChats: Chat[];
    profile: Profile;
    selectedChat: Chat;
    users_list:any=[]
    name: string = '';
    userEmail: string = '';
    Teachers:any = [];
  
    message='';
    messages=[]
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _chatService: ChatService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _authservice:AuthService,
        private router: Router,
        private http:HttpClient
    )
    {
     
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
     ngOnInit():void
    {  
       
        this.ShowTeacherOfThisStudent();

        this.fetchUserEmail();
        this.showUserData();

       
        // Chats
        this._chatService.chats$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((chats: Chat[]) => {
                this.chats = this.filteredChats = chats;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Profile
        this._chatService.profile$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((profile: Profile) => {
                this.profile = profile;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Selected chat
        this._chatService.chat$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((chat: Chat) => {
                this.selectedChat = chat;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

            Pusher.logToConsole = true;

            const pusher = new Pusher('0c393b681dfba8a636d6', {
              cluster: 'eu'
            });
            
            const channel = pusher.subscribe('chat');
            channel.bind('messages', data => {
              this.messages.push(data);
              this._changeDetectorRef.detectChanges();
            });
    }

    submit(): void{

        this.http.post('http://localhost:61860/api/chat',{message:this.message}).subscribe(()=> this.message='');
        
    
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
        this._authservice.getusers().subscribe((data) => {
          // Log the fetched data for debugging purposes
          console.log('Fetched user data:', data);
      
          this.users_list = data.filter((us) => us.email === this.userEmail);
      
          if (this.users_list && this.users_list.length > 0) {
            const username = this.users_list[0].username;
            console.log('This is username: ', username);
            this.name = username;
            this._changeDetectorRef.detectChanges(); // is called to update the view, which will display the user's image and name without requiring a page refresh
          }
        });
      }

     
     
      
      ShowTeacherOfThisStudent(){

        this._authservice.getPayment().subscribe(data=>{
            const s = data.filter(c=>c.student_email===this.userEmail)
            const teacherEmails = [...new Set(s.map(item => item.teatcher_email))];
            console.log('Teacher Emails:', teacherEmails);
            
            teacherEmails.forEach(teacherEmails=>{   
        this._authservice.getusers().subscribe(d=>{


            const u = d.filter(us=>us.email===teacherEmails)
           this.Teachers.push(...u);
           
           this._changeDetectorRef.markForCheck();

        })
  })

        })

   console.log('Teacherssss:', this.Teachers);
   
           return this.Teachers;
      }
      isChatVisible = false;
      toggleChat() {
        this.isChatVisible = !this.isChatVisible;
      }
    
      
    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Filter the chats
     *
     * @param query
     */
    filterChats(query: string): void
    {
        // Reset the filter
        if ( !query )
        {
            this.filteredChats = this.chats;
            return;
        }

        this.filteredChats = this.chats.filter(chat => chat.contact.name.toLowerCase().includes(query.toLowerCase()));
    }
    
  
    
    /**
     * Open the new chat sidebar
     */
    openNewChat(): void
    {
        this.drawerComponent = 'new-chat';
        this.drawerOpened = true;

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }


    /**
     * Open the profile sidebar
     */
    openProfile(): void
    {
        this.drawerComponent = 'profile';
        this.drawerOpened = true;

        // Mark for check
        this._changeDetectorRef.markForCheck();
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

    

   


}