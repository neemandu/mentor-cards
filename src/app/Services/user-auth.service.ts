import { EventEmitter, Injectable, NgZone, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';
import { APIService, CreateUserInput } from '../API.service';
import { SubscriptionPlan } from '../Objects/subscriptionPlans';
import { CognitoUserInterface } from '@aws-amplify/ui-components';
import { GroupData, UserData } from '../Objects/user-related';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
const millisecondsInMonth: number = 2505600000;
const millisecondsInDay: number = 86400000;


@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  @Output() loggedInEmmiter: EventEmitter<UserData> = new EventEmitter<UserData>();
  @Output() groupDataEmmiter: EventEmitter<GroupData> = new EventEmitter<GroupData>();
  @Output() showSignInModalEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() signedOutEmmiter: EventEmitter<any> = new EventEmitter<any>();
  @Output() subPlansEmmiter: EventEmitter<any> = new EventEmitter<any>();

  loggedInAttributes: any;
  subPlans: SubscriptionPlan[];
  userData: UserData;
  // userData: any;
  groupData: GroupData;

  constructor(public _snackBar: MatSnackBar, public router: Router, private ngZone: NgZone, private api: APIService, private http: HttpClient) {
    this.getSubscriptionPlans();
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
    this.loggedInAttributes = cognitoUserserData;
    var newUsername: string = cognitoUserserData.username;
    var newUserEmail: string = cognitoUserserData.attributes['email'];
    var user: CreateUserInput = { 'username': newUsername, 'email': newUserEmail };
    this.api.CreateUser(user).then(value => {
      // console.log("🚀 ~ file: user-auth.service.ts ~ line 54 ~ UserAuthService ~ this.api.CreateUser ~ value", value)
      this.updateUserData();
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
    if (this.loggedInAttributes != null) {
      this.api.GetUser(this.loggedInAttributes.username).then(data => {
        if (!data)
          return;
        this.userData = new UserData().deseralize(data);
        console.log("file: user-auth.service.ts ~ line 73 ~ this.api.GetUser ~ this.userData", this.userData)
        if (this.userData.groupId)
          this.updateGroupData();
        this.loggedInEmmiter.emit(this.userData);
        (this.userData.status === 'PLAN' || this.trialMonthExpDate || this.codeCouponExpDate) ? this.ngZone.run(() => this.router.navigate(['/all-packs-page'])) : this.ngZone.run(() => this.router.navigate(['/no-program-page']))
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
    if (!this.subPlans) {
      this.api.ListSubscriptionPlans().then(value => {
        this.subPlans = value.items.map(plan => new SubscriptionPlan().deseralize(plan))
        this.subPlans.sort((planA, planB) => {
          if (planA.numberOfUsers - planB.numberOfUsers > 0)
            return 1;
          if (planA.numberOfUsers - planB.numberOfUsers < 0)
            return -1;
          if (planA.numberOfCardPacks - planB.numberOfCardPacks > 0)
            return 1;
          else
            return -1;
        })
        this.subPlansEmmiter.emit();
        // console.log("🚀 ~ file: user-auth.service.ts ~ line 54 ~ UserAuthService ~ this.api.ListSubscriptionPlans ~ this.subPlans", this.subPlans)
      }, reject => {
        console.log("🚀 ~ file: user-auth.service.ts ~ line 79 ~ UserAuthService ~ this.api.ListSubscriptionPlans ~ reject", reject)
        let snackBarRef = this._snackBar.open('שגיאה במשיכת חבילות, נסו שנית', 'רענן', {
          duration: 20000,
          panelClass: ['rtl-snackbar']
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

  /**
   * return if in trial month (first month after register)
   */
  get trialMonthExpDate(): Date {
    return this.userData.createdAt.getTime() + millisecondsInMonth >= new Date().getTime() ? new Date(this.userData.createdAt.getTime() + millisecondsInMonth) : null;
  }

  /**
   * return if in trial month (first month after register)
   */
  get codeCouponExpDate(): Date {
    // return this.userData.createdAt.getTime() + millisecondsInMonth >= new Date().getTime();
    return this.userData.couponCode ? new Date(this.userData.couponCode.createdAt.getTime() + millisecondsInDay * this.userData.couponCode.trialPeriodInDays) : null;
    // return this.userData.firstProgramRegistrationDate.getTime() + millisecondsInMonth >= new Date().getTime();
  }

  /**
   * Returns actual exp date
   */
  get expDate() {
    return (this.codeCouponExpDate ? this.codeCouponExpDate : this.trialMonthExpDate).toLocaleDateString('he-IL');
  }

  /**
   * Return true if plan was changed this month 
   */
  get planChangedThisMonth() {
    return (this.userData.lastPlanSubstitutionDate &&
      new Date(this.userData.lastPlanSubstitutionDate).getTime() + millisecondsInMonth > new Date().getTime());
  }

  /**
   * Return next date when changing a plan will be available 
   */
  get nextPlanChangeDate() {
    return new Date(this.userData.lastPlanSubstitutionDate).getTime() + millisecondsInMonth;
  }

}
