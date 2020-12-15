import { EventEmitter, Injectable, NgZone, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';
import { APIService } from '../API.service';
import { SubscriptionPlan } from '../Objects/subscriptionPlans';
import { CardsService } from './cards.service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  @Output() loggedInEmmiter: EventEmitter<any> = new EventEmitter<any>();

  loggedInAttributes: any;
  subPlans: SubscriptionPlan[];

  constructor(public _snackBar: MatSnackBar, public router: Router, private api: APIService, private ngZone: NgZone, private cardsService: CardsService) {
  }

  /**
   * Preform sign up process
   * @param newUser - new user data (name, lname, username (email), password)
   */
  signUp(newUser): Promise<any> {
    return Auth.signUp(newUser);
  }

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
  loggedIn(userData: any) {
    this.loggedInAttributes = userData.attributes;
    this.getSubscriptionPlans();
    this.loggedInEmmiter.emit(userData.attributes);
  }

  /**
   * Get all subscription plans
   */
  getSubscriptionPlans(): void {
    try {
      this.api.ListSubscriptionPlans().then(data => {
        this.subPlans = data.items.map(plan => new SubscriptionPlan().deseralize(plan))
        // console.log("🚀 ~ file: user-auth.service.ts ~ line 54 ~ UserAuthService ~ this.api.ListSubscriptionPlans ~ this.subPlans", this.subPlans)
      });
    }
    catch (e) {
      let snackBarRef = this.cardsService._snackBar.open('שגיאה במשיכת מנוייפ, נסו שנית', 'רענן', {
        duration: 20000,
      });
      snackBarRef.onAction().subscribe(() => {
        window.location.reload();
      });
    }
  }

  /**
   * Return if user is logged in
   */
  isLoggedIn(): boolean {
    return this.loggedInAttributes != undefined;
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

  logOut(): Promise<any> {
    return Auth.signOut();
  }

  loggedOut(): void {
    this.loggedInAttributes = undefined;
    // this.router.navigate(['no-program-page']);
  }

}
