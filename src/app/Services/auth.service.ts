import { Injectable } from '@angular/core';
import { CognitoHostedUIIdentityProvider, Auth } from '@aws-amplify/auth';
// import { BehaviorSubject } from 'rxjs';
import { CognitoUserInterface } from '@aws-amplify/ui-components';
import { CognitoUser } from 'amazon-cognito-identity-js';
// import { UserAuthService } from './user-auth.service';
// import { map } from 'rxjs/operators';

import {
  SocialAuthService,
  GoogleLoginProvider,
} from 'angularx-social-login';

// const initialAuthState = {
//   isLoggedIn: false,
//   username: null,
//   id: null,
//   email: null,
//   cognitoUser: null
// };

export interface AuthState {
  isLoggedIn: boolean;
  username: string | null;
  id: string | null;
  email: string | null;
  cognitoUser: CognitoUserInterface | null;
}

export interface NewUser {
  fullName: string
  phone: string,
  email: string,
  password: string,
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public loggedIn: boolean;
  // private readonly _authState = new BehaviorSubject<AuthState>(
  //   initialAuthState
  // );
  /** AuthState as an Observable */
  // readonly auth$ = this._authState.asObservable();

  /** Observe the isLoggedIn slice of the auth state */
  // readonly isLoggedIn$ = this.auth$.pipe(map(state => state.isLoggedIn));

  //private _authState: Subject<CognitoUser | any> = new Subject<CognitoUser | any>();
  //authState: Observable<CognitoUser | any> = this._authState.asObservable();
  //authResponseUri: string = "https://dev.d15egmtmsipj3q.amplifyapp.com/all-packs-page/"

  public static SIGN_IN = 'signIn';
  public static SIGN_OUT = 'signOut';
  public static FACEBOOK = CognitoHostedUIIdentityProvider.Facebook;
  public static GOOGLE = CognitoHostedUIIdentityProvider.Google;

  constructor(private socialAuthService: SocialAuthService) {
  }
  
  ngOnInit() {
    this.socialAuthService.authState.subscribe((user) => {
      console.log(user);
    });
  }

  signUp(user: NewUser): Promise<CognitoUser | any> {
    return Auth.signUp({
      "username": user.email,
      "password": user.password,
      "attributes": {
        "email": user.email,
        "given_name": user.fullName,
        "phone_number": user.phone
      }
    });
  }

  logIn(user): Promise<any> {
    return Auth.signIn(user);
  }

  signOut(): Promise<any> {
    return Auth.signOut()
      .then(() => this.loggedIn = false)
  }

  socialSignIn(provider: CognitoHostedUIIdentityProvider) {
    Auth.federatedSignIn({
      'provider': provider
    }).then(cred => {
      // If success, you will get the AWS credentials
      console.log("file: auth.service.ts ~ line 78 ~ socialSignIn ~ cred", cred)
      return Auth.currentAuthenticatedUser();
    }).then(user => {
      // If success, the user object you passed in Auth.federatedSignIn
      console.log("file: auth.service.ts ~ line 82 ~ socialSignIn ~ user", user)
    }).catch(e => {
      console.log("file: auth.service.ts ~ line 85 ~ socialSignIn ~ e", e)
    });
  }

  sendConfirmationCode(email: string) {
    return Auth.resendSignUp(email)
  }

  confirmCode(email: string, confirmCode: string) {
    return Auth.confirmSignUp(email, confirmCode)
  }

  // changePassword(userData: any, oldPassword: string, newPassword: string) {
  //   return Auth.changePassword(userData, oldPassword, newPassword);
  // }

  // async signInWithFacebook() {
  //   const socialResult = await this.socialSignIn(AuthService.FACEBOOK);
  //   console.log('fb Result:', socialResult);
  // }

  signInWithGoogle() {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
    // Auth.federatedSignIn({'provider': AuthService.GOOGLE})
    // const socialResult = await this.socialSignIn(AuthService.GOOGLE);
    // console.log('google Result:', socialResult);
  }

}