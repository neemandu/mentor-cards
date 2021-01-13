import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { APIService, groupUsersListInput } from 'src/app/API.service';
import { DynamicDialogData } from 'src/app/Objects/dynamic-dialog-data';
import { GroupData, GroupUser, UserData } from 'src/app/Objects/user-related';
import { OverlaySpinnerService } from 'src/app/Services/overlay-spinner.service';
import { UserAuthService } from 'src/app/Services/user-auth.service';
import { DynamicDialogYesNoComponent } from 'src/app/Shared Components/Dialogs/dynamic-dialog-yes-no/dynamic-dialog-yes-no.component';
import { NewEditGroupUserDialogComponent } from 'src/app/Shared Components/Dialogs/new-edit-group-user-dialog/new-edit-group-user-dialog.component';

@Component({
  selector: 'app-group-management',
  templateUrl: './group-management.component.html',
  styleUrls: ['./group-management.component.css']
})
export class GroupManagementComponent implements OnInit {

  groupData: GroupData;
  userData: UserData;
  dataSource: MatTableDataSource<GroupUser>;
  Subscription: Subscription = new Subscription();
  displayedColumns: string[] = ['email', 'role', 'edit', 'delete'];

  constructor(private overlaySpinnerService: OverlaySpinnerService, private userAuthService: UserAuthService, public dialog: MatDialog, private api: APIService) {
    if (this.userAuthService.groupData) {
      this.userData = this.userAuthService.userData;
      this.groupData = this.userAuthService.groupData;
      this.dataSource = new MatTableDataSource(this.groupData.groupUsers);
    }
    this.overlaySpinnerService.changeOverlaySpinner(false)
  }

  ngOnInit(): void {
    this.Subscription.add(this.userAuthService.groupDataEmmiter.subscribe((groupData: GroupData) => {
      console.log("file: group-management.component.ts ~ line 31 ~ this.Subscription.add ~ groupData", groupData)
      this.groupData = groupData;
      this.dataSource = new MatTableDataSource(this.groupData.groupUsers);
      this.overlaySpinnerService.changeOverlaySpinner(false);
    }));
  }

  addEditGroupUser(groupUser?: GroupUser): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = groupUser;
    const dialogRef = this.dialog.open(NewEditGroupUserDialogComponent, dialogConfig);
    var sub = dialogRef.afterClosed().subscribe((res: GroupUser) => {
      console.log("file: group-management.component.ts ~ line 49 ~ sub ~ res", res)
      sub.unsubscribe();
      if (res) {
        this.overlaySpinnerService.changeOverlaySpinner(true)
        if (groupUser) {
          groupUser = res;
        }
        else {
          this.groupData.groupUsers.push(res);
          this.dataSource = new MatTableDataSource(this.groupData.groupUsers);
        }
        this.saveGroup();
      }
    });
  }

  deleteGroupMember(groupUser?: GroupUser): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = new DynamicDialogData("מחיקת משתמש", "האם למחוק משתמש זה?", "אישור", "ביטול")
    const dialogRef = this.dialog.open(DynamicDialogYesNoComponent, dialogConfig);
    var dialogSub = dialogRef.afterClosed().subscribe((res: boolean) => {
      dialogSub.unsubscribe();
      if (res) {
        this.overlaySpinnerService.changeOverlaySpinner(true)
        this.groupData.groupUsers.splice(this.groupData.groupUsers.indexOf(groupUser), 1);
        this.saveGroup();
      }
    });
  }

  saveGroup(): void {
    var groupList: groupUsersListInput = { 'usernamesList': this.groupData.groupUsers }
    this.api.UpdateGroupUsersList(groupList).then(res => {
      console.log("file: group-management.component.ts ~ line 61 ~ this.api.UpdateGroupUsersList ~ res", res)
      this.overlaySpinnerService.changeOverlaySpinner(false)
    }, reject => {
      console.log("file: group-management.component.ts ~ line 64 ~ this.api.UpdateGroupUsersList ~ reject", reject)
      this.overlaySpinnerService.changeOverlaySpinner(false)
    })
  }

}
