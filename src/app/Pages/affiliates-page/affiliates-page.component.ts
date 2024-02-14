import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MixpanelService, EventTypes } from 'src/app/Services/mixpanel.service';
import { UserAuthService } from 'src/app/Services/user-auth.service';
import { APIService, CreateContactUsModelInput } from 'src/app/API.service';
import { LangDirectionService } from 'src/app/Services/LangDirectionService.service';
import { OverlaySpinnerService } from 'src/app/Services/overlay-spinner.service';

@Component({
  selector: 'app-affiliates-page',
  templateUrl: './affiliates-page.component.html',
  styleUrls: ['./affiliates-page.component.css'],
})
export class AffiliatesPageComponent implements OnInit {
  @ViewChild('formContainer') formContainer: ElementRef;

  affiliateForm: FormGroup;

  constructor(
    private overlaySpinnerService: OverlaySpinnerService,
    public langDirectionService: LangDirectionService,
    private formBuilder: FormBuilder,
    private mixpanelService: MixpanelService,
    private userAuthService: UserAuthService,
    private api: APIService, 
  ) {
    this.overlaySpinnerService.changeOverlaySpinner(false);
  }

  ngOnInit(): void {
    this.mixpanelService.track("PageViewed", { 'Page Title': 'affiliates-page' });
    // setTimeout(() => { this.overlaySpinnerService.changeOverlaySpinner(false); }, 20);
    this.affiliateForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: [''],
    });
  }

  scrollToFormContainer(): void {
    this.formContainer.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }


  
  get formControls() { return this.affiliateForm.controls; }

  onSubmit(): void {
    this.mixpanelService.track("ButtonClicked", { "Name": "Affiliate request"});
    this.overlaySpinnerService.changeOverlaySpinner(true);
    var input: CreateContactUsModelInput = { 
      "name": this.formControls.firstname.value + " " + this.formControls.lastname.value, 
      "content": "Affiliates Request - " + this.formControls.mobile.value, 
      "email": this.formControls.email.value 
    }
    this.api.CreateContactUsModel(input).then(res => {
      // console.log("file: contact-us.component.ts ~ line 41 ~ this.api.CreateContactUsModel ~ res", res)
      this.overlaySpinnerService.changeOverlaySpinner(false);
      this.userAuthService._snackBar.open('תודה! נהיה איתך בקשר בזמן הקרוב!', '', {
        duration: 5000,
        panelClass: ['rtl-snackbar']
      });
      this.affiliateForm.reset();
    }, reject => {
      // console.log("file: contact-us.component.ts ~ line 44 ~ this.api.CreateContactUsModel ~ reject", reject)
      this.overlaySpinnerService.changeOverlaySpinner(false);
      this.userAuthService._snackBar.open('קרתה שגיאה בעת שליחת המידע, אנא נסו שנית מעט מאוחר יותר', '', {
        duration: 10000,
        panelClass: ['rtl-snackbar']
      });
    })
  }
}
