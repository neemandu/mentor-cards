import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { LangDirectionService } from 'src/app/Services/LangDirectionService.service';
// import { LoginComponent } from './login/login.component';
// import { RegisterComponent } from './register/register.component';

@Component({
  selector: 'app-user-related-dialog',
  templateUrl: './user-related-dialog.component.html',
  styleUrls: ['./user-related-dialog.component.css']
})
export class UserRelatedDialogComponent implements OnInit {

  // showSpinner: boolean = true;
  // @ViewChild(LoginComponent, { static: false }) loginChild: LoginComponent;
  // @ViewChild(RegisterComponent, { static: false }) registerChild: RegisterComponent;

  selectedTab: number;
  registeredEmail: string;
  registeredPW: string;

  constructor(public dialogRef: MatDialogRef<UserRelatedDialogComponent>,
    public langDirectionService: LangDirectionService,
    ) { }

  ngOnInit(): void {
  }

  tabChanged(event: any): void {
    if (event.index == 1)
      this.registeredEmail = undefined;
    this.selectedTab = event.index;
    // this.selectedTab = event.index;
    // this.loginChild.resetForms();
    // this.registerChild.resetForms();
  }

  registered({email,password}): void {
    this.registeredEmail = email;
    this.registeredPW = password;
    this.selectedTab = 0;
    // this.loginChild.showConfirmUserForm(email)
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
