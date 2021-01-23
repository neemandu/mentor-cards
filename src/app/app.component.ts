import { onAuthUIStateChange, CognitoUserInterface, AuthState } from '@aws-amplify/ui-components';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserAuthService } from './Services/user-auth.service';
import { OverlaySpinnerService } from './Services/overlay-spinner.service';
import { I18n } from 'aws-amplify';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  user: CognitoUserInterface | undefined;
  authState: AuthState;
  title = 'amplify-angular-auth';
  showLogin: boolean = false;


  constructor(private ref: ChangeDetectorRef, private userAuthService: UserAuthService, private overlaySpinnerService: OverlaySpinnerService) {
    this.overlaySpinnerService.changeOverlaySpinner(false);
    I18n.putVocabularies(dict);
    I18n.setLanguage('he');
  }

  ngOnInit() {
    onAuthUIStateChange((authState, authData) => {
      this.authState = authState;
      if (this.authState === 'signedin') {
        debugger
        this.showLogin = false;
        this.overlaySpinnerService.changeOverlaySpinner(false);
        this.user = authData as CognitoUserInterface;
        this.userAuthService.loggedIn(this.user);
      }
      else if (this.authState === 'signin') {
        this.userAuthService.loggedOut();
      }
      this.ref.detectChanges();
    })
    this.userAuthService.showSignInModalEmitter.subscribe(() => {
      this.overlaySpinnerService.changeOverlaySpinner(true);
      this.showLogin = true;
    })
  }

  closeAmplify(): void {
    this.showLogin = false;
    this.overlaySpinnerService.changeOverlaySpinner(false);
  }

  ngOnDestroy() {
    return onAuthUIStateChange;
  }
}

const dict = {
  'he': {
    //Sign in modal
    'Username *': "שם משתמש *",
    'Password *': "סיסמא *",
    'Enter your username': "הזן את שם המשתמש",
    'Enter your password': "הזן את סיסמתך",
    'Forgot your password?': "שכחת סיסמא?",
    'Reset password': "אפס סיסמא",
    'Sign In': "התחברות",
    'No account?': "אין משתמש?",
    'Create account': "צור משתמש",
    //Sign up modal
    'Password': "סיסמא",
    'Email Address *': "כתובת אימייל *",
    'Email': "אימייל",
    'Phone Number *': "מספר טלפון *",
    'Create Account': "צור משתמש",
    'Have an account?': "יש לך משתמש קיים?",
    'Sign in': "להתחברות",
    //Confirm Sign up
    'Confirmation Code': "קוד אימות (נשלח במייל)",
    'Enter your code': "הזן קוד אימות (נשלח במייל)",
    'Resend Code': "שליחת קוד מחדש",
    'Lost your code?': "הקוד נאבד או לא הגיע למייל?",
    'Confirm': 'אימות משתמש',
    //Forgot password modal
    'Send Code': "שלח קוד אימות למייל שלי",
    'Username': "שם משתמש",
    'Back to Sign In': "חזרה להתחברות",
    'Verification code': "קוד אימות שהתקבל במייל",
    'Enter code': "הזן קוד שהתקבל במייל",
    'New password': "סיסמא חדשה",
    'Enter your new password': "הזן סיסמא חדשה",
    'Submit': 'החלפת סיסמא'
  }
};


