import { Component, OnInit } from '@angular/core';
import { SharedDialogsService } from 'src/app/Services/shared-dialogs.service';

@Component({
  selector: 'app-information-bar',
  templateUrl: './information-bar.component.html',
  styleUrls: ['./information-bar.component.css']
})
export class InformationBarComponent implements OnInit {

  constructor(private sharedDialogsService: SharedDialogsService) { }

  ngOnInit(): void {
  }

  openSiteRulesModal(): void {
    this.sharedDialogsService.openSiteRulesDialog();
  }

}
