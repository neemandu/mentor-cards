import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { APIService } from 'src/app/API.service';
import { DynamicDialogData } from 'src/app/Objects/dynamic-dialog-data';
import { ManagementService } from 'src/app/Services/management.service';
import { DynamicDialogYesNoComponent } from 'src/app/Shared Components/Dialogs/dynamic-dialog-yes-no/dynamic-dialog-yes-no.component';
import { NewEditOrganizationComponent } from '../../dialogs/new-edit-organization/new-edit-organization.component';
import { OrgMembersDialogComponent } from '../../dialogs/org-members-dialog/org-members-dialog.component';

@Component({
  selector: 'app-organization-management',
  templateUrl: './organization-management.component.html',
  styleUrls: ['./organization-management.component.css']
})
export class OrganizationManagementComponent implements OnInit {

  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['edit', 'remove', 'name', 'trialLength', 'amountOfPacks', 'orgUsers'];
  orgsData: any[];

  constructor(private api: APIService, public dialog: MatDialog, public mngService: ManagementService) { }

  ngOnInit(): void {
    this.mngService.overlaySpinner(true);
    this.dataSource = new MatTableDataSource(this.orgsData);
    this.getAllData();
  }

  getAllData(): void {
    this.api.ListOrganizationss().then((res) => {
      this.orgsData = [...res.items]
      this.dataSource = new MatTableDataSource(this.orgsData);
      this.mngService.overlaySpinner(false);
    });
  }

  newEdit(oldOrg?, index?): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = { org: oldOrg, allOrgs: this.orgsData };
    const dialogRef = this.dialog.open(NewEditOrganizationComponent, dialogConfig);
    var dialogSub = dialogRef.afterClosed().subscribe(newOrg => {
      dialogSub.unsubscribe();
      if (!newOrg) return;
      this.mngService.overlaySpinner(true);
      (oldOrg ? this.api.UpdateOrganizationMembership(newOrg) : this.api.CreateOrganizationMembership(newOrg)).then(res => {
        console.log("🚀 ~ file: organization-management.component.ts ~ line 49 ~ res", res)
        if (oldOrg) {//update
          oldOrg.membership = res;
          this.orgsData.splice(index, 1, oldOrg);
          this.dataSource = new MatTableDataSource(this.orgsData);
          this.mngService.overlaySpinner(false);
          this.mngService.snackBarPositive("הארגון עודכן בהצלחה");
        }
        else {//new
          this.createNewOrg(res.id);
        }
      }, error => {
        this.mngService.overlaySpinner(false);
        this.mngService.snackBarNegative("קרתה שגיאה, נסו שוב מאוחר יותר");
        console.log("🚀 ~ file: organization-management.component.ts ~ line 50 ~ error", error)
      });

    });
  }

  createNewOrg(orgId: string): void {
    this.api.CreateOrganizations({ organizationsMembershipId: orgId }).then(res => {
      this.orgsData = [...this.orgsData, res];
      this.dataSource = new MatTableDataSource(this.orgsData);
      this.mngService.overlaySpinner(false);
      this.mngService.snackBarPositive("הארגון נשמר בהצלחה");
    }, error => {
      console.log("🚀 ~ file: organization-management.component.ts ~ line 64 ~ this.api.CreateOrganizations ~ error", error)
      this.mngService.overlaySpinner(false);
      this.mngService.snackBarNegative("קרתה שגיאה, נסו שוב מאוחר יותר");
    })
  }

  remove(org, index): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = new DynamicDialogData("מחיקת קוד הטבה", [`האם למחוק את ארגון "${org.membership.name}"`], "אישור", "ביטול")
    const dialogRef = this.dialog.open(DynamicDialogYesNoComponent, dialogConfig);
    var dialogSub = dialogRef.afterClosed().subscribe((res: boolean) => {
      dialogSub.unsubscribe();
      if (!res) return;
      this.mngService.overlaySpinner(true);
      this.api.DeleteOrganizations({ id: org.id }).then(res => {
        this.mngService.overlaySpinner(false);
        this.orgsData.splice(index, 1);
        this.dataSource = new MatTableDataSource(this.orgsData);
        this.mngService.snackBarPositive("הארגון נמחק בהצלחה");
      }, error => {
        this.mngService.snackBarNegative("קרתה שגיאה, נסו שוב מאוחר יותר");
        console.log("🚀 ~ file: coupon-codes-management.component.ts ~ line 49 ~ this.api.DeleteCouponCodes ~ error", error)
      });
    });
  }

  editMembers(org, index): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = org;
    dialogConfig.width = '30vw';
    const dialogRef = this.dialog.open(OrgMembersDialogComponent, dialogConfig);
    var dialogSub = dialogRef.afterClosed().subscribe((res: string[]) => {
      dialogSub.unsubscribe();
      if (!res) return;
      this.mngService.overlaySpinner(true);
      this.api.UpdateOrganizations({ id: org.id, membersEmails: res }).then(res => {
        this.mngService.overlaySpinner(false);
        this.orgsData.splice(index, 1, res);
        this.dataSource = new MatTableDataSource(this.orgsData);
        this.mngService.overlaySpinner(false);
        this.mngService.snackBarPositive("רשימת המיילים עודכנה בהצלחה");
      }, error => {
        this.mngService.snackBarNegative("קרתה שגיאה, נסו שוב מאוחר יותר");
        console.log("🚀 ~ file: organization-management.component.ts ~ line 123 ~ this.api.UpdateOrganizations ~ error", error)
      });
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
