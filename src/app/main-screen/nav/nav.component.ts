import { Component, NgZone, OnInit } from '@angular/core';
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

  constructor(public dialog: MatDialog, private userAuthService: UserAuthService, public router: Router, private ngZone: NgZone) {
  }

  ngOnInit() {
    this.userAuthService.loggedInEmmiter.subscribe((userAttributes) => {
      this.loggedInName = userAttributes.name;
      this.loggedIn = true;
    })
  }

  public navigate(path: string): void {
    this.ngZone.run(() => this.router.navigate([path]));
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
      })
      .catch(err => console.log(err));
  }

}
