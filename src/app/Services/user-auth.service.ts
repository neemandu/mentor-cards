import { EventEmitter, Injectable, NgZone, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';
import { APIService, CreateUserInput } from '../API.service';
import { SubscriptionPlan } from '../Objects/subscriptionPlans';
import { CardsService } from './cards.service';
import { CognitoUserInterface } from '@aws-amplify/ui-components';
import { GroupData, UserData } from '../Objects/user-related';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  @Output() loggedInEmmiter: EventEmitter<UserData> = new EventEmitter<UserData>();
  @Output() groupDataEmmiter: EventEmitter<GroupData> = new EventEmitter<GroupData>();
  @Output() showSignInModalEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() signedOutEmmiter: EventEmitter<any> = new EventEmitter<any>();

  loggedInAttributes: any;
  subPlans: SubscriptionPlan[];
  userData: UserData;
  // userData: any;
  groupData: GroupData;

  constructor(public _snackBar: MatSnackBar, public router: Router, private ngZone: NgZone, private api: APIService, private cardsService: CardsService, private http: HttpClient) {
  }

  /**
   * Preform sign up process
   * @param newUser - new user data (name, lname, username (email), password)
   */
  // signUp(username: string, email: string): Promise<any> {
  //   var session = Auth.currentSession();
  //   var user: CreateUserInput = { 'username': username, 'email': email };
  //   user.username = username;
  //   user.email = email;
  //   return this.api.CreateUser(user);
  // }

  /**
   * Preform log in using User data
   * @param user - all user data to log in 
   */
  logIn(user): Promise<any> {
    return Auth.signIn(user);
  }

  /**
   * After succesful log in, save cookies and let all components know we logged in 
   * @param userData - data returned from the BE for the user (tokens etc')
   */
  loggedIn(cognitoUserserData: CognitoUserInterface) {
    // console.log("file: user-auth.service.ts ~ line 56 ~ loggedIn ~ userData", cognitoUserserData)
    // debugger
    this.loggedInAttributes = cognitoUserserData
    var newUsername: string = cognitoUserserData.username;
    var newUserEmail: string = cognitoUserserData.attributes['email'];
    var user: CreateUserInput = { 'username': newUsername, 'email': newUserEmail };
    this.api.CreateUser(user).then(value => {
      console.log("🚀 ~ file: user-auth.service.ts ~ line 54 ~ UserAuthService ~ this.api.CreateUser ~ value", value)
    }, reject => {
      console.log("🚀 ~ file: user-auth.service.ts ~ line 73 ~ UserAuthService ~ this.api.CreateUser ~ reject", reject)
    });
    this.updateUserData();
    this.getSubscriptionPlans();
    this._snackBar.open('התחברות מוצלחת! ברוך הבא ' + this.userData.id, '', {
      duration: 5000,
      panelClass: ['rtl-snackbar']
    });
  }

  /**
   * Get all data from BE about user
   */
  updateUserData(): void {
    // console.log(this.loggedInAttributes);
    // if(!this.loggedInAttributes == null && !this.loggedInAttributes.Session == null){
    if(this.loggedInAttributes != null){
      this.api.GetUser(this.loggedInAttributes.username).then(data => {
        // this.userData = data;
        this.userData = new UserData().deseralize(data);
        // console.log("file: user-auth.service.ts ~ line 73 ~ this.api.GetUser ~ this.userData", this.userData)
        if (this.userData.groupId)
          this.updateGroupData();
        this.loggedInEmmiter.emit(this.userData);//TODO check why doesn't move to other page after login
        this.userData.status === 'NOPLAN' ? this.ngZone.run(() => this.router.navigate(['/no-program-page'])) : this.ngZone.run(() => this.router.navigate(['/all-packs-page']))
      }, reject => {
        console.log("🚀 ~ file: user-auth.service.ts ~ line 86 ~ UserAuthService ~ this.api.GetUser ~ reject", reject)
      })
    }
  }

  /**
   * Get all data about current group
   */
  updateGroupData(): void {
    this.api.GetGroup(this.userData.groupId).then(data => {
      this.groupData = new GroupData().deseralize(data);
      this.groupDataEmmiter.emit(this.groupData);
      // console.log("file: user-auth.service.ts ~ line 89 ~ this.api.GetGroup ~ this.groupData", this.groupData)
    }, reject => {
      console.log("file: user-auth.service.ts ~ line 103 ~ this.api.GetGroup ~ reject", reject)
    })
  }

  /**
   * Get all subscription plans
   */
  getSubscriptionPlans(): void {
    if(!this.loggedInAttributes == null && !this.loggedInAttributes.Session == null){
      this.api.ListSubscriptionPlans().then(value => {
        this.subPlans = value.items.map(plan => new SubscriptionPlan().deseralize(plan))
        // console.log("🚀 ~ file: user-auth.service.ts ~ line 54 ~ UserAuthService ~ this.api.ListSubscriptionPlans ~ this.subPlans", this.subPlans)
      }, reject => {
        // console.log("🚀 ~ file: user-auth.service.ts ~ line 79 ~ UserAuthService ~ this.api.ListSubscriptionPlans ~ reject", reject)
        let snackBarRef = this.cardsService._snackBar.open('שגיאה במשיכת חבילות, נסו שנית', 'רענן', {
          duration: 20000,
        });
        snackBarRef.onAction().subscribe(() => {
          window.location.reload();
        });
      });
    }
  }

  /**
   * Return if user is logged in
   */
  // isLoggedIn(): boolean {
  //   return this.userData != undefined;
  // }

  /**
   * Check username (email) and send varification email with code
   * @param user - username (email) to reset password for
   */
  forgotPasswordVarifyEmail(user): Promise<any> {
    return Auth.forgotPassword(user)
  }

  /**
   * After receiving email with verification code, create a new password
   * @param user - username (email)
   * @param confirmationCode - code received via email
   * @param newPassword 
   */
  forgotPasswordReset(user, confirmationCode, newPassword): Promise<any> {
    return Auth.forgotPasswordSubmit(user, confirmationCode, newPassword);
  }

  logOut(): void {
    Auth.signOut().then(data => {
      this.loggedOut();
      this._snackBar.open('להתראות, ועד הפעם הבאה!', '', {
        duration: 5000,
        panelClass: ['rtl-snackbar']
      });
    })
      .catch(err => console.log(err));
    // return Auth.signOut();
  }

  loggedOut(): void {
    this.userData = undefined;
    this.signedOutEmmiter.emit(true);
    // this.router.navigate(['no-program-page']);
  }

  showSignInModal(): void {
    this.showSignInModalEmitter.emit(true);
  }

  cancelPayPalSubscription(): Observable<any> {
    // debugger
    // var paypalId = JSON.parse(localStorage.getItem('__paypal_storage__'))['id'];
    const headerDict = {
      'Content-Type': 'application/json',
      'Authorization': 'Basic AajKId4yhuxUIoiCACPOR1khrbbj_to72pJXnALF1AKkF8KgvCy5cS1XOzeMdTW_ZLOUCULxQRvdCi:ELehBqsZxxwGCYltNs46T7pLns-GajPfbJngCF0vtnrxFCzQZX0Vzh9m5SLGqYF1mzbTyYxJtkxoYwun',
      // 'Access-Control-Allow-Origin': '*',
    }
    var reason = { 'reason': 'Just because' }
    // https://api-m.paypal.com/v1/billing/subscriptions/I-SMT78NK37030/cancel
    return this.http.post<any>('https://api-m.paypal.com/v1/billing/subscriptions/' + this.userData.subscription.providerTransactionId + '/cancel', reason, { headers: headerDict });
  }

}
