import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserAuthService } from 'src/app/Services/user-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  loggedIn: boolean = false;
  loggedInName: string;

  constructor(public dialog: MatDialog, private userAuthService: UserAuthService, public router: Router) {
  }

  ngOnInit() {
    this.userAuthService.loggedInEmmiter.subscribe((userAttributes) => {
      this.loggedInName = userAttributes.name;
      this.loggedIn = true;
    })
  }

  // loginRegister(): void {
  //   const dialogConfig = new MatDialogConfig();
  //   dialogConfig.disableClose = false;
  //   dialogConfig.autoFocus = true;
  //   dialogConfig.maxHeight = '85vh';
  //   this.dialog.open(UserRelatedDialogComponent, dialogConfig);
  // }

  logout(): void {
    this.userAuthService.logOut()
      .then(data => {
        this.loggedInName = undefined;
        this.loggedIn = false;
        this.userAuthService._snackBar.open('להתראות, ועד הפעם הבאה!', '', {
          duration: 3000,
          panelClass: ['rtl-snackbar']
        });
        // this.router.navigate(['no-program-page']);
      })
      .catch(err => console.log(err));
  }

}
