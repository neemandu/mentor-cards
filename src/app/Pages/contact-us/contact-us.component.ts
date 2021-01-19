import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OverlaySpinnerService } from 'src/app/Services/overlay-spinner.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  contactForm: FormGroup;

  constructor(private overlaySpinnerService: OverlaySpinnerService, private formBuilder: FormBuilder) {
    this.overlaySpinnerService.changeOverlaySpinner(false);
  }

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      content: ['', [Validators.required]],
    });
  }

  get formControls() { return this.contactForm.controls; }

  //https://medium.com/@sobus.piotr/integrate-google-api-with-your-angular-application-f06f8b879369
}
