// import { Component, OnInit, Output } from '@angular/core';
// import { EventEmitter } from 'stream';
import { Component, EventEmitter, NgZone, OnInit, Output, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { APIService } from 'src/app/API.service';
import { UserData } from 'src/app/Objects/user-related';
import { LangDirectionService } from 'src/app/Services/LangDirectionService.service';
import { AuthService } from 'src/app/Services/auth.service';
import { UserAuthService } from 'src/app/Services/user-auth.service';
@Component({
  selector: 'app-nav-bar-new',
  templateUrl: './nav-bar-new.component.html',
  styleUrls: ['./nav-bar-new.component.css']
})
export class NavBarNewComponent implements OnInit {

  @Output() showSignInModalEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  showTour = window.innerWidth >= 1024; // Adjust the breakpoint as needed
  @HostListener('window:resize', ['$event'])
  onWindowResize(event: any) {
    this.showTour = window.innerWidth >= 1024; // Adjust the breakpoint as needed
  }

  userAttributes: any;
  loggedIn: boolean = true;
  news: any[];
  newsNotification: boolean = false;
  showBanner: boolean = true;
  countdown = '';

  localesList = [
    { code: 'en', label: 'English' },
    { code: 'he', label: 'עברית' }
  ]


  navBarItems = [
    { name: 'pages.nav.navbar.all-card-packs', route: '/all-packs-page', placeholder: 'All Card Packs' },
    { name: 'pages.nav.navbar.digital-courses', route: 'openNewTab()', placeholder: 'Digital Courses' },
    { name: 'pages.nav.navbar.our-plans', route: '/price-page', placeholder: 'Our Plans' },
    { name: 'pages.nav.navbar.faq', route: '/guide-page', placeholder: 'FAQ' },
    { name: 'pages.nav.navbar.additional-services', route: '/services', placeholder: 'Additional Services' },
    { name: 'pages.nav.navbar.about-us', route: '/about-page', placeholder: 'About Us' },
    { name: 'pages.nav.navbar.affiliates', route: '/affiliates-page', placeholder: 'Affiliates' },
    { name: 'pages.nav.navbar.contact-us', route: '/contact-us', placeholder: 'Contact Us' },
  ].map(item => ({ ...item, hovering: false }));

  hover(item) {
    item.hovering = true;
  }

  leave(item) {
    item.hovering = false;
  }

  constructor(private userAuthService: UserAuthService, public router: Router, private ngZone: NgZone,
    private api: APIService, private amplifyAuthService: AuthService,
    public langDirectionService: LangDirectionService,) {
  }

  ngOnInit() {

    this.startCountdown();
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


    /**
   * @returns a string with all news to save\compare 
   */
    private getNewsList(): string {
      let res = this.news.map(n => n.message).toString();
      return res;
    }

    
  startCountdown() {
    const countDownDate = new Date('2024-01-31').getTime();

    let x = setInterval(() => {
      let now = new Date().getTime();
      let distance = countDownDate - now;

      let days = Math.floor(distance / (1000 * 60 * 60 * 24));
      let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);

      this.countdown = days + " ימים " + hours + " שעות "
        + minutes + " דקות ו-" + seconds + " שניות";

      if (distance < 0) {
        clearInterval(x);
        this.countdown = "EXPIRED";
      }
    }, 1000);
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
