import { LangDirectionService } from 'src/app/Services/LangDirectionService.service';
import { Component, EventEmitter, NgZone, OnInit, Output, HostListener } from '@angular/core';
import { UserAuthService } from 'src/app/Services/user-auth.service';
import { Router } from '@angular/router';
import { OverlaySpinnerService } from 'src/app/Services/overlay-spinner.service';
import { APIService } from 'src/app/API.service';
import { AuthService } from 'src/app/Services/auth.service';
import { UserData } from 'src/app/Objects/user-related';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  @Output() showSignInModalEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  showTour = window.innerWidth >= 1024; // Adjust the breakpoint as needed
  @HostListener('window:resize', ['$event'])
  onWindowResize(event: any) {
    this.showTour = window.innerWidth >= 1024; // Adjust the breakpoint as needed
  }
  
  userAttributes: any;
  loggedIn: boolean = false;
  news: any[];
  newsNotification: boolean = false;
  showBanner: boolean = true;

  localesList = [
    { code: 'en', label: 'English' },
    { code: 'he', label: 'עברית' }
  ]

  constructor(private userAuthService: UserAuthService, public router: Router, private ngZone: NgZone,
    private api: APIService, private amplifyAuthService: AuthService,
    public langDirectionService: LangDirectionService,) {
  }

  ngOnInit() {

    this.userAuthService.userDataEmmiter.subscribe((userData: UserData) => {
      this.userAttributes = userData;
      this.loggedIn = userData ? true : false;
      this.showBanner = this.loggedIn && this.userAttributes?.subscription?.subscriptionPlan?.id !== 'MCLIFETIME';

    })
    this.api.ListNewss().then(news => {
      this.news = news.items.sort((a, b) => a.order - b.order);
      let oldNews = localStorage.getItem("news")
      if (oldNews !== this.getNewsList()) {
        this.newsNotification = true;
      }
    }, error => {
      console.log("file: site-content-management.component.ts ~ line 42 ~ this.api.ListNewss ~ error", error)
    })
  }

  viewNotifications(): void {
    if (this.newsNotification) {
      localStorage.setItem("news", this.getNewsList());
      this.newsNotification = false;
    }
  }

  openEnterCouponCodeModal(): void {
    this.userAuthService.openEnterCouponCodeModal();
  }

  /**
   * @returns a string with all news to save\compare 
   */
  private getNewsList(): string {
    let res = this.news.map(n => n.message).toString();
    return res;
  }

  openNewTab(): void {
    const url = 'https://mentor-cards.vp4.me/my-courses'; 
    window.open(url, '_blank');
  }

  public navigate(path: string): void {
    // console.log(path)
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
