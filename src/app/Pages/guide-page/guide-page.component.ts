import { Component, OnInit } from '@angular/core';
import { LangDirectionService } from 'src/app/Services/LangDirectionService.service';
import { MixpanelService } from 'src/app/Services/mixpanel.service';

@Component({
  selector: 'app-guide-page',
  templateUrl: './guide-page.component.html',
  styleUrls: ['./guide-page.component.css']
})
export class GuidePageComponent implements OnInit {
  selectedBtn: number = 1;
  title: string = "מה זה מנטור - קארדס?";
  playerWidth: number;
  playerHeight: number;

  constructor(
    private mixpanelService: MixpanelService ,  
    public langDirectionService: LangDirectionService
    ) { }

  ngOnInit(): void {
    
    // track events
    this.mixpanelService.track("PageViewed", { 'Page Title': 'guide-page' });
    this.playerWidth = window.innerWidth;
    this.playerHeight = this.playerWidth / 1.78
  }

  selectedTopicChanged(index: number, title: string): void {
    this.title = title;
    this.selectedBtn = index;
  }

}
