import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserData } from 'src/app/Objects/user-related';
import { UserAuthService } from 'src/app/Services/user-auth.service';

enum UserStatus {
  NOPLAN = "NOPLAN",
  PLAN = "PLAN",
  GUEST ="GUEST"
}

const ButtonTranslationsName = {
  red: {
    [UserStatus.NOPLAN]: 'pages.home-page.sections.hero.content.no-plan-link-red',
    [UserStatus.PLAN]: 'pages.home-page.sections.hero.content.plan-link-red',
    [UserStatus.GUEST]: 'pages.home-page.sections.hero.content.guest-link-red',
  },
  blue: {
    [UserStatus.NOPLAN]: 'pages.home-page.sections.hero.content.no-plan-link-blue',
    [UserStatus.PLAN]: 'pages.home-page.sections.hero.content.plan-link-blue',
    [UserStatus.GUEST]: 'pages.home-page.sections.hero.content.guest-link-blue',
  }
}

@Component({
  selector: 'app-home-page-hero',
  templateUrl: './home-page-hero.component.html',
  styleUrls: ['./home-page-hero.component.css']
})
export class HomePageHeroComponent implements OnInit {
  blueLinkRoute: string = "";
  userStatus: UserStatus;
  
  constructor(
    private userAuthService: UserAuthService, 
    public router: Router
  ) {
  }
  

  ngOnInit(): void {
    this.userAuthService.userDataEmmiter.subscribe(() => {
      this.userStatus = (this.userAuthService?.userData?.status ?? UserStatus.GUEST) as UserStatus;
      this.blueLinkRoute = this.getBlueLinkRoute();
    });
  }

  navigateTo(route: string) {
    this.router.navigateByUrl(route);
  }

  get redLink(): string {
    return ButtonTranslationsName.red[this.userStatus];
  }

  get blueLink(): string {    
    return ButtonTranslationsName.blue[this.userStatus];
  }

  private getBlueLinkRoute(): string {
    return this.userAuthService?.userData?.status === UserStatus.PLAN ? '/all-packs-page' : '/price-page';
  }
}
