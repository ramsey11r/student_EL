import { Component, Input, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';



@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent {
  @ViewChild('paymentNgForm') paymentNgForm: NgForm;
  

  constructor( private _authservice:AuthService,
    private route: ActivatedRoute , private _authService: AuthService, private router:Router,private _formBuilder: UntypedFormBuilder,)
{
}
@Input() 
list:any=[]
isSubmitted: boolean = false;
paymentForm: UntypedFormGroup;
Email: any = '';
cour:any
user:any


email_List
  ngOnInit():void{
  
    this._authService.getemailfooter().subscribe(data => {
      this.email_List = data;
      console.log("nnnhbks",this.email_List)
    })
  this._authservice.getEmail().then(email => {
    this.Email = email; // Assign the email value to the Email variable
    this.getsocial();

  this.route.queryParams.subscribe(params => {
    this.cour = params.courname;
    this.user = params.user;

    // Ensure that the form is initialized only after cour and user are set
    this.initializePaymentForm();
    
    console.log('courname from payment: ', this.cour);
    console.log('teacherEmail from payment: ', this.user);
    
  });
});
}

initializePaymentForm() {
  if (this.cour !== null && this.user !== null) {
    this.paymentForm = this._formBuilder.group({
      method_of_payment: new FormControl('', [Validators.required]),
      student_name: ['', [Validators.required ,Validators.pattern('[a-zA-Z" "]*')]],
      student_email: [this.Email],
      rib: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{16}$')]),
      cart_code: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{4}$')]),
      teatcher_email: [this.user], // Set teatcher_email here
      courname: [this.cour], // Set courname here
      expiration_year: ['', [Validators.required]],
      expiration_month: ['', [Validators.required]],
    });

    console.log('payment form: ', this.paymentForm);
    console.log('disable',this.paymentForm.disabled)
  }
}




 

  submit(form: FormGroup) {
    if (form.valid) {
      console.log(form.value);
    } else form.markAllAsTouched();
  }

  add_payment(): void {
    
    const val = this.paymentForm.value;
    console.log('paymentfrom : ', val); 

    this._authservice.addpayment(val).subscribe(response => {
      
    
       alert('Register Payment success ');
       const courname = val.courname; 
    this.SendCourNameToChapterPage(courname);
    });
  }


  SendCourNameToChapterPage(courname?: string) {
      this.router.navigate(['/apps/show_all_chapter'], { queryParams: { courname: courname } });
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
