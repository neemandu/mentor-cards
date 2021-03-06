import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { OverlaySpinnerService } from '../Services/overlay-spinner.service';
import { SharedDialogsService } from '../Services/shared-dialogs.service';
import { SiteRulesDialogComponent } from '../Shared Components/Dialogs/site-rules-dialog/site-rules-dialog.component';

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.css']
})
export class MainScreenComponent implements OnInit, OnDestroy {

  subs: Subscription = new Subscription();
  showSpinner: boolean = false;

  constructor(private overlaySpinnerService: OverlaySpinnerService, public dialog: MatDialog, private sharedDialogsService: SharedDialogsService) { }

  ngOnInit() {
    this.subs.add(this.overlaySpinnerService.changeOverlaySpinnerEmmiter.subscribe((show: boolean) => {
      this.showSpinner = show
    }));
  }

  openSiteRulesModal(): void {
    this.sharedDialogsService.openSiteRulesDialog();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
