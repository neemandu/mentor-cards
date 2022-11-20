import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { APIService } from 'src/app/API.service';
import { DynamicDialogData } from 'src/app/Objects/dynamic-dialog-data';
import { OverlaySpinnerService } from 'src/app/Services/overlay-spinner.service';
import { UserAuthService } from 'src/app/Services/user-auth.service';
import { DynamicDialogYesNoComponent } from 'src/app/Shared Components/Dialogs/dynamic-dialog-yes-no/dynamic-dialog-yes-no.component';
import { PlanTableObj } from '../user-page.component';

@Component({
  selector: 'app-plan-table',
  templateUrl: './plan-table.component.html',
  styleUrls: ['./plan-table.component.css']
})
export class PlanTableComponent implements OnInit {

  displayedColumns: string[] = ['planName', 'price', 'startDate', 'nextChargeDate', 'yearlyMonthly', 'updateDate', 'cancel'];
  @Input() tableData: PlanTableObj[];
  dataSource: MatTableDataSource<PlanTableObj>

  constructor(public dialog: MatDialog, private overlaySpinnerService: OverlaySpinnerService, private api: APIService,
    private userAuthService: UserAuthService) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<PlanTableObj>(this.tableData);
    console.log("🚀 ~ file: plan-table.component.ts ~ line 27 ~ ngOnInit ~ this.tableData", this.tableData)
  }

  openCancelDialogModal(element: PlanTableObj, index: number): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = new DynamicDialogData("ביטול החיוב האוטומטי", ["האם לבטל את החיוב האוטומטי לתכנית זו?"], "אישור", "ביטול")
    const dialogRef = this.dialog.open(DynamicDialogYesNoComponent, dialogConfig);
    var dialogSub = dialogRef.afterClosed().subscribe(res => {
      dialogSub.unsubscribe();
      if (res) {
        this.overlaySpinnerService.changeOverlaySpinner(true)
        this.api.Unsubscribe({ 'username': this.userAuthService.userData.username, 'providerTransactionId': element.providerTransactionId }).then((res2) => {
          this.overlaySpinnerService.changeOverlaySpinner(false);
          if(res2) {
            this.tableData.splice(index, 1);
            this.dataSource = new MatTableDataSource<PlanTableObj>(this.tableData);
            // window.location.reload();
            this.userAuthService._snackBar.open('החיוב האוטומטי בוטל בהצלחה', '', {
              duration: 10000,
              panelClass: ['rtl-snackbar']
            });
          }
          else {
            console.error('Plan wasn`t canceled');
            this.userAuthService._snackBar.open('תכנית לא בוטלה', '', {
              duration: 10000,
              panelClass: ['rtl-snackbar']
            });
          }
        }, reject => {
          console.log("file: user-page.component.ts ~ line 77 ~ this.api.Unsubscribe ~ reject", reject)
          this.overlaySpinnerService.changeOverlaySpinner(false)
          this.userAuthService._snackBar.open('שגיאה בביטול התכנית. נסו שנית בעוד מספר דקות', '', {
            duration: 10000,
            panelClass: ['rtl-snackbar']
          });
        })
      }
    });
  }

}
