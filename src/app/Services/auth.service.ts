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
  }

  confirmCode(email: string, confirmCode: string) {
    return Auth.confirmSignUp(email, confirmCode)
  }

  // changePassword(userData: any, oldPassword: string, newPassword: string) {
  //   return Auth.changePassword(userData, oldPassword, newPassword);
  // }

  async signInWithFacebook() {
    const socialResult = await this.socialSignIn(AuthService.FACEBOOK);
    console.log('fb Result:', socialResult);
  }

  async signInWithGoogle() {
    const socialResult = await this.socialSignIn(AuthService.GOOGLE);
    console.log('google Result:', socialResult);
  }

}