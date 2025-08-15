import { Injectable } from '@angular/core';
import { Auth } from 'aws-amplify';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';


export interface AuthState {
  isLoggedIn: boolean;
  username: string | null;
  id: string | null;
  email: string | null;
  cognitoUser: SignUpResult | null;
}

export interface NewUser {
  fullName: string
  phone: string,
  email: string,
  password: string,
};

type SignUpResult = {
  user: {
    username: string;
    attributes: {
      email: string;
      phone_number: string;
      given_name: string;
      family_name: string;
    };
  };
  userConfirmed: boolean;
  userSub: string;
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public loggedIn: boolean;
  public static SIGN_IN = 'signIn';
  public static SIGN_OUT = 'signOut';
  public static FACEBOOK = CognitoHostedUIIdentityProvider.Facebook;
  public static GOOGLE = CognitoHostedUIIdentityProvider.Google;

  signUp(user: NewUser): Promise<SignUpResult | any> {
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

  sendConfirmationCode(email: string) {
    return Auth.resendSignUp(email)
  }

  confirmCode(email: string, confirmCode: string) {
    return Auth.confirmSignUp(email, confirmCode)
  }

  socialSignIn(provider: CognitoHostedUIIdentityProvider) {
    Auth.federatedSignIn({
      'provider': provider
    }).then(cred => {
      // If success, you will get the AWS credentials
      console.log("file: auth.service.ts ~ line 78 ~ socialSignIn ~ cred", cred)
      return Auth.currentAuthenticatedUser();
    }).then(user => {
        // Fetch the user attributes
      const { attributes } = user;
      const firstName = attributes.given_name;
      const lastName = attributes.family_name;

      console.log("First Name:", firstName);
      console.log("Last Name:", lastName);
    }).catch(e => {
      console.log("file: auth.service.ts ~ line 85 ~ socialSignIn ~ e", e)
    });
  }

  signInWithGoogle() {
    this.socialSignIn(CognitoHostedUIIdentityProvider.Google)
  }
}