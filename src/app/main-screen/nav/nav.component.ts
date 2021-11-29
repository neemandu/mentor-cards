import { Component, EventEmitter, NgZone, OnInit, Output } from '@angular/core';
import { UserAuthService } from 'src/app/Services/user-auth.service';
import { Router } from '@angular/router';
import { OverlaySpinnerService } from 'src/app/Services/overlay-spinner.service';
import { APIService } from 'src/app/API.service';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  @Output() showSignInModalEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  userAttributes: any;
  loggedIn: boolean = false;
  news: any[];
  newsNotification: boolean = false;

  localesList = [
    { code: 'en', label: 'English' },
    { code: 'he', label: 'עברית' }
  ]

  constructor(private userAuthService: UserAuthService, public router: Router, private ngZone: NgZone,
    private api: APIService, private amplifyAuthService: AuthService) {
  }

  ngOnInit() {
    this.amplifyAuthService.isLoggedIn$.subscribe(
      isLoggedIn => {
        (this.loggedIn = isLoggedIn);
      }
    );
  
    this.amplifyAuthService.auth$.subscribe(({ id, username, email, cognitoUser }) => {
      this.userAttributes = cognitoUser;
    });

    /*this.userAuthService.loggedInEmmiter.subscribe((userAttributes) => {
      this.userAttributes = userAttributes;
      this.loggedIn = true;
    })*/
    this.userAuthService.signedOutEmmiter.subscribe(() => {
      this.userAttributes = undefined;
      this.loggedIn = false;
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

  /**
   * @returns a string with all news to save\compare 
   */
  private getNewsList(): string {
    let res = this.news.map(n => n.message).toString(); 
    return res;
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
