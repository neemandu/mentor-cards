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
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UserRelatedDialogComponent } from '../main-screen/user-related/user-related-dialog/user-related-dialog.component';
import { OverlaySpinnerService } from './overlay-spinner.service';
// import { AuthService } from 'src/app/Services/auth.service';
import LogRocket from 'logrocket';
import { EnterCouponCodeDialogComponent } from '../Pages/no-program-page/enter-coupon-code-dialog/enter-coupon-code-dialog.component';
import { DynamicDialogData } from '../Objects/dynamic-dialog-data';
import { DynamicDialogYesNoComponent } from '../Shared Components/Dialogs/dynamic-dialog-yes-no/dynamic-dialog-yes-no.component';

const millisecondsInMonth: number = 2505600000;
const millisecondsInDay: number = 86400000;


@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  @Output() userDataEmmiter: EventEmitter<UserData> = new EventEmitter<UserData>();
  // @Output() loggedInEmmiter: EventEmitter<UserData> = new EventEmitter<UserData>();
  // @Output() signedOutEmmiter: EventEmitter<any> = new EventEmitter<any>();
  @Output() groupDataEmmiter: EventEmitter<GroupData> = new EventEmitter<GroupData>();
  // @Output() showSignInModalEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() subPlansEmmiter: EventEmitter<any> = new EventEmitter<any>();
  @Output() addCouponCodeToFavs: EventEmitter<string[]> = new EventEmitter<string[]>();
  isLoggedIn = false;
  user: { id: string; username: string; email: string; cognitoUser: CognitoUserInterface };
  cognitoUserData: CognitoUserInterface;
  subPlans: SubscriptionPlan[];
  userData: UserData;
  // userData: any;
  groupData: GroupData;

  constructor(public _snackBar: MatSnackBar, public router: Router,
    private ngZone: NgZone, private api: APIService, private http: HttpClient,
    public dialog: MatDialog, private overlaySpinnerService: OverlaySpinnerService) {

    this.rememebrMe();
    // this.getSubscriptionPlans();
    window.onstorage = (obj) => {
      console.log(obj);
    };
  }

  async rememebrMe(): Promise<void> {
    try {
      this.overlaySpinnerService.changeOverlaySpinner(true);
      const user: void | CognitoUserInterface = await Auth.currentUserPoolUser({ bypassCache: true })
      if (user)
        this.loggedIn(user);
      else
        throw 'No current user - rememberMe retured VOID';
      // this.getSubscriptionPlans();
    } catch (err) {
      this.overlaySpinnerService.changeOverlaySpinner(false);
      localStorage.removeItem('signedin');
      console.log("file: user-auth.service.ts ~ line 48 ~ rememebrMe ~ err", err)
      this.getSubscriptionPlans();
    }
  }

  /**
   * After succesful log in, save cookies and let all components know we logged in 
   * @param userData - data returned from the BE for the user (tokens etc')
   */
  // loggedIn(username: void | string): void {
  //   console.log("file: user-auth.service.ts ~ line 81 ~ loggedIn ~ username", username)
  //   if (!username) {
  //     this.overlaySpinnerService.changeOverlaySpinner(false);
  //     return;
  //   }
  loggedIn(cognitoUserData: void | CognitoUserInterface): void {
    if (!cognitoUserData && !this.cognitoUserData) {
      this.overlaySpinnerService.changeOverlaySpinner(false);
      return;
    }
    this.cognitoUserData = cognitoUserData || this.cognitoUserData;
    this.api.GetUser(this.cognitoUserData.username).then(data => {
      if (!data) {
        this.createUser();
        return;
      }
      this.userData = new UserData().deseralize(data);
      this.isLoggedIn = true;
      this.subPlans = undefined;
      this.getSubscriptionPlans();
      this.userDataEmmiter.emit(this.userData);
      // console.log("file: user-auth.service.ts ~ line 98 ~ this.api.GetUser ~ this.userData", this.userData)
      LogRocket.identify(this.userData.email);
      // localStorage.setItem('signedin', 'true');
      this.overlaySpinnerService.changeOverlaySpinner(false);
      this._snackBar.open('התחברות מוצלחת! ברוכים הבאים ', '', {
        duration: 5000,
        panelClass: ['rtl-snackbar']
      });
      if (this.userData.groupId)
        this.updateGroupData();
      if (this.userData.couponCodes.length != 0) {
        this.userData.couponCodes.forEach(coupon => {
          if (coupon.createdAt?.getTime() + (coupon.trialPeriodInDays * millisecondsInDay) > new Date().getTime())
            this.addCouponCodeToFavs.emit(coupon.allowedCardsPacks)
        })
      }
      (this.userData.status === 'PLAN') ? this.ngZone.run(() => this.router.navigate(['/all-packs-page'])) : null;
      // (this.userData.status === 'PLAN' || this.codeCouponExpDate) ? this.ngZone.run(() => this.router.navigate(['/all-packs-page'])) : this.ngZone.run(() => this.router.navigate(['/no-program-page']))
    }, reject => {
      console.log("🚀 ~ file: user-auth.service.ts ~ line 86 ~ UserAuthService ~ this.api.GetUser ~ reject", reject)
      this.overlaySpinnerService.changeOverlaySpinner(false);
      let snackBarRef = this._snackBar.open('שגיאה בהתחברות, נסו שנית', 'רענן', {
        duration: 20000,
        panelClass: ['rtl-snackbar']
      });
      snackBarRef.onAction().subscribe(() => {
        window.location.reload();
      });
    })
  }

  createUser(): void {
    var newUsername: string = this.cognitoUserData.username;
    var newUserEmail: string = this.cognitoUserData.attributes['email'];
    var newUserPhone: string = this.cognitoUserData.attributes['phone_number'];
    var newUserFullName: string = this.cognitoUserData.attributes['given_name'];
    var user: CreateUserInput = { 'username': newUsername, 'email': newUserEmail, 'phone': newUserPhone, 'fullName': newUserFullName };
    this.api.CreateUser(user).then(value => {
      this.userData = new UserData().deseralize(value);
      this.isLoggedIn = true;
      LogRocket.identify(this.userData.email);
      this.overlaySpinnerService.changeOverlaySpinner(false);
      this.userDataEmmiter.emit(this.userData);
      (this.userData.status === 'PLAN') ? this.ngZone.run(() => this.router.navigate(['/all-packs-page'])) : null;
      // (this.userData.status === 'PLAN' || this.codeCouponExpDate) ? this.ngZone.run(() => this.router.navigate(['/all-packs-page'])) : this.ngZone.run(() => this.router.navigate(['/no-program-page']))
      this._snackBar.open('התחברות מוצלחת! ברוכים הבאים ', '', {
        duration: 5000,
        panelClass: ['rtl-snackbar']
      });
    }, reject => {
      console.log("🚀 ~ file: user-auth.service.ts ~ line 73 ~ UserAuthService ~ this.api.CreateUser ~ reject", reject)
      this.overlaySpinnerService.changeOverlaySpinner(false);
      let snackBarRef = this._snackBar.open('שגיאה במימוש משתמש, נסו שנית', 'רענן', {
        duration: 20000,
        panelClass: ['rtl-snackbar']
      });
      snackBarRef.onAction().subscribe(() => {
        window.location.reload();
      });
    });
  }

  /**
   * Get all data from BE about user
   */
  // updateUserData(): void {
  //   if (this.cognitoUserData != null) {
  //     this.api.GetUser(this.cognitoUserData.username).then(data => {
  //       console.log("file: user-auth.service.ts ~ line 89 ~ this.api.GetUser ~ data", data)
  //       if (!data) {
  //         this.overlaySpinnerService.changeOverlaySpinner(false);
  //         return;
  //       }
  //       this.userData = new UserData().deseralize(data);
  //       localStorage.setItem('signedin', 'true');
  //       this.overlaySpinnerService.changeOverlaySpinner(false);
  //       if (this.userData.groupId)
  //         this.updateGroupData();
  //       if (this.userData.couponCodes.length != 0) {
  //         this.userData.couponCodes.forEach(coupon => {
  //           if (coupon.createdAt?.getTime() + (coupon.trialPeriodInDays * millisecondsInDay) > new Date().getTime())
  //             this.addCouponCodeToFavs.emit(coupon.allowedCardsPacks)
  //         })
  //       }
  //       this.loggedInEmmiter.emit(this.userData);
  //       (this.userData.status === 'PLAN' || this.codeCouponExpDate) ? this.ngZone.run(() => this.router.navigate(['/all-packs-page'])) : this.ngZone.run(() => this.router.navigate(['/no-program-page']))
  //     }, reject => {
  //       console.log("🚀 ~ file: user-auth.service.ts ~ line 86 ~ UserAuthService ~ this.api.GetUser ~ reject", reject)
  //     })
  //   }
  // }

  /**
   * Get all data about current group
   */
  updateGroupData(): void {
    this.api.GetGroup(this.userData.groupId).then(data => {
      this.groupData = new GroupData().deseralize(data);
      this.groupDataEmmiter.emit(this.groupData);
    }, reject => {
      console.log("file: user-auth.service.ts ~ line 103 ~ this.api.GetGroup ~ reject", reject)
    })
  }

  /**
   * Get all subscription plans
   */
  getSubscriptionPlans(): void {
    if (!this.subPlans) {
      (this.isLoggedIn ? this.api.GetSubscriptionPlansForOrgs({ username: this.userData.username }) : this.api.GetSubscriptionPlans({ username: 'Not Logged In' })).then((value: any) => {
        // this.api.ListSubscriptionPlans().then(value => {
        // this.subPlans = value.items.map(plan => new SubscriptionPlan().deseralize(plan))
        this.subPlans = value.map(plan => new SubscriptionPlan().deseralize(plan))
        this.subPlansEmmiter.emit();
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

  openEnterCouponCodeModal(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    const dialogRef1 = this.dialog.open(EnterCouponCodeDialogComponent, dialogConfig);
    const dialogSub1 = dialogRef1.afterClosed().subscribe(res => {
      dialogSub1.unsubscribe();
      if (res) {
        dialogConfig.data = new DynamicDialogData("קוד הטבה הוזן בהצלחה", [], "אישור", "")
        const dialogRef2 = this.dialog.open(DynamicDialogYesNoComponent, dialogConfig);
        const dialogSub2 = dialogRef2.afterClosed().subscribe(res => {
          dialogSub2.unsubscribe();
          this.router.navigate(['all-packs-page']);
          window.location.reload();
        })
      }
    });
  }

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
    this.cognitoUserData = undefined;
    // localStorage.removeItem('signedin');
    this.isLoggedIn = false;
    this.userDataEmmiter.emit(undefined);
    // this.router.navigate(['no-program-page']);
  }

  // showSignInModal(): void {//TODO uncomment this part for cognito signin\register
  //   this.showSignInModalEmitter.emit(true);
  // }

  showSignInModal(): void {//TODO uncomment this part for custom signin\register
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    // dialogConfig.maxHeight = '85vh';
    dialogConfig.maxWidth = '90vw';
    const dialogRef = this.dialog.open(UserRelatedDialogComponent, dialogConfig);
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
  get trialPeriodExpDate(): Date {
    return this.userData?.createdAt?.getTime() + millisecondsInDay * 14 >= new Date().getTime() ?
      new Date(this.userData.createdAt?.getTime() + millisecondsInDay * 14) :
      null;
  }

  /**
   * return if in trial month (first month after register)
   */
  getTrialPeriodExpDate(): Date {
    return this.userData?.createdAt?.getTime() + millisecondsInDay * 14 >= new Date().getTime() ?
      new Date(this.userData.createdAt?.getTime() + millisecondsInDay * 14) :
      null;
  }

  /**
   * return if in trial month (first month after register)
   */
  get codeCouponExpDate(): Date {
    if (!this.userData.couponCodes)
      return null;
    let latestCreationCoupon = this.userData.couponCodes[0];
    this.userData.couponCodes.forEach(couponCode => couponCode.createdAt > latestCreationCoupon.createdAt ? latestCreationCoupon = couponCode : null)
    return (this.userData.couponCodes?.length != 0) ?
      new Date(latestCreationCoupon.createdAt?.getTime() + millisecondsInDay * latestCreationCoupon.trialPeriodInDays) : null;//TODO
  }

  /**
   * Returns actual exp date
   */
  get expDate() {
    let date = (this.codeCouponExpDate ? this.codeCouponExpDate : this.trialPeriodExpDate)
    return date ? date.toLocaleDateString('he-IL') : null;
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