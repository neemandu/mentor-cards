import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, NewUser } from 'src/app/Services/auth.service';
import { OverlaySpinnerService } from 'src/app/Services/overlay-spinner.service';
import { UserAuthService } from 'src/app/Services/user-auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Output() registeredEmitter: EventEmitter<any> = new EventEmitter<any>();

  // pwRegex = "/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/"
  registerForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    // lastName: ['', Validators.required],
    phone: ['', [Validators.required, Validators.pattern(/^[+]{0,1}\d{10,15}/)]],
    username: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    usernameConfirm: ['', [Validators.required, Validators.email]],
    passwordConfirm: ['', [Validators.required, Validators.minLength(8)]],
  });
  hidePW: boolean = true;
  hidePWConfirm: boolean = true;
  // showLoading: boolean = false;

  constructor(private formBuilder: FormBuilder, private userAuthService: UserAuthService,
    private overlaySpinnerService: OverlaySpinnerService, private amplifyAuthService: AuthService) { }

  ngOnInit(): void {
  }

  checkUsernameConfirm(): void {
    if (this.registerForm.controls.username.value !== this.registerForm.controls.usernameConfirm.value)
      this.registerForm.controls.usernameConfirm.setErrors({ 'notSameEmail': true })
  }

  checkPasswordConfirm(): void {
    if (this.registerForm.controls.password.value !== this.registerForm.controls.passwordConfirm.value)
      this.registerForm.controls.passwordConfirm.setErrors({ 'notSamePassword': true })
  }

  /**
   * Reset form (Parents order after tab change)
   */
  resetForms(): void {
    this.registerForm.reset();
  }

  onSignupSubmit(): void {
    this.overlaySpinnerService.changeOverlaySpinner(true);
    // this.registerForm.disable();
    var user: NewUser = {
      "fullName": this.registerForm.get("name").value,
      "phone": `+972${this.registerForm.get("phone").value}`,
      "email": this.registerForm.get("username").value,
      "password": this.registerForm.get("password").value,
    }
    this.amplifyAuthService.signUp(user).then(data => {
      this.overlaySpinnerService.changeOverlaySpinner(false);
      this.userAuthService._snackBar.open(
        `הרשמה מוצלחת!`, '', {
        duration: 10000,
        panelClass: ['rtl-snackbar']
      });
      this.registeredEmitter.emit(user.email)
      // console.log("file: register.component.ts ~ line 67 ~ this.userAuthService.signUp ~ data", data)
    }, error => {
      this.overlaySpinnerService.changeOverlaySpinner(false);
      console.log("file: register.component.ts ~ line 69 ~ this.userAuthService.signUp ~ error", error)
      if (error.code === "UsernameExistsException") {
        this.registerForm.get('username').setErrors({ 'UsernameExistsException': true });
        this.registerForm.get('usernameConfirm').setErrors({ 'UsernameExistsException': true });
      }
    })
  }

  signInWithFacebook() {
    this.amplifyAuthService.signInWithFacebook();
  }

  signInWithGoogle() {
    this.amplifyAuthService.signInWithGoogle();
  }
}
