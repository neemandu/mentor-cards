import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { OverlaySpinnerService } from '../Services/overlay-spinner.service';
import { SiteRulesDialogComponent } from '../Shared Components/Dialogs/site-rules-dialog/site-rules-dialog.component';

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.css']
})
export class MainScreenComponent implements OnInit, OnDestroy {

  subs: Subscription = new Subscription();
  showSpinner: boolean = false;

  constructor(private overlaySpinnerService: OverlaySpinnerService, public dialog: MatDialog) { }

  ngOnInit() {
    this.subs.add(this.overlaySpinnerService.changeOverlaySpinnerEmmiter.subscribe((show: boolean) => {
      this.showSpinner = show
    }));
    var rulesSeen: string = localStorage.getItem("rulesSeen");
    (!rulesSeen || rulesSeen !== 'true') ? this.openSiteRulesModal() : null;
  }

  openSiteRulesModal(): void {
    var rulesSeen: string = localStorage.getItem("rulesSeen");
    const dialogConfig = new MatDialogConfig();
    if (!rulesSeen || rulesSeen !== 'true') {
      dialogConfig.disableClose = true;
      dialogConfig.data = true;
    } else {
      dialogConfig.disableClose = false;
      dialogConfig.data = false;
    }
    dialogConfig.autoFocus = true;
    dialogConfig.maxWidth = '40vw';
    const dialogRef = this.dialog.open(SiteRulesDialogComponent, dialogConfig);
    var dialogSub = dialogRef.afterClosed().subscribe(res => {
      if (res) {
        localStorage.setItem("rulesSeen", 'true')
      }
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
