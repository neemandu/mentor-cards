import { Injectable } from '@angular/core';
import mixpanel from 'mixpanel-browser';
import LogRocket from 'logrocket';

export class EventTypes {
  static readonly ButtonClicked = "Button Clicked";
  static readonly FormSubmitted = "Form Submitted";
  static readonly PageViewed = "Page Viewed";
  static readonly PlanPurchase = "Plan Purchase";
  static readonly ActionButtonClicked = "Action Button Clicked";
}

@Injectable({
  providedIn: 'root'
})
export class MixpanelService {

  constructor() { 
    mixpanel.init('1cffb95f74ebf57e272eb712a6cfcf78'
    ); 
  }


  track(eventName: keyof typeof EventTypes, properties?: any): void {
    LogRocket.getSessionURL(sessionURL => {
      properties["LogRocket SessionId"] = sessionURL;
    });
    mixpanel.track(EventTypes[eventName], properties);
  }

  identify(userId: string): void {
    mixpanel.identify(userId);
  }

  setPeopleProperties(properties: any): void {
    mixpanel.people.set(properties);
  }
}


