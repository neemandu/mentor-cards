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
      this.userAttributes = userAttributes;
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

  logout(): void {
    this.userAuthService.logOut();
    this.navigate('/home-page');
  }

  signInSignUp(): void {
    this.userAuthService.showSignInModal();
  }

}
