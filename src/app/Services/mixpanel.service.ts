import { Injectable } from '@angular/core';
import mixpanel from 'mixpanel-browser';
import LogRocket from 'logrocket';

export class EventTypes {
  static readonly ButtonClicked = "Button Clicked";
  static readonly FormSubmitted = "Form Submitted";
  static readonly PageViewed = "Page Viewed";
  static readonly PlanPurchase = "Plan Purchase";
  static readonly ActionButtonClicked = "Action Button Clicked";
  static readonly UserLoggedIn = "User Logged In";
  static readonly CouponCode = "Coupon code";
  static readonly RedirectToExternalCreator = "Redirect to external creator";
  static readonly CancelSubscription = "Cancel Subscription";
  static readonly SignUp = "Sign Up";
}

@Injectable({
  providedIn: 'root'
})
export class MixpanelService {

  constructor() { 
    mixpanel.init('1cffb95f74ebf57e272eb712a6cfcf78', {ignore_dnt: true}); 
  }


  track(eventName: keyof typeof EventTypes, properties?: any): void {
    LogRocket.getSessionURL(sessionURL => {
      if(!properties){
        properties = {};
      }
      properties["LogRocket SessionId"] = sessionURL;
    });
    mixpanel.track(EventTypes[eventName], properties);
  }

  identify(userId: string): void {
    mixpanel.identify(userId);
  }

  setPeopleProperties(properties: any): void {
    properties["$name"] = properties["fullName"];
    properties["$email"] = properties["email"];
    mixpanel.people.set(properties);
  }
}


