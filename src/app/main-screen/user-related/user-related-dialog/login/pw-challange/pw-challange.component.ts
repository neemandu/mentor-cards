import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';
import { OverlaySpinnerService } from 'src/app/Services/overlay-spinner.service';

@Component({
  selector: 'app-pw-challange',
  templateUrl: './pw-challange.component.html',
  styleUrls: ['./pw-challange.component.css']
})
export class PwChallangeComponent implements OnInit {

  @Input() userData: any;
  @Input() oldPw: string;
  @Output() pwChangedEmitter: EventEmitter<string> = new EventEmitter<string>();

  newPwForm: FormGroup = this.formBuilder.group({
    userName: [{ value: '', disabled: true }, Validators.required],
    password: ['', [Validators.required, Validators.minLength(8)]],
    passwordConfirm: ['', [Validators.required, Validators.minLength(8)]],
  });
  hidePW: boolean = true;
  hidePWConfirm: boolean = true;

  constructor(private formBuilder: FormBuilder, private overlaySpinnerService: OverlaySpinnerService,
    private amplifyAuthService: AuthService) { }

  ngOnInit(): void {
    this.newPwForm.controls.userName.setValue(this.userData.challengeParam.userAttributes.email)
  }

  checkPasswordConfirm(): void {
    if (this.newPwForm.controls.password.value !== this.newPwForm.controls.passwordConfirm.value)
      this.newPwForm.controls.passwordConfirm.setErrors({ 'notSamePassword': true })
  }
}
