import { EventEmitter, Injectable, NgZone, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';
import { APIService, CreateUserInput } from '../API.service';
import { SubscriptionPlan } from '../Objects/subscriptionPlans';
import { CardsService } from './cards.service';
import { CognitoUserInterface } from '@aws-amplify/ui-components';


@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  @Output() loggedInEmmiter: EventEmitter<any> = new EventEmitter<any>();

  loggedInAttributes: any;
  subPlans: SubscriptionPlan[];
  userData: any;

  constructor(public _snackBar: MatSnackBar, public router: Router, private api: APIService, private ngZone: NgZone, private cardsService: CardsService) {
  }

  /**
   * Preform sign up process
   * @param newUser - new user data (name, lname, username (email), password)
   */
  signUp(username: string, email: string): Promise<any> {
    var session = Auth.currentSession();
    var user: CreateUserInput = { 'username': username, 'email': email };
    user.username = username;
    user.email = email;
    return this.api.CreateUser(user);
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
  loggedIn(userData: CognitoUserInterface) {
    var newUsername: string = userData.username;
    var newUserEmail: string = userData.attributes['email'];
    var user: CreateUserInput = { 'username': newUsername, 'email': newUserEmail };
    this.api.CreateUser(user).then(value => {
      // console.log("🚀 ~ file: user-auth.service.ts ~ line 54 ~ UserAuthService ~ this.api.CreateUser ~ value", value)
    }, reject => {
      console.log("🚀 ~ file: user-auth.service.ts ~ line 73 ~ UserAuthService ~ this.api.CreateUser ~ reject", reject)
    });
    this.loggedInAttributes = userData;
    this.updateUserData();
    this.getSubscriptionPlans();
  }

  /**
   * Get all data from BE about user
   */
  updateUserData(): void {
    this.api.GetUser(this.loggedInAttributes.username).then(data => {
      this.userData = data;
      // console.log("🚀 ~ file: user-auth.service.ts ~ line 58 ~ UserAuthService ~ this.api.GetUser ~ data", data)
      this.loggedInEmmiter.emit(this.userData);
    }, reject => {
      console.log("🚀 ~ file: user-auth.service.ts ~ line 86 ~ UserAuthService ~ this.api.GetUser ~ reject", reject)
    })
  }

  /**
   * Get all subscription plans
   */
  getSubscriptionPlans(): void {
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
