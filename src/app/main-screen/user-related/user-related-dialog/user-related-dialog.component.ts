import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@Component({
  selector: 'app-user-related-dialog',
  templateUrl: './user-related-dialog.component.html',
  styleUrls: ['./user-related-dialog.component.css']
})
export class UserRelatedDialogComponent implements OnInit {

  // showSpinner: boolean = true;
  @ViewChild(LoginComponent, { static: false }) loginChild: LoginComponent;
  @ViewChild(RegisterComponent, { static: false }) registerChild: RegisterComponent;

  selectedTab: number;

  constructor(public dialogRef: MatDialogRef<UserRelatedDialogComponent>,) { }

  ngOnInit(): void {
  }

  tabChanged(event: any): void {
    this.selectedTab = event.index;
    // console.log("tabChanged -> this.selectedTab", this.selectedTab)
    this.loginChild.resetForms();
    this.registerChild.resetForms();
  }

  loggedIn(): void {
    this.dialogRef.close();
  }
}
