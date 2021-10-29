import { Injectable } from '@angular/core';
import Auth, { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import { Hub, ICredentials } from '@aws-amplify/core';
import { Subject, Observable } from 'rxjs';
import { CognitoUser } from 'amazon-cognito-identity-js';

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
  private _authState: Subject<CognitoUser | any> = new Subject<CognitoUser | any>();
  authState: Observable<CognitoUser | any> = this._authState.asObservable();

  public static SIGN_IN = 'signIn';
  public static SIGN_OUT = 'signOut';
  public static FACEBOOK = CognitoHostedUIIdentityProvider.Facebook;
  public static GOOGLE = CognitoHostedUIIdentityProvider.Google;

  constructor() {
    Hub.listen('auth', (data) => {
      const { channel, payload } = data;
      if (channel === 'auth') {
        this._authState.next(payload.event);
      }
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

  // signIn(username: string, password: string): Promise<CognitoUser | any> {
  //   return new Promise((resolve, reject) => {
  //     Auth.signIn(username, password)
  //       .then((user: CognitoUser | any) => {
  //         this.loggedIn = true;
  //         resolve(user);
  //       }).catch((error: any) => reject(error));
  //   });
  // }

  logIn(user): Promise<any> {
    return Auth.signIn(user);
  }

  signOut(): Promise<any> {
    return Auth.signOut()
      .then(() => this.loggedIn = false)
  }

  socialSignIn(provider: CognitoHostedUIIdentityProvider): Promise<ICredentials> {
    return Auth.federatedSignIn({
      'provider': provider
    });
  }

  sendConfirmationCode(email: string) {
    return Auth.resendSignUp(email)
    // .then(() => this._notification.show('A code has been emailed to you'))
    // .catch(() => this._notification.show('An error occurred'));
  }

  confirmCode(email: string, confirmCode: string) {
    return Auth.confirmSignUp(email, confirmCode)

  }

}