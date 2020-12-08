import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardLoggedOutService implements CanActivate {

  constructor(private userAuthService: UserAuthService, public router: Router) { }

  async canActivate() {
    if (this.userAuthService.isLoggedIn() /*TODO IF USER HAS NO PROGRAM */) {
      // if(has program){return true}
      // else{      this.router.navigate(['no-program-page']);
      // return false;}
      return true;
    }
    const authenticated = await this.checkLoggedIn();
    if (!authenticated /*TODO || IF USER HAS NO PROGRAM */) {
      console.log(this.userAuthService.isLoggedIn());
      this.router.navigate(['no-program-page']);
      return false;
    }
    return true;
  }

  private checkLoggedIn(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      setTimeout(() => {
        resolve(this.userAuthService.isLoggedIn());
      }, 2000)
    });
  }
}
