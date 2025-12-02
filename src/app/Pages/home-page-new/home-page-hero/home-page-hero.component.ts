import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserData } from 'src/app/Objects/user-related';
import { LangDirectionService } from 'src/app/Services/LangDirectionService.service';
import { UserAuthService } from 'src/app/Services/user-auth.service';
import { UserPlan } from 'src/types/user';


const ButtonTranslationsName = {
  red: {
    [UserPlan.NOPLAN]: 'pages.home-page.sections.hero.content.no-plan-link-red',
    [UserPlan.PLAN]: 'pages.home-page.sections.hero.content.plan-link-red',
    [UserPlan.GUEST]: 'pages.home-page.sections.hero.content.guest-link-red',
  },
  blue: {
    [UserPlan.NOPLAN]: 'pages.home-page.sections.hero.content.no-plan-link-blue',
    [UserPlan.PLAN]: 'pages.home-page.sections.hero.content.plan-link-blue',
    [UserPlan.GUEST]: 'pages.home-page.sections.hero.content.guest-link-blue',
  }
}

@Component({
  selector: 'app-home-page-hero',
  templateUrl: './home-page-hero.component.html',
  styleUrls: ['./home-page-hero.component.css']
})
export class HomePageHeroComponent implements OnInit {
  blueLinkRoute = '/price-page';
  userStatus = UserPlan.GUEST;
  
  constructor(
    private userAuthService: UserAuthService, 
    public router: Router,
    public langDirectionService: LangDirectionService,
  ) {
  }
  

  ngOnInit(): void {
    this.userAuthService.userDataEmmiter.subscribe(() => {
      this.userStatus = (this.userAuthService?.userData?.status ?? UserPlan.GUEST) as UserPlan;
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
    return this.userStatus  === UserPlan.PLAN ? '/all-packs-page' : '/price-page';
  }
}
