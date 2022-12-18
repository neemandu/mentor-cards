import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { OverlaySpinnerService } from 'src/app/Services/overlay-spinner.service';
import { UserAuthService } from 'src/app/Services/user-auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoggedIn = false;
  user: { id: string; username: string; email: string };

  @Output() loggedInCloseDialog: EventEmitter<any> = new EventEmitter<any>();
  @Output() toRegister: EventEmitter<any> = new EventEmitter<any>();
  @Input() registeredEmail: string;
  @Input() registeredPW: string;

  // emailRegex = '^[A-Za-z0-9._%+-]+@intel.com$';
  // Login Form
  loginForm: FormGroup = this.formBuilder.group({
    username: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });
  // Forgot Password Form
  forgotPasswordForm: FormGroup = this.formBuilder.group({
    username: ['', [Validators.required, Validators.email]],
    confirmationCode: ['',],
    newPassword: ['',],
  });
  // User Confirm Form
  confirmForm: FormGroup = this.formBuilder.group({
    username: ['', [Validators.required, Validators.email]],
    confirmationCode: ['', Validators.required],
  });
  // userData: any;
  newPasswordPhase: boolean = false;
  hidePW: boolean = true;
  showLogin: boolean = true;
  showForgotPw: boolean = false;
  showConfirmUser: boolean = false;
  showLoading: boolean = false;
  showPwChallange: boolean = false;
  confirmCodeSent: boolean = false;

  constructor(private formBuilder: FormBuilder, private userAuthService: UserAuthService, public router: Router,
    private overlaySpinnerService: OverlaySpinnerService, private amplifyAuthService: AuthService, private ngZone: NgZone) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.registeredEmail) {
      this.showConfirmUserForm()
    }
  }

  /**
   * (yaniv knobel @ intel . com) -> yanivknobel@intel.com
   * @param form - form to clean username space out of 
   */
  trimSpacesEmail(form, field): void {
    if(form.controls[field].value !== '')
      form.controls[field].setValue(form.controls[field].value.split(' ').join(''))
  }

  /**
   * Reset both forms and go back to login form (Parents order after tab change)
   */
  resetForms(): void {
    this.loginForm.reset();
    this.forgotPasswordForm.reset();
    this.newPasswordPhaseDisable();
    if (!this.registeredEmail) {
      this.confirmForm.reset();
      this.showLoginForm();
    }
  }

  public navigate(path: string): void {
    // console.log(path)
    this.ngZone.run(() => this.router.navigate([path]));
  }

  //---LOGIN---//

  onLoginSubmit(): void {
    // this.showHideLoading();
    this.overlaySpinnerService.changeOverlaySpinner(true);
    var user = {
      "username": this.loginForm.get("username").value.toLowerCase(),
      "password": this.loginForm.get("password").value,
    }
    this.amplifyAuthService.logIn(user).then(userData => {
      this.userAuthService.loggedIn(userData);
      this.loggedInCloseDialog.emit();
    })
      .catch(err => {
        console.log("file: login.component.ts ~ line 84 ~ onLoginSubmit ~ err", err)
        this.overlaySpinnerService.changeOverlaySpinner(false);
        if (err.code === 'UserNotConfirmedException') {
          this.sendConfirmationCode();
        }
        if (err.code === 'UserNotFoundException') {
          this.loginForm.controls['username'].setErrors({ 'userNotFound': true });
        }
        if (err.code === "NotAuthorizedException") {
          this.loginForm.controls['password'].setErrors({ 'usernamePwWrong': true });
        }
      });
  }

  /**
   * Make login Form visible 
   */
  showLoginForm(): void {
    this.showForgotPw = false;
    this.showConfirmUser = false;
    this.showLogin = true;
    this.confirmForm.reset();
    this.forgotPasswordForm.reset();
  }

  /**
   * After email checked, Initiate password reset phase
   */
  newPasswordChallange(): void {
    this.forgotPasswordForm.controls.username.disable();
    this.newPasswordPhase = true;
    this.forgotPasswordForm.controls.confirmationCode.setValidators([Validators.required])
    this.forgotPasswordForm.controls.newPassword.setValidators([Validators.required, Validators.minLength(8)])
  }

  moveToRegisterForm(): void {
    this.toRegister.emit();
  }

  //---FORGOT PASSWORD---//

  onForgotPasswordSubmit(): void {
    // this.forgotPasswordForm.disable();
    //After email confirm
    if (this.newPasswordPhase) {
      this.forgotPasswordReset();
    }
    //confirm email
    else {
      this.forgotPasswordVarifyEmail();
    }
  }

  forgotPasswordVarifyEmail(): void {
    this.overlaySpinnerService.changeOverlaySpinner(true);
    var user = this.forgotPasswordForm.get("username").value.toLowerCase();
    this.userAuthService.forgotPasswordVarifyEmail(user)
      .then(res => {
        this.confirmCodeSent = true;
        this.overlaySpinnerService.changeOverlaySpinner(false);
        // this.forgotPasswordForm.enable();
        this.newPasswordPhaseEnable();
        this.userAuthService._snackBar.open('נשלח קוד אימות בהודעה לנייד', '', {
          duration: 5000,
          panelClass: ['rtl-snackbar']
        });
      })
      .catch(err => {
        this.overlaySpinnerService.changeOverlaySpinner(false);
        console.log("file: login.component.ts ~ line 137 ~ forgotPasswordVarifyEmail ~ err", err)
        this.forgotPasswordErrorHandle(err);
      });
  }

  forgotPasswordReset(): void {
    this.overlaySpinnerService.changeOverlaySpinner(true);
    var user = this.forgotPasswordForm.get("username").value.toLowerCase();
    var confirmationCode = this.forgotPasswordForm.get("confirmationCode").value.trim();
    var newPassword = this.forgotPasswordForm.get("newPassword").value;
    this.userAuthService.forgotPasswordReset(user, confirmationCode, newPassword)
      .then(res => {
        this.newPasswordPhaseDisable();
        this.loginForm.controls['username'].setValue(this.forgotPasswordForm.controls['username'].value)
        this.showLoginForm();
        this.overlaySpinnerService.changeOverlaySpinner(false);
        this.userAuthService._snackBar.open('סיסמתך שונתה בהצלחה. יש לבצע התחברות', '', {
          duration: 5000,
          panelClass: ['rtl-snackbar']
        });
      })
      .catch(err => {
        console.log("file: login.component.ts ~ line 163 ~ forgotPasswordReset ~ err", err)
        this.forgotPasswordErrorHandle(err);
      });
  }

  /**
   * Handle any error for the forgotPassword form
   * @param err 
   */
  forgotPasswordErrorHandle(err): void {
    this.forgotPasswordForm.enable();
    // this.showHideLoading();
    if (err.code === 'LimitExceededException') {
      this.forgotPasswordForm.controls['username'].setErrors({ 'limitExceeded': true });
    }
    else if (err.code === 'UserNotFoundException') {
      this.forgotPasswordForm.controls['username'].setErrors({ 'userNotFound': true });
    }
    else if (err.code === "CodeMismatchException") {
      this.forgotPasswordForm.controls['confirmationCode'].setErrors({ 'codeMismatch': true });
    }
    else if (err.code === 'InvalidPasswordException') {
      this.forgotPasswordForm.controls['newPassword'].setErrors({ 'badPassword': true });
    }
  }

  /**
   * After email checked, Initiate password reset phase
   */
  newPasswordPhaseEnable(): void {
    this.forgotPasswordForm.controls.username.disable();
    this.newPasswordPhase = true;
    this.forgotPasswordForm.controls.confirmationCode.setValidators([Validators.required])
    this.forgotPasswordForm.controls.newPassword.setValidators([Validators.required, Validators.minLength(8)])
  }

  /**
   * Clear reset password fields
   */
  newPasswordPhaseDisable(): void {
    this.forgotPasswordForm.controls.username.enable();
    this.newPasswordPhase = false;
    this.forgotPasswordForm.controls.confirmationCode.clearValidators();
    this.forgotPasswordForm.controls.newPassword.clearValidators();
  }


  /**
   * Make Forgot Password Form visible 
   */
  showForgotPasswordForm(): void {
    this.showLogin = false;
    this.showConfirmUser = false;
    this.showForgotPw = true;
    this.forgotPasswordForm.controls['username'].setValue(this.loginForm.controls['username'].value)
  }

  //---USER CONFIM---//
  sendConfirmationCode(): void {
    this.amplifyAuthService.sendConfirmationCode(this.loginForm.controls['username'].value)
      .then(data => {
        this.confirmForm.controls['username'].setValue(this.loginForm.controls['username'].value);
        this.showConfirmUserForm();
        // this.confirmForm.controls['username'].disable();
        this.userAuthService._snackBar.open(`נשלח קוד אימות בהודעה לנייד ${this.loginForm.controls['username'].value}, יש להזין ולאמת את המשתמש`, '', {
          duration: 4000,
          panelClass: ['rtl-snackbar']
        });
      })
      .catch(error => {
        console.log("file: login.component.ts ~ line 210 ~ sendConfirmationCode ~ error", error)
        this.codeConfirmationErrorHandle(error)
      });
  }

  onConfirmSubmit(): void {
    this.overlaySpinnerService.changeOverlaySpinner(true);
    this.amplifyAuthService.confirmCode(this.confirmForm.controls['username'].value, this.confirmForm.controls['confirmationCode'].value.trim())
      .then((data: any) => {
        this.overlaySpinnerService.changeOverlaySpinner(false);
        // console.log(data);
        if (data === 'SUCCESS') {
          this.userAuthService._snackBar.open(
            `משתמש אומת! בעוד רגע תוכלו להתחיל לעבוד`, '', {
            // `משתמש אומת! יש להתחבר על מנת להתחיל לעבוד`, '', {
            duration: 4000,
            panelClass: ['rtl-snackbar']
          });
          this.showLoginForm();
          this.onLoginSubmit();
        }
      })
      .catch((error: any) => {
        this.overlaySpinnerService.changeOverlaySpinner(false);
        this.codeConfirmationErrorHandle(error)
        console.log("file: login.component.ts ~ line 254 ~ onConfirmSubmit ~ error", error)
      })
  }

  /**
   * Handle any error for the confirmationCode form
   * @param err 
   */
  codeConfirmationErrorHandle(err): void {
    if (err.code === 'CodeMismatchException') {
      this.confirmForm.controls['confirmationCode'].setErrors({ 'CodeMismatchException': true });
    }
    else if (err.code === 'LimitExceededException') {
      this.showLoginForm();
      this.confirmForm.reset();
      this.loginForm.controls['username'].setErrors({ 'LimitExceededException': true });
    }
  }

  /**
   * Make confirm user form visible 
   */
  showConfirmUserForm(): void {
    this.showLogin = false;
    this.showForgotPw = false;
    this.showConfirmUser = true;
    if (this.registeredEmail) {
      this.confirmForm.controls['username'].setValue(this.registeredEmail);
      this.loginForm.controls['username'].setValue(this.registeredEmail);
      this.loginForm.controls['password'].setValue(this.registeredPW);
      // this.confirmForm.controls['username'].disable();
    }
  }

  // signInWithFacebook() {
  //   this.amplifyAuthService.signInWithFacebook();
  // }

  signInWithGoogle() {
    this.amplifyAuthService.signInWithGoogle();
    //https://www.positronx.io/angular-google-social-login-tutorial-with-example/
    //https://github.com/abacritt/angularx-social-login
  }
}
