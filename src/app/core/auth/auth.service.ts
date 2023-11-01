import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { UserService } from 'app/core/user/user.service';

@Injectable()
export class AuthService
{
    readonly APIUrl="http://localhost:61860/api";
    readonly PhotoUrl = "http://localhost:61860/photo/";
    readonly PhotoUrll = "http://localhost:61860/photo";
    private _authenticated: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _userService: UserService
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for access token
     */
    set accessToken(token: string)
    {
        localStorage.setItem('accessToken', token);
    }

    get accessToken(): string
    {
        return localStorage.getItem('accessToken') ?? '';
    }
    getlistusers():Observable<any[]>{
        return this._httpClient.get<any>(this.APIUrl+'/users')
      }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    uplodephoto(val:any){
        return this._httpClient.post(this.APIUrl+'/users/SaveFile',val)
    }
    
    updateuser(val:any){
        return this._httpClient.put(this.APIUrl+'/users',val)
      
      }
    /**
     * Forgot password
     *
     * @param email
     */
    forgotPassword(email: string): Observable<any>
    {
        return this._httpClient.post('api/auth/forgot-password', email);
    }

    /**
     * Reset password
     *
     * @param password
     */
    resetPassword(password: string): Observable<any>
    {
        return this._httpClient.post('api/auth/reset-password', password);
    }
   

    /**
     * Sign in
     *
     * @param credentials
     */
    signIn(credentials: { email: string; password: string }): Observable<any>
    {
        // Throw error, if the user is already logged in
        if ( this._authenticated )
        {
            return throwError('User is already logged in.');
        }

        return this._httpClient.post('api/auth/sign-in', credentials).pipe(
            switchMap((response: any) => {

                // Store the access token in the local storage
                this.accessToken = response.accessToken;

                // Set the authenticated flag to true
                this._authenticated = true;

                // Store the user on the user service
                this._userService.user = response.user;

                // Return a new observable with the response
                return of(response);
            })
        );
    }

    /**
     * Sign in using the access token
     */
    signInUsingToken(): Observable<any>
    {
        // Sign in using the token
        return this._httpClient.post('api/auth/sign-in-with-token', {
            accessToken: this.accessToken
        }).pipe(
            catchError(() =>

                // Return false
                of(false)
            ),
            switchMap((response: any) => {

                // Replace the access token with the new one if it's available on
                // the response object.
                //
                // This is an added optional step for better security. Once you sign
                // in using the token, you should generate a new one on the server
                // side and attach it to the response object. Then the following
                // piece of code can replace the token with the refreshed one.
                if ( response.accessToken )
                {
                    this.accessToken = response.accessToken;
                }

                // Set the authenticated flag to true
                this._authenticated = true;

                // Store the user on the user service
                this._userService.user = response.user;

                // Return true
                return of(true);
            })
        );
    }

    /**
     * Sign out
     */
    signOut(): Observable<any>
    {
        // Remove the access token from the local storage
        localStorage.removeItem('accessToken');

        // Set the authenticated flag to false
        this._authenticated = false;

        // Return the observable
        return of(true);
    }

    /**
     * Sign up
     *
     * @param user
     */
    signUp(user: { name: string; email: string; password: string; company: string }): Observable<any>
    {
        return this._httpClient.post('api/auth/sign-up', user);
    }

    /**
     * Unlock session
     *
     * @param credentials
     */
    unlockSession(credentials: { email: string; password: string }): Observable<any>
    {
        return this._httpClient.post('api/auth/unlock-session', credentials);
    }

    /**
     * Check the authentication status
     */
    check(): Observable<boolean>
    {
        // Check if the user is logged in
        if ( this._authenticated )
        {
            return of(true);
        }

        // Check the access token availability
        if ( !this.accessToken )
        {
            return of(false);
        }

        // Check the access token expire date
        if ( AuthUtils.isTokenExpired(this.accessToken) )
        {
            return of(false);
        }

        // If the access token exists and it didn't expire, sign in using it
        return this.signInUsingToken();
    }


    // get cours
    get_cours():Observable<any[]>{
        return this._httpClient.get<any>(this.APIUrl+'/add_cour')
    }
    getappname():Observable<any[]>{
        return this._httpClient.get<any>(this.APIUrl+'/appname')
    }
    getlogo():Observable<any[]>{
        return this._httpClient.get<any>(this.APIUrl+'/logo')
    }
    getcourname():Observable<any[]>{
        
        return this._httpClient.get<any>(this.APIUrl+'/showcourname')
      }
      getanswer():Observable<any[]>{
        
        return this._httpClient.get<any>(this.APIUrl+'/contact')
      }
      get_social():Observable<any[]>{
        
        return this._httpClient.get<any>(this.APIUrl+'/social')
      }
      getemailfooter():Observable<any[]>{
        return this._httpClient.get<any>(this.APIUrl+'/email')
    }
      getcournameee(courname:string):Observable<any[]>{
        const params = new HttpParams().set('courname', courname);
        
        return this._httpClient.get<any>(this.APIUrl+'/showcourname')
      }

      getlistchapitre():Observable<any[]>{
        return this._httpClient.get<any>(this.APIUrl+'/add_chapitre')
      }


      get_ChapterByCourName(course: string): Observable<any[]> {
        const params = new HttpParams().set('course', course);
        return this._httpClient.get<any[]>(`${this.APIUrl}/ChapterByCours`, { params });
      }


    get_reunion():Observable<any[]>{
        return this._httpClient.get<any>(this.APIUrl+'/reunion')
    }

      getlistlesson():Observable<any[]>{
        return this._httpClient.get<any>(this.APIUrl+'/add_lesson')
      }

      getTest():Observable<any[]>{
        return this._httpClient.get<any>(this.APIUrl+'/test')
    }

    get_TestByCourName(test_course: string): Observable<any[]> {
        const params = new HttpParams().set('test_course', test_course);
        return this._httpClient.get<any[]>(`${this.APIUrl}/ShowTestDataByCourname`, { params });
      }

     

      get_exerciceChapterCourName(chaptercourName: string): Observable<any[]> {
        const params = new HttpParams().set('chaptercourName', chaptercourName);
        return this._httpClient.get<any[]>(`${this.APIUrl}/showchaptesNamewithlesson`, { params });
      }


      updateAnswer(val: any) {
        return this._httpClient.put(this.APIUrl + '/exercice/put_answer', val);
      }

      addpayment(val:any){
        return this._httpClient.post(this.APIUrl + '/payment', val);

      }
      addcontact(val:any){
        return this._httpClient.post(this.APIUrl + '/contact', val);

      }

      getPayment():Observable<any[]>{
        return this._httpClient.get<any>(this.APIUrl+'/payment')
    }
    getcertif():Observable<any[]>{
        return this._httpClient.get<any>(this.APIUrl+'/certif')
    }
    addcertif(val:any){
        return this._httpClient.post(this.APIUrl + '/certif', val);

      }
      addpdf(val:any){
        return this._httpClient.post(this.APIUrl + '/pdf', val);

      }
        // Get the email 

        

        userEmailKey = 'userEmail'; // Define a key for localStorage

        setEmail(email: string): void {
              sessionStorage.setItem(this.userEmailKey, email); // Store email in localStorage
          }
      
           getEmail(): Promise<string> {
            localStorage.clear()
              return new Promise<string>((resolve) => {
                      const email = sessionStorage.getItem(this.userEmailKey); // Retrieve email from localStorage
                      resolve(email);
                  
              });
          }

       getusers():Observable<any[]>{
        return this._httpClient.get<any>(this.APIUrl+'/users')
    }
      
    get_meet():Observable<any[]>{
        return this._httpClient.get<any>(this.APIUrl+'/meet')
    }
    getexercice():Observable<any[]>{
        return this._httpClient.get<any>(this.APIUrl+'/exercice')
    } 

    addanswer(val:any){
        return this._httpClient.post(this.APIUrl + '/putanswer', val);

      }

      
    

    get_about():Observable<any[]>{
        return this._httpClient.get<any>(this.APIUrl+'/about')
    } 
    get_partners():Observable<any[]>{
        return this._httpClient.get<any>(this.APIUrl+'/partners')
    } 
   
  
}
