import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
    private formBuilder: FormBuilder
  ) {
    this.overlaySpinnerService.changeOverlaySpinner(false);
  }

  ngOnInit(): void {
    // setTimeout(() => { this.overlaySpinnerService.changeOverlaySpinner(false); }, 20);
    this.affiliateForm = this.formBuilder.group({
      firstname: [''],
      lastname: [''],
      email: [''],
      mobile: [''],
    });
  }

  scrollToFormContainer(): void {
    this.formContainer.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

  onSubmit(): void {
    console.log(this.affiliateForm.value);
    // rest of your submit logic
  }
}
