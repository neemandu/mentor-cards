import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { APIService, CreateContactUsModelInput } from 'src/app/API.service';
import { OverlaySpinnerService } from 'src/app/Services/overlay-spinner.service';
import { UserAuthService } from 'src/app/Services/user-auth.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  contactForm: FormGroup;

  constructor(private overlaySpinnerService: OverlaySpinnerService, private formBuilder: FormBuilder, private api: APIService, private userAuthService: UserAuthService) {
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

  // sendEmail(): void {
  //   var yourMessage = this.formControls.content.value;
  //   var subject = this.formControls.name.value + ' - ' + this.formControls.email.value;;
  //   document.location.href = "mailto:yanivknobel@googlemail.com?subject="
  //       + encodeURIComponent(subject)
  //       + "&body=" + encodeURIComponent(yourMessage);
  // }

  sendContent() {
    this.overlaySpinnerService.changeOverlaySpinner(true);
    var input: CreateContactUsModelInput = { "name": this.formControls.name.value, "content": this.formControls.content.value, "email": this.formControls.email.value }
    this.api.CreateContactUsModel(input).then(res => {
      // console.log("file: contact-us.component.ts ~ line 41 ~ this.api.CreateContactUsModel ~ res", res)
      this.overlaySpinnerService.changeOverlaySpinner(false);
      this.userAuthService._snackBar.open('תודה! נהיה איתך בקשר בזמן הקרוב!', '', {
        duration: 5000,
        panelClass: ['rtl-snackbar']
      });
      this.contactForm.reset();
    }, reject => {
      // console.log("file: contact-us.component.ts ~ line 44 ~ this.api.CreateContactUsModel ~ reject", reject)
      this.overlaySpinnerService.changeOverlaySpinner(false);
      this.userAuthService._snackBar.open('קרתה שגיאה בעת שליחת המידע, אנא נסו שנית מעט מאוחר יותר', '', {
        duration: 10000,
        panelClass: ['rtl-snackbar']
      });
    })
  }

  //https://medium.com/@sobus.piotr/integrate-google-api-with-your-angular-application-f06f8b879369
}
