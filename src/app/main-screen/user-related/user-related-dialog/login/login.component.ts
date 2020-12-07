import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserAuthService } from 'src/app/Services/user-auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() loggedIn: EventEmitter<any> = new EventEmitter<any>();

  // emailRegex = '^[A-Za-z0-9._%+-]+@intel.com$';
  loginForm: FormGroup = this.formBuilder.group({
    username: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });
  forgotPasswordForm: FormGroup = this.formBuilder.group({
    username: ['', [Validators.required, Validators.email]],
    confirmationCode: ['',],
    newPassword: ['',],
  });
  newPasswordPhase: boolean = false;
  hidePW: boolean = true;
  login: boolean = true;
  showLoading: boolean = false;

  constructor(private formBuilder: FormBuilder, private userAuthService: UserAuthService) { }

  ngOnInit(): void {
  }

  /**
   * Reset both forms and go back to login form (Parents order after tab change)
   */
  resetForms(): void {
    this.loginForm.reset();
    this.forgotPasswordForm.reset();
    this.newPasswordPhaseDisable();
    this.login = true;
  }

  onLoginSubmit(): void {
    this.showHideLoading();
    this.loginForm.disable();
    var user = {
      "username": this.loginForm.get("username").value,
      "password": this.loginForm.get("password").value,
    }
    this.userAuthService.logIn(user).then(userData => {
      // console.log(userData);
      this.showHideLoading();
      this.userAuthService._snackBar.open('התחברות מוצלחת, ברוך הבא ' + userData.attributes.name + '!', '', {
        duration: 3000,
        panelClass: ['rtl-snackbar']
      });
      this.userAuthService.loggedIn(userData);
      this.loggedIn.emit();
    })
      .catch(err => {
        this.showHideLoading();
        this.loginForm.enable();
        console.log(err)
        if (err.code === 'UserNotConfirmedException') {
          this.loginForm.controls['username'].setErrors({ 'userNotConfirmed': true });
        }
        if (err.code === 'UserNotFoundException') {
          this.loginForm.controls['username'].setErrors({ 'userNotFound': true });
        }
        if (err.code === "NotAuthorizedException") {
          this.loginForm.controls['password'].setErrors({ 'usernamePwWrong': true });
        }
      });
  }

  onForgotPasswordSubmit(): void {
    this.forgotPasswordForm.disable();
    this.showHideLoading();
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
    var user = this.forgotPasswordForm.get("username").value;
    this.userAuthService.forgotPasswordVarifyEmail(user).then(res => {
      console.log(res);
      this.forgotPasswordForm.enable();
      this.showHideLoading();
      this.newPasswordPhaseEnable();
    })
      .catch(err => {
        console.log(err)
        this.forgotPasswordErrorHandle(err);
      });
  }

  forgotPasswordReset(): void {
    var user = this.forgotPasswordForm.get("username").value;
    var confirmationCode = this.forgotPasswordForm.get("confirmationCode").value;
    var newPassword = this.forgotPasswordForm.get("newPassword").value;
    this.userAuthService.forgotPasswordReset(user, confirmationCode, newPassword).then(res => {
      console.log(res);
      this.forgotPasswordForm.enable();
      this.showHideLoading();
      this.newPasswordPhaseDisable();
      this.login = true;
      this.userAuthService._snackBar.open('סיסמתך שונתה בהצלחה. יש לבצע התחברות', '', {
        duration: 3000,
        panelClass: ['rtl-snackbar']
      });
    })
      .catch(err => {
        console.log(err)
        this.forgotPasswordErrorHandle(err);
      });
  }

  /**
   * Handle any error for the forgotPassword form
   * @param err 
   */
  forgotPasswordErrorHandle(err): void {
    this.forgotPasswordForm.enable();
    this.showHideLoading();
    if (err.code === 'LimitExceededException') {
      this.forgotPasswordForm.controls['username'].setErrors({ 'limitExceeded': true });
    }
    if (err.code === 'UserNotFoundException') {
      this.forgotPasswordForm.controls['username'].setErrors({ 'userNotFound': true });
    }
    if (err.code === "CodeMismatchException") {
      this.forgotPasswordForm.controls['confirmationCode'].setErrors({ 'codeMismatch': true });
    }
    if (err.code === 'InvalidPasswordException') {
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


  showHideLoading(): void {
    this.showLoading = !this.showLoading;
  }
}
