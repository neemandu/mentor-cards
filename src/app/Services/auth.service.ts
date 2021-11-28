import { Injectable } from '@angular/core';
import Auth, { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import { Hub, ICredentials } from '@aws-amplify/core';
import { Subject, Observable } from 'rxjs';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { UserAuthService } from './user-auth.service';

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
  authResponseUri: string = "https://dev.d15egmtmsipj3q.amplifyapp.com/all-packs-page/"

  public static SIGN_IN = 'signIn';
  public static SIGN_OUT = 'signOut';
  public static FACEBOOK = CognitoHostedUIIdentityProvider.Facebook;
  public static GOOGLE = CognitoHostedUIIdentityProvider.Google;

  constructor(private userAuthService: UserAuthService) {
    // Hub.listen('auth', (data) => {
    //   console.log("file: auth.service.ts ~ line 32 ~ Hub.listen ~ data", data)
    //   const { channel, payload } = data;
    //   if (channel === 'auth') {
    //     this._authState.next(payload.event);
    //   }
    // });
    Hub.listen('auth', ({ payload: { event, data, message } }) => {
      console.log("file: auth.service.ts ~ line 39 ~ Hub.listen ~ event", event)
      if (event === 'signIn') {
        this.userAuthService.loggedIn(data);
      } else {
        this._authState.next(event);
      }
    });
    // (Auth as any)._handleAuthResponse(this.authResponseUri)
    //   .then(res => {
    //     console.log("file: auth.service.ts ~ line 38 ~ constructor ~ res", res)
    //   })
    //   .err(err => {
    //     console.log("file: auth.service.ts ~ line 44 ~ constructor ~ err", err)
    //   })
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

  async signInWithFacebook() {
    const socialResult = await this.socialSignIn(AuthService.FACEBOOK);
    console.log('fb Result:', socialResult);
  }

  async signInWithGoogle() {
    const socialResult = await this.socialSignIn(AuthService.GOOGLE);
    console.log('google Result:', socialResult);
  }

}