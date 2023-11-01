import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, SimpleChanges, TemplateRef, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { MatButton } from '@angular/material/button';
import { Observable, Subject, forkJoin, map, takeUntil } from 'rxjs';
import { Notification } from 'app/layout/common/notifications/notifications.types';
import { NotificationsService } from 'app/layout/common/notifications/notifications.service';
import { AuthService } from 'app/core/auth/auth.service';

@Component({
    selector       : 'notifications',
    templateUrl    : './notifications.component.html',
    encapsulation  : ViewEncapsulation.None,
  
    changeDetection: ChangeDetectionStrategy.Default,
    exportAs       : 'notifications'
})
export class NotificationsComponent implements OnInit
{
    @ViewChild('notificationsOrigin') private _notificationsOrigin: MatButton;
    @ViewChild('notificationsPanel') private _notificationsPanel: TemplateRef<any>;

    notifications: Notification[];
    unreadCount: number = 0;
    private _overlayRef: OverlayRef;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    reunion_list:any=[];
    reunion_list$: any=[];
    pay_list:any=[];
    reu_len:any;
   
  Email: any;
 
 
  

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _notificationsService: NotificationsService,
        private _overlay: Overlay,
        private _viewContainerRef: ViewContainerRef,
        private _authService: AuthService,
        
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {

      
        
       
       
      
        this.reunion_list$ = this.reunion_Show();
        
        

        this._authService.getEmail().then(email => {
            this.Email = email;
            console.log('email from notification : ',this.Email)

        
         

        // Subscribe to notification changes
        this._notificationsService.notifications$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((notifications: Notification[]) => {

                // Load the notifications
                this.notifications = notifications;

               

                // Mark for check
                this._changeDetectorRef.markForCheck();
               
            });

        }); 
         


    }
  
   
     


  

   
    openPanel(): void
    {
        // Return if the notifications panel or its origin is not defined
        if ( !this._notificationsPanel || !this._notificationsOrigin )
        {
            return;
        }

        // Create the overlay if it doesn't exist
        if ( !this._overlayRef )
        {
            this._createOverlay();
        }

        // Attach the portal to the overlay
        this._overlayRef.attach(new TemplatePortal(this._notificationsPanel, this._viewContainerRef));
    }

    async fetchUserEmail(): Promise<void> {
        try {
          // Fetch the user email from your service
          const email = await this._authService.getEmail();
          this.Email = email;
          console.log('Email fetched:', this.Email);
        } catch (error) {
          console.error('Error fetching email:', error);
        }
      }

    
    ngAfterViewInit(): void {
        this.reunion_Show() 
        this.fetchUserEmail();
        }

      

        currentDate = new Date();
        reunion_Show() {
            return forkJoin([
              this._authService.getPayment(),
              this._authService.get_reunion()
            ]).pipe(
              map(([paymentData, reunionData]) => {
                this.pay_list = paymentData.filter(payment => payment.student_email === this.Email);
                
                const currentDate = new Date();
                
                this.reunion_list = reunionData.filter(reunion => {
                
                  const reunionDate = new Date(reunion.date);
                  return this.pay_list.some(payment => 
                    payment.couname === reunion.cour_name && reunionDate >= currentDate
                  );
                });
          
                console.log('Filtered reunion_list: ', this.reunion_list);
          
                return this.reunion_list;
              })
            );
          }



    /**
     * Close the notifications panel
     */
    closePanel(): void
    {
        this._overlayRef.detach();
    }

    /**
     * Mark all notifications as read
     */
    markAllAsRead(): void
    {
        // Mark all as read
        this._notificationsService.markAllAsRead().subscribe();
    }

    /**
     * Toggle read status of the given notification
     */
    toggleRead(notification: Notification): void
    {
        // Toggle the read status
        notification.read = !notification.read;

        // Update the notification
        this._notificationsService.update(notification.id, notification).subscribe();
    }


delete(containerToDelete: any) {
    
    // Find the index of the container to delete
    const index = this.reunion_list.indexOf(containerToDelete);
  
    // Check if the container exists in the array
    if (index !== -1) {
      // Remove the container from the array
      this.reunion_list.splice(index, 1);
    }
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

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create the overlay
     */
    private _createOverlay(): void
    {
        // Create the overlay
        this._overlayRef = this._overlay.create({
            hasBackdrop     : true,
            backdropClass   : 'fuse-backdrop-on-mobile',
            scrollStrategy  : this._overlay.scrollStrategies.block(),
            positionStrategy: this._overlay.position()
                                  .flexibleConnectedTo(this._notificationsOrigin._elementRef.nativeElement)
                                  .withLockedPosition(true)
                                  .withPush(true)
                                  .withPositions([
                                      {
                                          originX : 'start',
                                          originY : 'bottom',
                                          overlayX: 'start',
                                          overlayY: 'top'
                                      },
                                      {
                                          originX : 'start',
                                          originY : 'top',
                                          overlayX: 'start',
                                          overlayY: 'bottom'
                                      },
                                      {
                                          originX : 'end',
                                          originY : 'bottom',
                                          overlayX: 'end',
                                          overlayY: 'top'
                                      },
                                      {
                                          originX : 'end',
                                          originY : 'top',
                                          overlayX: 'end',
                                          overlayY: 'bottom'
                                      }
                                  ])
        });

        // Detach the overlay from the portal on backdrop click
        this._overlayRef.backdropClick().subscribe(() => {
            this._overlayRef.detach();
        });
    }

   
}