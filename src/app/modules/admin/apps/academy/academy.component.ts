import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';

@Component({
    selector       : 'academy',
    templateUrl    : './academy.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AcademyComponent
{
    /**
     * Constructor
     */
    constructor( private _authservice:AuthService,
        private route: ActivatedRoute)
    {
    }

    users_list:any=[]
    

    ngOnInit(): void
    {

      

        this.route.queryParams.subscribe(params => {
            if (params.email) {
              const email = params.email;
              this._authservice.setEmail(email);
              console.log('emmail from academy component ' , email)
            }
          });

        
    }

   

    
}
