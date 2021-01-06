import { Injectable, NgZone } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardAllPacksPageService implements CanActivate {

  constructor(private userAuthService: UserAuthService, public router: Router, private ngZone: NgZone) { }

  canActivate(): boolean {
    // debugger;
    if (this.userAuthService.userData) {
      if (this.userAuthService.userData.status === "PLAN")
        return true;
      else {
        this.ngZone.run(() => this.router.navigate(['no-program-page']));
        return false;
      }
    }
    this.userAuthService.loggedInEmmiter.subscribe((userData) => {
      if (userData.status === "PLAN") {
        this.ngZone.run(() => this.router.navigate(['all-packs-page']));
        return true;
      }
      else {
        this.ngZone.run(() => this.router.navigate(['no-program-page']));
        return false;
      }
    })
    return false;
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthGuardUserPageService implements CanActivate {

  constructor(private userAuthService: UserAuthService, public router: Router, private ngZone: NgZone) { }

  canActivate(): boolean {
    // debugger;
    if (this.userAuthService.userData) {
      if (this.userAuthService.userData.status === "PLAN") {
        this.ngZone.run(() => this.router.navigate(['user-page']));
        return false;
      }
      else {
        return true;
      }
    }
    this.userAuthService.loggedInEmmiter.subscribe((userData) => {
      if (userData.status === "PLAN") {
        this.ngZone.run(() => this.router.navigate(['user-page']));
        return false;
      }
      else {
        return true;
      }
    })
    return false;
  }
}
