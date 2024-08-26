import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { APIService } from 'src/app/API.service';
import { OverlaySpinnerService } from 'src/app/Services/overlay-spinner.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { addPackDialogComponent } from './add-dialog/add-dialog.component';
import { DynamicDialogYesNoComponent } from 'src/app/Shared Components/Dialogs/dynamic-dialog-yes-no/dynamic-dialog-yes-no.component';
import { DynamicDialogData } from 'src/app/Objects/dynamic-dialog-data';
import { EditPackDialogComponent } from './edit-dialog/edit-dialog.component';

export interface Element {
  id: string;
  name: string;
  Actions: string;
}


@Component({
  selector: 'app-packs-management',
  templateUrl: './packs-management.component.html',
  styleUrls: ['./packs-management.component.css']
})
export class PacksManagementComponent implements OnInit {

  displayedColumn: string[] = [
    'id',
    'name',
    'actions',
  ];

  packData:any = [];

  dataSource: MatTableDataSource<Element>;

  constructor(
    private dialog: MatDialog,
    private apiService: APIService,
    private overlaySpinnerService: OverlaySpinnerService,
  ) {
    this.overlaySpinnerService.changeOverlaySpinner(false);
   }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.getPackData();
    this.dataSource = new MatTableDataSource(this.packData);
  }



  getPackData(): void {
    this.overlaySpinnerService.changeOverlaySpinner(true);
    this.apiService.ListCardsPacks().then((res) => {
      console.log(res)
      this.packData = res.items;  
      this.dataSource = new MatTableDataSource(this.packData);
      this.dataSource.sort = this.sort;
      this.overlaySpinnerService.changeOverlaySpinner(false);
        
        console.log(this.packData, 'here');
      (error) => {
        this.overlaySpinnerService.changeOverlaySpinner(false);
        console.log(
          'file: manage-affiliate.component.ts ~ line 42 ~ this.api.ListCardsPacks ~ error',
          error
        );
      }

    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openAddDialog() {
    const addDialofRef = this.dialog.open(addPackDialogComponent, {
      width: '700px',
      maxHeight:'500px'
    });

    addDialofRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(result);
        this.apiService.CreateCardsPack(result).then(
          (res) => {
            this.packData = [...this.packData, res];
            this.overlaySpinnerService.changeOverlaySpinner(false);
            this.getPackData();
          },
          (error) => {
            this.overlaySpinnerService.changeOverlaySpinner(false);
            // console.log(
            //   'file: manage-affiliate.component.ts ~ line 42 ~ this.api.CreateAffiliate ~ error',
            //   error
            // );
          }
        );
      }
    });
  }

  deleteItem(id: string): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = new DynamicDialogData(
      'מחיקת שותף',
      ['האם למחוק שותף זה?'],
      'אישור',
      'ביטול'
    );
    const dialogRef = this.dialog.open(
      DynamicDialogYesNoComponent,
      dialogConfig
    );
    var dialogSub = dialogRef.afterClosed().subscribe((result: boolean) => {
      dialogSub.unsubscribe();
      if (result) {
        this.overlaySpinnerService.changeOverlaySpinner(true);
        this.apiService
          .DeleteCardsPack({ id: this.packData.find(item => item.id === id).id  })
          .then(
            (res) => {
              // this.affiliateData.splice(id, 1);
              this.overlaySpinnerService.changeOverlaySpinner(false);
              this.getPackData();
            },
            (error) => {
              this.overlaySpinnerService.changeOverlaySpinner(false);
              console.log(
                'file: manage-affiliate.component.ts ~ line 42 ~ this.api.DeleteAffiliate ~ error',
                error
              );
            }
          );
      }
    });
  }

  editItem(id: string) {
    const item = this.packData.find(item => item.id === id);
    console.log(this.packData,'packData');
    console.log(item);

    const editDialogRef = this.dialog.open(EditPackDialogComponent, {
      width: '500px',
      maxHeight: '800px',
      data: item,
    });

    var sub = editDialogRef
      .afterClosed()
      .subscribe((newAffiliateValue: any) => {
        sub.unsubscribe();
        console.log(newAffiliateValue , 'here aff');
        if (newAffiliateValue) {
          this.overlaySpinnerService.changeOverlaySpinner(true);
          if (id != undefined) {
            //has id
            this.apiService
              .UpdateCardsPack({
                id: this.packData.find(item => item.id === id).id,
                ...newAffiliateValue,
              })
              .then(
                (res) => {
                  this.packData[id] = res;
                  this.overlaySpinnerService.changeOverlaySpinner(false);
                  this.getPackData();
                },
                (error) => {
                  this.overlaySpinnerService.changeOverlaySpinner(false);
                  console.log(
                    'file: manage-affiliate.component.ts ~ line 42 ~ this.api.UpdateAffiliate ~ error',
                    error
                  );
                }
              );
          } else {
            //has no id
            this.apiService.CreateAffiliate(newAffiliateValue).then(
              (res) => {
                this.packData.push(res);
                this.overlaySpinnerService.changeOverlaySpinner(false);
              },
              (error) => {
                this.overlaySpinnerService.changeOverlaySpinner(false);
                console.log(
                  'file: manage-affiliate.component.ts ~ line 42 ~ this.api.UpdateAffiliate ~ error',
                  error
                );
              }
            );
          }
        }
      });
  }

}
