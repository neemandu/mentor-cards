import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { APIService } from 'src/app/API.service';
import { UserData } from 'src/app/Objects/user-related';
import { CardsService } from 'src/app/Services/cards.service';
import { MixpanelService } from 'src/app/Services/mixpanel.service';
import { OverlaySpinnerService } from 'src/app/Services/overlay-spinner.service';
import { UserAuthService } from 'src/app/Services/user-auth.service';

@Component({
  selector: 'app-home-page-new',
  templateUrl: './home-page-new.component.html',
  styleUrls: ['./home-page-new.component.css']
})
export class HomePageNewComponent implements OnInit {

  userData: UserData;

  constructor(private userAuthService: UserAuthService, private overlaySpinnerService: OverlaySpinnerService,
    public route: ActivatedRoute,
    public router: Router, private ngZone: NgZone, private api: APIService, private cardsService: CardsService,
    private mixpanelService: MixpanelService) { }

  ngOnInit(): void {
    console.log('home page ngOnInit!');
    this.route.fragment.subscribe(fragment => { this.scrollTo(fragment); });
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
    this.userAuthService.userDataEmmiter.subscribe((userData: UserData) => {
        this.userData = userData;
        userData ? this.overlaySpinnerService.changeOverlaySpinner(false) : null;
        // this.ngZone.run(() => this.router.navigate(['all-packs-page']));
    })
    this.userData = this.userAuthService.userData;
  }

  scrollTo(id) {
    const element = document.querySelector("#" + id);
    if (element) element.scrollIntoView();
  }
  
}
