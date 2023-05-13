import { Injectable } from '@angular/core';
declare var pendo: any;

@Injectable({
  providedIn: 'root'
})
export class PendoService {
  initialize(userData?: any) {
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
    }
  }
}
