import { Injectable, NgZone } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserData } from '../Objects/user-related';
import { UserAuthService } from './user-auth.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuardAllPacksPageService implements CanActivate {

//   constructor(private userAuthService: UserAuthService, public router: Router, private ngZone: NgZone) { }

//   canActivate(): boolean {
//     // debugger;
//     if (this.userAuthService.userData) {
//       if (this.userAuthService.userData.status === "PLAN" || this.userAuthService.trialMonthExpDate || this.userAuthService.codeCouponExpDate)
//         return true;
//       else {
//         return false;
//       }
//     }
//     var sub = this.userAuthService.loggedInEmmiter.subscribe((userData) => {
//       sub.unsubscribe();
//       if (userData.status === "PLAN" || this.userAuthService.trialMonthExpDate || this.userAuthService.codeCouponExpDate) {
//         this.ngZone.run(() => this.router.navigate(['all-packs-page']));
//         return true;
//       }
//       else {
//         this.ngZone.run(() => this.router.navigate(['no-program-page']));
//       }
//     })
//   }
// }

@Injectable({
  providedIn: 'root'
})
export class AuthGuardNoProgramPageService implements CanActivate {

  constructor(private userAuthService: UserAuthService, public router: Router, private ngZone: NgZone) { }

  canActivate(): boolean {
    // debugger;
    if (this.userAuthService.userData) {
      if (this.userAuthService.userData.status === "PLAN") {
        this.ngZone.run(() => this.router.navigate(['user-page']));
      }
      else {
        return true;
      }
    }
    else {
      this.ngZone.run(() => this.router.navigate(['home-page']));
    }
    var sub = this.userAuthService.userDataEmmiter.subscribe((userData: UserData) => {
      sub.unsubscribe();
      if (userData?.status === "PLAN") {
        this.ngZone.run(() => this.router.navigate(['user-page']));
      }
      else {
        this.ngZone.run(() => this.router.navigate(['home-page']));
        return true;
      }
    })
    // var sub = this.userAuthService.loggedInEmmiter.subscribe((userData) => {
    //   sub.unsubscribe();
    //   if (userData.status === "PLAN") {
    //     this.ngZone.run(() => this.router.navigate(['user-page']));
    //   }
    //   else {
    //     this.ngZone.run(() => this.router.navigate(['home-page']));
    //     return true;
    //   }
    // })
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthGuardUserPageService implements CanActivate {

  constructor(private userAuthService: UserAuthService, public router: Router, private ngZone: NgZone) { }

  canActivate(): boolean {
    if (this.userAuthService.userData) {
      if (this.userAuthService.userData.status === "PLAN") {
        return true;
      }
      else {
        this.ngZone.run(() => this.router.navigate(['home-page']));
      }
    }
    var sub = this.userAuthService.userDataEmmiter.subscribe((userData: UserData) => {
      sub.unsubscribe();
      if (userData?.status === "PLAN") {
        this.ngZone.run(() => this.router.navigate(['user-page']));
      }
      else {
        this.ngZone.run(() => this.router.navigate(['home-page']));
      }
    })
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGroupManagementService implements CanActivate {

  constructor(private userAuthService: UserAuthService, public router: Router, private ngZone: NgZone) { }

  canActivate(): boolean {
    // debugger;
    if (this.userAuthService.userData) {
      if (this.userAuthService.userData.groupId) {
        return true;
      }
      else {
        this.ngZone.run(() => this.router.navigate(['user-page']));
      }
    }
    var subUser = this.userAuthService.userDataEmmiter.subscribe((userData: UserData) => {
      subUser.unsubscribe();
      if (userData?.groupId) {
        var subGroup = this.userAuthService.groupDataEmmiter.subscribe((groupData) => {
          subGroup.unsubscribe();
          this.ngZone.run(() => this.router.navigate(['group-management']));
        });
      }
      else {
        this.ngZone.run(() => this.router.navigate(['user-page']));
      }
    })
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthGuardSiteContentManagementService implements CanActivate {

  constructor(private userAuthService: UserAuthService, public router: Router, private ngZone: NgZone) { }

  canActivate(): boolean {
    // debugger;
    if (this.userAuthService.userData) {
      if (this.userAuthService.userData.groupRole === 'SUPER_USER') {
        return true;
      }
      else {
        this.ngZone.run(() => this.router.navigate(['home-page']));
      }
    }
    else {
      this.ngZone.run(() => this.router.navigate(['home-page']));
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthGuardCompanyCardChoiseService implements CanActivate {

  constructor(private userAuthService: UserAuthService, public router: Router, private ngZone: NgZone) { }

  canActivate(): boolean {
    // debugger;
    if (this.userAuthService?.userData?.orgMembership) {
      if (this.userAuthService.userData.endOfTrialDate <= new Date()) {
        return true;
      }
    }
    this.ngZone.run(() => this.router.navigate(['home-page']));
    return false;
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthGuardPricePageService implements CanActivate {

  constructor(private userAuthService: UserAuthService, public router: Router, private ngZone: NgZone) { }

  canActivate(): boolean {
    // debugger;
    if (this.userAuthService?.subPlans) {
      return true;
    }
    this.ngZone.run(() => this.router.navigate(['home-page']));
    return false;
  }
}