import { Component, EventEmitter, NgZone, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserAuthService } from 'src/app/Services/user-auth.service';
import { Router } from '@angular/router';
import { OverlaySpinnerService } from 'src/app/Services/overlay-spinner.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  @Output() showSignInModalEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  userAttributes: any;
  loggedIn: boolean = false;

  constructor(private userAuthService: UserAuthService, public router: Router, private ngZone: NgZone, private overlaySpinnerService: OverlaySpinnerService) {
  }

  ngOnInit() {
    this.userAuthService.loggedInEmmiter.subscribe((userAttributes) => {
      // console.log("file: nav.component.ts ~ line 24 ~ this.userAuthService.loggedInEmmiter.subscribe ~ userAttributes", userAttributes)
      this.userAttributes = userAttributes;
      // console.log("🚀 ~ file: nav.component.ts ~ line 21 ~ NavComponent ~ this.userAuthService.loggedInEmmiter.subscribe ~ userAttributes", userAttributes)
      this.loggedIn = true;
    })
    this.userAuthService.signedOutEmmiter.subscribe(() => {
      this.userAttributes = undefined;
      this.loggedIn = false;
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
    this.userAuthService.logOut();
    this.navigate('/home-page');
    // .then(data => {
    //   this.overlaySpinnerService.changeOverlaySpinner(false)
    //   this.loggedInName = undefined;
    //   this.loggedIn = false;
    //   this.navigate('/no-program-page')
    //   this.userAuthService._snackBar.open('להתראות, ועד הפעם הבאה!', '', {
    //     duration: 3000,
    //     panelClass: ['rtl-snackbar']
    //   });
    // })
    // .catch(err => console.log(err));
  }

  signInSignUp(): void {
    this.userAuthService.showSignInModal();
  }

}
