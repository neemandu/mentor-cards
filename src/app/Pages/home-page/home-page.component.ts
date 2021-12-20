import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { APIService } from 'src/app/API.service';
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
    news: any[] = [];

    constructor(private userAuthService: UserAuthService, private overlaySpinnerService: OverlaySpinnerService,
        public router: Router, private ngZone: NgZone, private api: APIService) {
    }

    ngOnInit(): void {
        this.overlaySpinnerService.changeOverlaySpinner(true);
        this.api.ListNewss().then(news => {
            this.news = news.items.sort((a, b) => a.order - b.order);
            this.overlaySpinnerService.changeOverlaySpinner(false);
        }, error => {
            this.overlaySpinnerService.changeOverlaySpinner(false);
            console.log("file: site-content-management.component.ts ~ line 42 ~ this.api.ListNewss ~ error", error)
        })
        // this.Subscription.add(this.userAuthService.signedOutEmmiter.subscribe(() => {
        //     this.userData = undefined;
        // }))
        // this.Subscription.add(this.userAuthService.loggedInEmmiter.subscribe((userData: UserData) => {
        //     this.userData = userData;
        //     this.overlaySpinnerService.changeOverlaySpinner(false);
        // }));
        this.userAuthService.userDataEmmiter.subscribe((userData: UserData) => {
            this.userData = userData;
            userData ? this.overlaySpinnerService.changeOverlaySpinner(false) : null;
        })
        this.userData = this.userAuthService.userData;
    }

    navigate(path: string): void {
        this.ngZone.run(() => this.router.navigate([path]));
    }

    get trialPeriodExpDate() {
        return this.userAuthService.trialPeriodExpDate;
    }

    signInSignUp(): void {
        this.userAuthService.showSignInModal();
    }

    ngOnDestroy(): void {
        this.Subscription.unsubscribe();
    }

}
