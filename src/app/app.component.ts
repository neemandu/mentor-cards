import { onAuthUIStateChange, CognitoUserInterface, AuthState } from '@aws-amplify/ui-components';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { APIService } from './API.service';
import { CardsPack } from '../types/cardsPacks';
import { UserAuthService } from './Services/user-auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  user: CognitoUserInterface | undefined;
  authState: AuthState;

  constructor(private api: APIService, private ref: ChangeDetectorRef, private userAuthService: UserAuthService) { }

  ngOnInit() {
    onAuthUIStateChange((authState, authData) => {
      this.authState = authState;
      this.user = authData as CognitoUserInterface;
      this.userAuthService.loggedIn(this.user)
      this.ref.detectChanges();
    })
  }

  ngOnDestroy() {
    return onAuthUIStateChange;
  }
}
