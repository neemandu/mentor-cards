import { Component, OnInit } from '@angular/core';
import { LangDirectionService } from 'src/app/Services/LangDirectionService.service';
import { MixpanelService } from 'src/app/Services/mixpanel.service';
import { SharedDialogsService } from 'src/app/Services/shared-dialogs.service';

@Component({
  selector: 'app-guide-page',
  templateUrl: './guide-page.component.html',
  styleUrls: ['./guide-page.component.css']
})
export class GuidePageComponent implements OnInit {
  selectedBtn: number = 1;
  title: string;
  playerWidth: number;
  playerHeight: number;

  title_Hebrew :string[] = [
      "מה זה מנטור - קארדס?",
      "איך מתחברים לאתר?",
      "איך מזינים קוד הטבה?",
      "ספרי ההדרכה שלנו",
      "ערכות הקלפים שלנו",
      "תכניות, מחירים וביטולים",
      "עקרונות מפתח בעבודה עם קלפים",
      "איך עובדים עם ערכת קלפים דיגיטלית?"
  ]

  title_English: string[] = [
    "What is Mentor-Cards?",
    "How to connect to the site?",
    "How to enter a coupon code?",
    "Our guide books",
    "Our card sets",
    "Plans, prices, and cancellations",
    "Key principles in working with cards",
    "How to work with a digital card set?"
  ]
  constructor(
    private mixpanelService: MixpanelService ,  
    public langDirectionService: LangDirectionService
    ) { }

  ngOnInit(): void {
    
    // track events
    this.mixpanelService.track("PageViewed", { 'Page Title': 'guide-page' });
    this.playerWidth = window.innerWidth;
    this.playerHeight = this.playerWidth / 1.78
    if(this.langDirectionService.currentLangDirection == 'rtl') {
      this.title = this.title_Hebrew[0];
    }
    else {
      this.title = this.title_English[0];
    }
  }

  selectedTopicChanged(index: number): void {
    if(this.langDirectionService.currentLangDirection == 'rtl') {
      this.title = this.title_Hebrew[index-1];
    }
    else {
      this.title = this.title_English[index-1];
    }
    this.selectedBtn = index;
  }

}
