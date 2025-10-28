import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserData } from 'src/app/Objects/user-related';
import { LangDirectionService } from 'src/app/Services/LangDirectionService.service';
import { UserAuthService } from 'src/app/Services/user-auth.service';
import { UserPlan } from 'src/types/user';

const subscribeCard = {
  [UserPlan.NOPLAN]: {
    title: 'components.subscribeCard.noplanTitle',
    subTitle: 'components.subscribeCard.noplanSubTitle',
    description: 'components.subscribeCard.noplanDescription',
    linkText: 'components.subscribeCard.noplanLinkText',
    route: '/price-page',
    fragment: ''
  },
  [UserPlan.PLAN]: {
    title: 'components.subscribeCard.planTitle',
    subTitle: '',
    description: 'components.subscribeCard.planDescription',
    linkText: 'components.subscribeCard.planLinkText',
    route: '/home-page',
    fragment: 'updates'
  }
}

@Component({
  selector: 'app-subscribe-card',
  templateUrl: './subscribe-card.component.html',
  styleUrls: ['./subscribe-card.component.css']
})
export class SubscribeCardComponent implements OnInit {
  userStatus: UserPlan = UserPlan.NOPLAN;

  public subscribeTitle: string = '';
  public subscribeSubTitle: string = '';
  public subscribeDescription: string = '';
  public subscribeLinkText: string = '';
  public subscribeRoute: string = '';
  public subscribeFragment: string = '';

  constructor(
    private userAuthService: UserAuthService, 
    public langDirectionService: LangDirectionService, 
    public router: Router
  ) { }

  ngOnInit(): void {
    this.userStatus = (this.userAuthService?.userData?.status ?? UserPlan.NOPLAN) as UserPlan;
      
    this.subscribeTitle = subscribeCard[this.userStatus].title;
    this.subscribeSubTitle = subscribeCard[this.userStatus].subTitle;
    this.subscribeDescription = subscribeCard[this.userStatus].description;
    this.subscribeLinkText = subscribeCard[this.userStatus].linkText;
    this.subscribeRoute = subscribeCard[this.userStatus].route;
    this.subscribeFragment = subscribeCard[this.userStatus].fragment;
  }

  navigateTo(route: string) {
    this.router.navigateByUrl(route);
  }

}
