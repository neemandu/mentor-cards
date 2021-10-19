import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserAuthService } from 'src/app/Services/user-auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Output() registered: EventEmitter<any> = new EventEmitter<any>();

  // pwRegex = "/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/"
  registerForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    // lastName: ['', Validators.required],
    phone: ['', [Validators.required, Validators.pattern(/^05\d{1}(\-)?\d{7}$/)]],
    username: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    usernameConfirm: ['', [Validators.required, Validators.email]],
    passwordConfirm: ['', [Validators.required, Validators.minLength(8)]],
  });
  hidePW: boolean = true;
  hidePWConfirm: boolean = true;
  showLoading: boolean = false;

  constructor(private formBuilder: FormBuilder, private userAuthService: UserAuthService) { }

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

  moveToLogin(): void {
    this.registered.emit();
  }
}
