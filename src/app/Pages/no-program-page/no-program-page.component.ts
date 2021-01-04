import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OverlaySpinnerService } from 'src/app/Services/overlay-spinner.service';
import { ProgramChoiseDialogComponent } from './program-choise-dialog/program-choise-dialog.component';

@Component({
  selector: 'app-no-program-page',
  templateUrl: './no-program-page.component.html',
  styleUrls: ['./no-program-page.component.css']
})
export class NoProgramPageComponent implements OnInit {


  constructor(private overlaySpinnerService: OverlaySpinnerService, public dialog: MatDialog, public router: Router) {
    this.overlaySpinnerService.changeOverlaySpinner(false);
  }

  ngOnInit(): void {
  }

  openChooseProgramModal(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    // dialogConfig.maxHeight = '85vh';
    const dialogRef = this.dialog.open(ProgramChoiseDialogComponent, dialogConfig);
    var dialogSub = dialogRef.afterClosed().subscribe(res => {
      dialogSub.unsubscribe();
      if (res) {
        this.router.navigate(['all-packs-page']);
      }
    });
  }

}
