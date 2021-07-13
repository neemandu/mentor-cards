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
}
