import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DynamicDialogData } from 'src/app/Objects/dynamic-dialog-data';
import { GroupUser } from 'src/app/Objects/user-related';
import { DynamicDialogYesNoComponent } from '../dynamic-dialog-yes-no/dynamic-dialog-yes-no.component';

@Component({
  selector: 'app-new-edit-group-user-dialog',
  templateUrl: './new-edit-group-user-dialog.component.html',
  styleUrls: ['./new-edit-group-user-dialog.component.css']
})
export class NewEditGroupUserDialogComponent implements OnInit {

  groupUserForm: FormGroup;


  constructor(public dialogRef: MatDialogRef<NewEditGroupUserDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: GroupUser,
    private formBuilder: FormBuilder, public dialog: MatDialog) { }


  ngOnInit(): void {
    this.groupUserForm = this.formBuilder.group({
      email: [this.data ? this.data.email : '', [Validators.required, Validators.email]],
      role: [this.data ? this.data.role : '', Validators.required],
    });
  }

  get formControls() { return this.groupUserForm.controls; }

  saveChanges(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = new DynamicDialogData("שמירת משתמש", "האם לשמור משתמש זה?", "אישור", "ביטול")
    const dialogRef = this.dialog.open(DynamicDialogYesNoComponent, dialogConfig);
    var dialogSub = dialogRef.afterClosed().subscribe((res: boolean) => {
      dialogSub.unsubscribe();
      if (res) {
        console.log("file: new-edit-group-user-dialog.component.ts ~ line 40 ~ dialogSub ~ res", res)
        this.data = new GroupUser();
        this.data.email = this.formControls.email.value;
        this.data.role = this.formControls.role.value;
        this.dialogRef.close(this.data);
      }
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
