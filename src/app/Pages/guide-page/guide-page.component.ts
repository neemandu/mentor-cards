import { Component, OnInit } from '@angular/core';
import { MixpanelService } from 'src/app/Services/mixpanel.service';
import { SharedDialogsService } from 'src/app/Services/shared-dialogs.service';

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
    private mixpanelService: MixpanelService, private sharedDialogsService: SharedDialogsService) { }

  ngOnInit(): void {
    
    // track events
    this.mixpanelService.track("PageViewed", { 'Page Title': 'guide-page' });
    this.playerWidth = window.innerWidth;
    this.playerHeight = this.playerWidth / 1.78
  }

  openSiteRulesModal(): void {
    this.sharedDialogsService.openSiteRulesDialog();
  }

  selectedTopicChanged(index: number, title: string): void {
    this.title = title;
    this.selectedBtn = index;
  }

}
