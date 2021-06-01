import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { APIService } from 'src/app/API.service';
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

  data: any[] = [];

  constructor(public dialog: MatDialog, private overlaySpinnerService: OverlaySpinnerService, private api: APIService) { }

  ngOnInit(): void {
    this.overlaySpinnerService.changeOverlaySpinner(true);
    this.api.ListNewss().then(news => {
      this.data = news.items.sort((a, b) => a.order - b.order);
      this.overlaySpinnerService.changeOverlaySpinner(false);
    }, error => {
      this.overlaySpinnerService.changeOverlaySpinner(false);
      console.log("file: site-content-management.component.ts ~ line 42 ~ this.api.ListNewss ~ error", error)
    })
  }

  addEditNews(index?: any): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    dialogConfig.data = this.data[index];
    const dialogRef = this.dialog.open(NewEditNewsComponent, dialogConfig);
    var sub = dialogRef.afterClosed().subscribe((newNewsValue: any) => {
      sub.unsubscribe();
      if (newNewsValue) {
        this.overlaySpinnerService.changeOverlaySpinner(true);
        if (index != undefined) {//has id
          this.api.UpdateNews({ 'id': this.data[index].id, 'message': newNewsValue, 'order': this.data[index].order }).then(res => {
            this.data[index].message = newNewsValue;
            this.overlaySpinnerService.changeOverlaySpinner(false);
          }, error => {
            this.overlaySpinnerService.changeOverlaySpinner(false);
            console.log("file: site-content-management.component.ts ~ line 42 ~ this.api.UpdateNews ~ error", error)
          })
        }
        else {//has no id
          this.api.CreateNews({ 'message': newNewsValue, 'order': this.data.length }).then(res => {
            this.data.push(res);
            this.overlaySpinnerService.changeOverlaySpinner(false);
          }, error => {
            this.overlaySpinnerService.changeOverlaySpinner(false);
            console.log("file: site-content-management.component.ts ~ line 42 ~ this.api.UpdateNews ~ error", error)
          })
        }
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
        this.overlaySpinnerService.changeOverlaySpinner(true);
        this.api.DeleteNews({ 'id': this.data[index].id }).then(res => {
          this.data.splice(index, 1);
          this.overlaySpinnerService.changeOverlaySpinner(false);
        }, error => {
          this.overlaySpinnerService.changeOverlaySpinner(false);
          console.log(error)
        })
      }
    });
  }
  
  drop(event: CdkDragDrop<any>) {
    moveItemInArray(this.data, event.previousIndex, event.currentIndex);
    this.overlaySpinnerService.changeOverlaySpinner(true);
    this.data.forEach((element, index) => {
      element.order = index;//TODO fix save of order to be better
      this.api.UpdateNews({ 'id': element.id, 'message': element.message, 'order': element.order }).then(res => {
        index == this.data.length-1 ? this.overlaySpinnerService.changeOverlaySpinner(false) : null;
      }, error => {
        console.log("file: site-content-management.component.ts ~ line 42 ~ this.api.UpdateNews ~ error", error)
      })
    })
  }

}