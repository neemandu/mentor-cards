import { onAuthUIStateChange, CognitoUserInterface, AuthState } from '@aws-amplify/ui-components';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserAuthService } from './Services/user-auth.service';
import { OverlaySpinnerService } from './Services/overlay-spinner.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  user: CognitoUserInterface | undefined;
  authState: AuthState;
  title = 'amplify-angular-auth';
  showLogin: boolean = true;

  constructor(private ref: ChangeDetectorRef, private userAuthService: UserAuthService, private overlaySpinnerService: OverlaySpinnerService) {
    this.overlaySpinnerService.changeOverlaySpinner(false)
  }

  ngOnInit() {
    onAuthUIStateChange((authState, authData) => {
      // debugger
      this.authState = authState;
      if (this.authState === 'signedin') {
        this.showLogin=false;
        this.user = authData as CognitoUserInterface;
        this.userAuthService.loggedIn(this.user);
      }
      else if(this.authState === 'signin') {
        this.showLogin=true;
        this.userAuthService.loggedOut();
      }
      this.ref.detectChanges();
    })
  }

  ngOnDestroy() {
    return onAuthUIStateChange;
  }
}
