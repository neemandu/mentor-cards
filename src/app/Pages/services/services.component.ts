import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { APIService, CreateContactUsModelInput } from 'src/app/API.service';
import { LangDirectionService } from 'src/app/Services/LangDirectionService.service';
import { OverlaySpinnerService } from 'src/app/Services/overlay-spinner.service';
import { UserAuthService } from 'src/app/Services/user-auth.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  selectedBtn: number = 1;
  title: string = "השירותים שלנו";
  playerWidth: number;
  playerHeight: number;
  contactForm: FormGroup;

  constructor(private overlaySpinnerService: OverlaySpinnerService, private formBuilder: FormBuilder, private api: APIService, private userAuthService: UserAuthService , 
    public langDirectionService: LangDirectionService
    ) { }

  ngOnInit(): void {
    this.playerWidth = window.innerWidth;
    this.playerHeight = this.playerWidth / 1.78    
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      content: ['', [Validators.required]],
    });
  }

  get formControls() { return this.contactForm.controls; }

  selectedTopicChanged(index: number, title: string): void {
    this.title = title;
    this.selectedBtn = index;
  }

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
}
