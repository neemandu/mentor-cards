import { onAuthUIStateChange, CognitoUserInterface, AuthState } from '@aws-amplify/ui-components';
import { Component, OnInit } from '@angular/core';
import { OverlaySpinnerService } from './Services/overlay-spinner.service';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  //https://docs.amplify.aws/ui/auth/authenticator/q/framework/angular#sign-out
  //https://www.unimedia.tech/2020/12/12/aws-amplify-authentication-with-angular/
  // https://docs.amplify.aws/ui/auth/authenticator/q/framework/angular#hiding-form-fields

  user: CognitoUserInterface | undefined;
  authState: AuthState;
  title = 'amplify-angular-auth';
  showLogin: boolean = false;
  fbBtnSub: Subscription;

  constructor(private overlaySpinnerService: OverlaySpinnerService, private router: Router) {
    this.overlaySpinnerService.changeOverlaySpinner(false);
    // I18n.putVocabularies(dict);
    // I18n.setLanguage('he')
  }

  ngOnInit() {
    this.fbBtnSub = this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        const fbButton = document.getElementById('fb-root')
        if (val.url.includes('pack-view') || val.url.includes('price-page')) {
          fbButton.style.visibility = 'hidden';
          fbButton.style.pointerEvents = 'none'
        } else {
          fbButton.style.visibility = 'unset';
          fbButton.style.pointerEvents = 'auto'
        }
      }
    })
  }

  ngOnDestroy() {
    this.fbBtnSub.unsubscribe();
    return onAuthUIStateChange;
  }
}

// const dict = {
//   'he': {
//     //Sign in modal
//     'Username *': "כתובת אימייל *",
//     'Password *': "סיסמא *",
//     'Enter your username': "כתובת אימייל",
//     'Enter your password': "סיסמא",
//     'Forgot your password?': "שכחת סיסמא?",
//     'Reset password': "איפוס סיסמא",
//     'Sign In': "התחברות",
//     'No account?': "עדיין אין לך משתמש?",
//     'Create account': "יצירת משתמש",
//     //Sign up modal
//     'Password': "סיסמא",
//     'Email Address *': "כתובת אימייל לאימות *",
//     'Email': "כתובת אימייל",
//     'Phone Number *': "מספר טלפון * (לישראל בחר +972)",
//     'Create Account': "צור משתמש",
//     'Have an account?': "יש לך משתמש קיים?",
//     'Sign in': "להתחברות",
//     '(555) 555-1212': "051-2345678",
//     'Full Name *': "שם מלא *",
//     'Full Name': "שם מלא",
//     //Confirm Sign up
//     'Confirmation Code': "קוד אימות (נשלח בהודעה לנייד)",
//     'Enter your code': "קוד אימות (נשלח בהודעה לנייד)",
//     'Resend Code': "שליחת קוד מחדש",
//     'Lost your code?': "הקוד לא הגיע לנייד?",
//     'Confirm': 'אימות משתמש',
//     //Forgot password modal
//     'Send Code': "שלח קוד אימות בהודעה לנייד שלי",
//     'Username': "כתובת אימייל",
//     'Back to Sign In': "חזרה להתחברות",
//     'Verification code': "קוד אימות שהתקבל בהודעה לנייד",
//     'Enter code': "קוד שהתקבל במייל",
//     'New password': "סיסמא חדשה",
//     'Enter your new password': "סיסמא חדשה",
//     'Submit': 'החלפת סיסמא',
//     //Errors
//     'Incorrect username or password.': 'שם משתמש או סיסמא אינם נכונים',
//     'User does not exist.': 'שם משתמש זה לא קיים',
//     'User already exists.': 'משתמש כזה כבר קיים',
//     'Username/client id combination not found.': 'שם משתמש זה לא קיים',
//     'Confirmation code cannot be empty': 'קוד אימות אינו יכול להיות ריק',
//     'Custom auth lambda trigger is not configured for the user pool.': 'שגיאה בהתחברות, נסה שנית',
//     'Invalid email address format.': 'שגיאה בפורמט המייל, נסו שנית',
//     'Password cannot be empty': 'שדה סיסמא לא יכול להיות ריק',
//     'Username cannot be empty': 'שדה כתובת מייל לא יכול להיות ריק',
//     'User already exists': 'מייל זה כבר רשום במערכת',
//     "2 validation errors detected: Value at 'password' failed to satisfy constraint: Member must have length greater than or equal to 6; Value at 'password' failed to satisfy constraint: Member must satisfy regular expression pattern: ^[\S]+.*[\S]+$": 'יש למלא את כל השדות על מנת לבצע הרשמה',
//     "1 validation error detected: Value at 'password' failed to satisfy constraint: Member must have length greater than or equal to 6": 'הסיסמא חייבת להיות 8 תווים ומעלה',
//     'Attributes did not conform to the schema: email: The attribute is required': 'יש לאמת את המייל על מנת לבצע הרשמה',
//     'Password did not conform with policy: Password not long enough': 'הסיסמא חייבת להיות 8 תווים ומעלה',
//     'Invalid phone number format.': 'שגיאה בפורמט הטלפון, נסו שנית',
//   }
// };

// @Component({
//   selector: 'mobile-warning-dialog',
//   templateUrl: './mobile-warning-dialog.html',
// })
// export class MobileWarningDialogComponent {

//   constructor(
//     public dialogRef: MatDialogRef<MobileWarningDialogComponent>) { }

//   closeDialog(): void {
//     this.dialogRef.close();
//   }

// }


