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
  showLogin: boolean = true;


  constructor(private ref: ChangeDetectorRef, private userAuthService: UserAuthService, private overlaySpinnerService: OverlaySpinnerService) {
    this.overlaySpinnerService.changeOverlaySpinner(false);
    I18n.putVocabularies(dict);
    I18n.setLanguage('he');
  }

  ngOnInit() {
    localStorage.getItem('signedin') ? this.showLogin = true : this.showLogin = false;
    onAuthUIStateChange((authState, authData) => {
      this.authState = authState;
      if (this.authState === 'signedin') {
        // debugger
        this.showLogin = false;
        localStorage.setItem('signedin','true')
        this.overlaySpinnerService.changeOverlaySpinner(false);
        this.user = authData as CognitoUserInterface;
        this.userAuthService.loggedIn(this.user);
      }
      else if (this.authState === 'signin') {
        this.userAuthService.loggedOut();
        localStorage.removeItem('signedin')
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
    'Username *': "כתובת אימייל *",
    'Password *': "סיסמא *",
    'Enter your username': "כתובת אימייל",
    'Enter your password': "סיסמא",
    'Forgot your password?': "שכחת סיסמא?",
    'Reset password': "איפוס סיסמא",
    'Sign In': "התחברות",
    'No account?': "עדיין אין לך משתמש?",
    'Create account': "יצירת משתמש",
    //Sign up modal
    'Password': "סיסמא",
    'Email Address *': "כתובת אימייל לאימות *",
    'Email': "כתובת אימייל",
    'Phone Number *': "מספר טלפון * (לישראל בחר +972)",
    'Create Account': "צור משתמש",
    'Have an account?': "יש לך משתמש קיים?",
    'Sign in': "להתחברות",
    '(555) 555-1212': "051-2345678",
    //Confirm Sign up
    'Confirmation Code': "קוד אימות (נשלח למייל)",
    'Enter your code': "קוד אימות (נשלח למייל)",
    'Resend Code': "שליחת קוד מחדש",
    'Lost your code?': "הקוד לא הגיע למייל?",
    'Confirm': 'אימות משתמש',
    //Forgot password modal
    'Send Code': "שלח קוד אימות למייל שלי",
    'Username': "כתובת אימייל",
    'Back to Sign In': "חזרה להתחברות",
    'Verification code': "קוד אימות שהתקבל במייל",
    'Enter code': "קוד שהתקבל במייל",
    'New password': "סיסמא חדשה",
    'Enter your new password': "סיסמא חדשה",
    'Submit': 'החלפת סיסמא',
    //Errors
    'Incorrect username or password.': 'שם משתמש או סיסמא אינם נכונים',
    'User does not exist.': 'שם משתמש זה לא קיים',
    'User already exists.': 'משתמש כזה כבר קיים',
    'Username/client id combination not found.': 'שם משתמש זה לא קיים',
    'Confirmation code cannot be empty': 'קוד אימות אינו יכול להיות ריק',
    'Custom auth lambda trigger is not configured for the user pool.':'שגיאה בהתחברות, נסה שנית'
  }
};


