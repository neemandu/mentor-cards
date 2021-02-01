import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserData } from 'src/app/Objects/user-related';
import { OverlaySpinnerService } from 'src/app/Services/overlay-spinner.service';
import { UserAuthService } from 'src/app/Services/user-auth.service';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit, OnDestroy {

    Subscription: Subscription = new Subscription();
    userData: UserData;

    constructor(private userAuthService: UserAuthService, private overlaySpinnerService: OverlaySpinnerService, public router: Router, private ngZone: NgZone) {
        this.overlaySpinnerService.changeOverlaySpinner(false);
        this.Subscription.add(this.userAuthService.signedOutEmmiter.subscribe(() => {
            this.userData = undefined;
        }))
    }

    ngOnInit(): void {
        this.userData = this.userAuthService.userData;
    }

    public navigate(path: string): void {
        this.ngZone.run(() => this.router.navigate([path]));
    }

    signInSignUp(): void {
        // if (!this.userAuthService.userData)
        this.userAuthService.showSignInModal();
        // else {
        //     this.navigate('/all-packs-page')
        // }
    }

    ngOnDestroy(): void {
        this.Subscription.unsubscribe();
    }

}
