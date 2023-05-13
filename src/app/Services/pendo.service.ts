import { Injectable } from '@angular/core';
declare var pendo: any;

@Injectable({
  providedIn: 'root'
})
export class PendoService {
  initialize(apiKey: string, userData?: any) {
    (window as any).pendo_options = {
      apiKey: apiKey
    };
    if (userData) {
      pendo.initialize({
        visitor: {
            id:           userData.email,
            email:        userData.email,
            full_name:    userData.fullName
        },
        account: {
            id:           userData.email, // Required if using Pendo Feedback, default uses the value 'ACCOUNT-UNIQUE-ID'
            name:         userData.fullName,
            is_paying:    userData.status == "PLAN",
            creationDate: userData.createdAt
        }
      });
      (window as any).pendo_options.visitor = userData;
    }
    const script = document.createElement('script');
    script.src = `https://cdn.pendo.io/agent/static/${apiKey}/pendo.js`;
    document.head.appendChild(script);
  }
}
