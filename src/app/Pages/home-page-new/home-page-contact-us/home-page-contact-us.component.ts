import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { APIService, CreateContactUsModelInput } from 'src/app/API.service';
import { LangDirectionService } from 'src/app/Services/LangDirectionService.service';
import { MixpanelService } from 'src/app/Services/mixpanel.service';
import { OverlaySpinnerService } from 'src/app/Services/overlay-spinner.service';
import { UserAuthService } from 'src/app/Services/user-auth.service';

@Component({
  selector: 'app-home-page-contact-us',
  templateUrl: './home-page-contact-us.component.html',
  styleUrls: ['./home-page-contact-us.component.css']
})
export class HomePageContactUsComponent implements OnInit {

  contactForm: FormGroup;

  constructor(private overlaySpinnerService: OverlaySpinnerService,
    private formBuilder: FormBuilder,
    private api: APIService,
    public langDirectionService: LangDirectionService,
    private userAuthService: UserAuthService,
    private mixpanelService: MixpanelService) {
    this.overlaySpinnerService.changeOverlaySpinner(false);
  }

  ngOnInit(): void {
    // track events
    this.mixpanelService.track("PageViewed", { 'Page Title': 'contact-us' });

    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required]],
      phone: ['', Validators.required],
      content: ['', Validators.required],
    });
  }

  get formControls() { return this.contactForm.controls; }

  sendContent() {
    this.overlaySpinnerService.changeOverlaySpinner(true);
    var input: CreateContactUsModelInput = {
      "name": this.formControls.name.value,
      "content": this.formControls.content.value,
      "email": this.formControls.email.value,
      "phone": this.formControls.phone.value
    }
    this.api.CreateContactUsModel(input).then(res => {
      this.overlaySpinnerService.changeOverlaySpinner(false);
      this.userAuthService._snackBar.open('תודה! נהיה איתך בקשר בזמן הקרוב!', '', {
        duration: 5000,
        panelClass: ['rtl-snackbar']
      });
      this.contactForm.reset();
    }, reject => {
      this.overlaySpinnerService.changeOverlaySpinner(false);
      this.userAuthService._snackBar.open('קרתה שגיאה בעת שליחת המידע, אנא נסו שנית מעט מאוחר יותר', '', {
        duration: 10000,
        panelClass: ['rtl-snackbar']
      });
    })
  }

}
