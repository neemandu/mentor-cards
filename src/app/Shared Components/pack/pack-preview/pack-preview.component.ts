import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProgramChoiseDialogComponent } from 'src/app/Pages/no-program-page/program-choise-dialog/program-choise-dialog.component';
import { CardComponent } from 'src/app/Shared Components/card/card.component';

@Component({
  selector: 'app-pack-preview',
  templateUrl: './pack-preview.component.html',
  styleUrls: ['./pack-preview.component.css']
})
export class PackPreviewComponent implements OnInit {

  loadedCards: number = 0;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<PackPreviewComponent>, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  choosePack(): void {
    
  }

  exchangePack(): void {
    
  }

  openChooseProgramModal(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    // dialogConfig.data = usersCurrentProgram;//TODO
    // dialogConfig.maxHeight = '85vh';
    const dialogRef = this.dialog.open(ProgramChoiseDialogComponent, dialogConfig);
    var dialogSub = dialogRef.afterClosed().subscribe(() => {
      dialogSub.unsubscribe();
    });
  }

}
