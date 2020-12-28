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
    lastName: ['', Validators.required],
    username: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });
  hidePW: boolean = true;
  showLoading: boolean = false;

  constructor(private formBuilder: FormBuilder, private userAuthService: UserAuthService) { }

  ngOnInit(): void {
  }

  /**
   * Reset form (Parents order after tab change)
   */
  resetForms(): void {
    this.registerForm.reset();
  }

//   onRegisterSubmit(): void {
//     this.showHideLoading();
//     this.registerForm.disable();
//     var newUser = {
//       "username": this.registerForm.get("username").value,
//       "password": this.registerForm.get("password").value,
//       attributes: {
//         "name": this.registerForm.get("name").value,
//         "family_name": this.registerForm.get("lastName").value,
//         "email": this.registerForm.get("username").value,
//       }
//     }
//     this.userAuthService.signUp(newUser)//TODO problem with signup
//       .then(data => {
//         this.showHideLoading();
//         this.userAuthService._snackBar.open('.משתמש נוצר בהצלחה. הודעת אישור נשלחה למייל שלכם', '', {
//           duration: 5000,
//           panelClass: ['rtl-snackbar']
//         });
//         // this.registerForm.enable();
//         this.registered.emit();
//       })
//       .catch(err => {
//         this.showHideLoading();
//         this.registerForm.enable();
//         console.log(err)
//         if (err.code === 'UsernameExistsException') {
//           this.registerForm.controls['username'].setErrors({ 'emailAlreadyExists': true });
//         }
//         if (err.code === 'InvalidPasswordException') {
//           this.registerForm.controls['password'].setErrors({ 'badPassword': true });
//         }
//       });
//   }

//   showHideLoading(): void {
//     this.showLoading = !this.showLoading;
//   }
}
