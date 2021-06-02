import { onAuthUIStateChange, CognitoUserInterface, AuthState } from '@aws-amplify/ui-components';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { UserAuthService } from './Services/user-auth.service';
import { OverlaySpinnerService } from './Services/overlay-spinner.service';
// import { I18n } from 'aws-amplify';
import LogRocket from 'logrocket';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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

  constructor(private ref: ChangeDetectorRef, private userAuthService: UserAuthService, private overlaySpinnerService: OverlaySpinnerService,
    public dialog: MatDialog) {
    this.overlaySpinnerService.changeOverlaySpinner(false);
    // I18n.putVocabularies(dict);
    // I18n.setLanguage('he');
  }

  ngOnInit() {
    localStorage.getItem('signedin') ? this.showLogin = true : this.showLogin = false;
    onAuthUIStateChange((authState, authData) => {
      this.authState = authState;
      // console.log("file: app.component.ts ~ line 30 ~ onAuthUIStateChange ~ authState", authState)
      // debugger
      if (this.authState === 'signedin') {
        // debugger
        this.showLogin = false;
        localStorage.setItem('signedin', 'true')
        this.overlaySpinnerService.changeOverlaySpinner(false);
        this.user = authData as CognitoUserInterface;
        LogRocket.identify(this.user.username);//TODO
        this.userAuthService.loggedIn(this.user);
      }
      else if (this.authState === 'signin') {
        this.userAuthService.loggedOut();
        localStorage.removeItem('signedin');
      }
      this.ref.detectChanges();
    })
    this.userAuthService.showSignInModalEmitter.subscribe(() => {
      this.overlaySpinnerService.changeOverlaySpinner(true);
      this.showLogin = true;
    })
    var ua = navigator.userAgent;
    if (/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(ua))
      this.openMobileErrorModal();
  }

  openMobileErrorModal(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.maxHeight = '85vh';
    dialogConfig.maxWidth = '85vw';
    const dialogRef = this.dialog.open(MobileWarningDialogComponent, dialogConfig);
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
    'Custom auth lambda trigger is not configured for the user pool.': 'שגיאה בהתחברות, נסה שנית',
    'Invalid email address format.': 'שגיאה בפורמט המייל, נסו שנית',
    'Password cannot be empty': 'שדה סיסמא לא יכול להיות ריק',
    'Username cannot be empty': 'שדה כתובת מייל לא יכול להיות ריק',
    'User already exists': 'מייל זה כבר רשום במערכת',
    "2 validation errors detected: Value at 'password' failed to satisfy constraint: Member must have length greater than or equal to 6; Value at 'password' failed to satisfy constraint: Member must satisfy regular expression pattern: ^[\S]+.*[\S]+$": 'יש למלא את כל השדות על מנת לבצע הרשמה',
    "1 validation error detected: Value at 'password' failed to satisfy constraint: Member must have length greater than or equal to 6": 'הסיסמא חייבת להיות 8 תווים ומעלה',
    'Attributes did not conform to the schema: email: The attribute is required': 'יש לאמת את המייל על מנת לבצע הרשמה',
    'Password did not conform with policy: Password not long enough': 'הסיסמא חייבת להיות 8 תווים ומעלה',
    'Invalid phone number format.': 'שגיאה בפורמט הטלפון, נסו שנית',
  }
};

@Component({
  selector: 'mobile-warning-dialog',
  templateUrl: './mobile-warning-dialog.html',
})
export class MobileWarningDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<MobileWarningDialogComponent>) { }

  closeDialog(): void {
    this.dialogRef.close();
  }

}


