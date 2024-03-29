import { AfterViewInit, Component, ElementRef, NgZone, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { APIService } from 'src/app/API.service';
import { UserData } from 'src/app/Objects/user-related';
import { CardsService } from 'src/app/Services/cards.service';
import { MixpanelService } from 'src/app/Services/mixpanel.service';
import { OverlaySpinnerService } from 'src/app/Services/overlay-spinner.service';
import { UserAuthService } from 'src/app/Services/user-auth.service';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit, OnDestroy, AfterViewInit {

    @ViewChildren('logo') logos: QueryList<ElementRef>

    Subscription: Subscription = new Subscription();
    userData: UserData;
    news: any[] = [];

    constructor(private userAuthService: UserAuthService, private overlaySpinnerService: OverlaySpinnerService,
        public route: ActivatedRoute,
        public router: Router, private ngZone: NgZone, private api: APIService, private cardsService: CardsService,
        private mixpanelService: MixpanelService
    ) {
    }

    ngOnInit(): void {
        console.log('home page ngOnInit!');
        this.route.queryParams.subscribe(params => {
            const refId = params['ref'];
            console.log('refId:', refId);
            if (refId) {
              localStorage.setItem('refId', refId);
              console.log('refId ID stored:', refId);
            }
          });

        // track events
        this.mixpanelService.track("PageViewed", { 'Page Title': 'home-page' });
        this.api.ListNewss().then(news => {
            this.news = news.items.sort((a, b) => a.order - b.order);
        }, error => {
            console.log("file: site-content-management.component.ts ~ line 42 ~ this.api.ListNewss ~ error", error)
        })
        this.userAuthService.userDataEmmiter.subscribe((userData: UserData) => {
            this.userData = userData;
            userData ? this.overlaySpinnerService.changeOverlaySpinner(false) : null;
            this.ngZone.run(() => this.router.navigate(['all-packs-page']));
        })
        this.userData = this.userAuthService.userData;
    }

    ngAfterViewInit(): void {
        this.animateLogos();
    }

    async animateLogos() {
        let logoI = 0;
        const logosArr = this.logos.toArray()
        for (logoI; logoI < logosArr.length; logoI++) {
            logosArr[logoI].nativeElement.style.transform = "scale(1.1)";
            await new Promise(resolve => setTimeout(resolve, 1000));
            logosArr[logoI].nativeElement.style.transform = "scale(1)";
            if (logoI === logosArr.length - 1) logoI = -1;
        }
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
