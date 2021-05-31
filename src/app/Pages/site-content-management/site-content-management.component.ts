import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DynamicDialogData } from 'src/app/Objects/dynamic-dialog-data';
import { OverlaySpinnerService } from 'src/app/Services/overlay-spinner.service';
import { DynamicDialogYesNoComponent } from 'src/app/Shared Components/Dialogs/dynamic-dialog-yes-no/dynamic-dialog-yes-no.component';
import { NewEditNewsComponent } from 'src/app/Shared Components/Dialogs/new-edit-news/new-edit-news.component';

@Component({
  selector: 'app-site-content-management',
  templateUrl: './site-content-management.component.html',
  styleUrls: ['./site-content-management.component.css']
})
export class SiteContentManagementComponent implements OnInit {

  data: any[] = [
    { 'value': '1 line' },
    { 'value': '2 line' },
    { 'value': '3 line' },
    { 'value': '4 line' },
    { 'value': '5 line' },
  ]

  newsChanged: boolean = false;

  constructor(public dialog: MatDialog, private overlaySpinnerService: OverlaySpinnerService) { }

  ngOnInit(): void {

  }

  addEditNews(index?: any): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = this.data[index];
    const dialogRef = this.dialog.open(NewEditNewsComponent, dialogConfig);
    var sub = dialogRef.afterClosed().subscribe((newNewsValue: any) => {
      sub.unsubscribe();
      if (newNewsValue) {
        index != undefined ? this.data[index].value = newNewsValue : this.data.push({ 'value': newNewsValue });
        this.newsChanged = true;
      }
    });
  }

  deleteNews(index: any): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = new DynamicDialogData("מחיקת חדשות", ["האם למחוק חדשות אלו?"], "אישור", "ביטול")
    const dialogRef = this.dialog.open(DynamicDialogYesNoComponent, dialogConfig);
    var dialogSub = dialogRef.afterClosed().subscribe((res: boolean) => {
      dialogSub.unsubscribe();
      if (res) {
        this.data.splice(index, 1);
        this.newsChanged = true;
      }
    });
  }

  saveNews(): void {
    this.newsChanged = false;
  }

  drop(event: CdkDragDrop<any>) {
    // debugger
    moveItemInArray(this.data, event.previousIndex, event.currentIndex);
    this.newsChanged = true;
  }

}
