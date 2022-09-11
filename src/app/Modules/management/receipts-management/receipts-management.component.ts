import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { APIService } from 'src/app/API.service';
import { ManagementService } from 'src/app/Services/management.service';
import { NewEditReceiptDialogComponent } from '../../dialogs/new-edit-receipt-dialog/new-edit-receipt-dialog.component';

@Component({
  selector: 'app-receipts-management',
  templateUrl: './receipts-management.component.html',
  styleUrls: ['./receipts-management.component.css']
})
export class ReceiptsManagementComponent implements OnInit {


  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['edit', 'number', 'email', 'fullName', 'clientAddress', 'date', 'item', 'type'];
  receiptsData: any[];

  constructor(private api: APIService, public dialog: MatDialog, public mngService: ManagementService) { }

  ngOnInit(): void {
    this.mngService.overlaySpinner(true);
    this.dataSource = new MatTableDataSource(this.receiptsData);
    this.getAllData();
  }

  getAllData(): void {
    this.api.ListInvoicess().then((res) => {
      console.log("🚀 ~ file: receipts-management.component.ts ~ line 31 ~ this.api.ListReceiptsIds ~ res", res)
      this.receiptsData = [...res.items]
      this.dataSource = new MatTableDataSource(this.receiptsData.sort((a, b) => b.invoiceRunningId - a.invoiceRunningId));
      this.mngService.overlaySpinner(false);
    });
  }

  newEdit(oldReceipt?, index?): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = { receipt: oldReceipt };
    const dialogRef = this.dialog.open(NewEditReceiptDialogComponent, dialogConfig);
    var dialogSub = dialogRef.afterClosed().subscribe(newReceipt => {
      dialogSub.unsubscribe();
      if (!newReceipt) return;
      this.mngService.overlaySpinner(true);
      (oldReceipt ? this.api.UpdateInvoices(newReceipt) : this.api.CreateInvoices(newReceipt)).then(res => {
        console.log("🚀 ~ file: organization-management.component.ts ~ line 49 ~ res", res)
        if (oldReceipt) {//update
          this.receiptsData.splice(index, 1, res);
          this.mngService.snackBarPositive("הקבלה עודכנה בהצלחה");
        }
        else {//new
          this.receiptsData.push(res);
          this.mngService.snackBarPositive("הקבלה נוספה בהצלחה");
        }
        this.dataSource = new MatTableDataSource(this.receiptsData);
        this.mngService.overlaySpinner(false);
      }, error => {
        this.mngService.overlaySpinner(false);
        this.mngService.snackBarNegative("קרתה שגיאה, נסו שוב מאוחר יותר");
        console.log("🚀 ~ file: organization-management.component.ts ~ line 50 ~ error", error)
      });

    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
