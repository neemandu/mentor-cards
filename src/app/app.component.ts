import { onAuthUIStateChange, CognitoUserInterface, AuthState } from '@aws-amplify/ui-components';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserAuthService } from './Services/user-auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  user: CognitoUserInterface | undefined;
  authState: AuthState;
  title = 'amplify-angular-auth';

  constructor(private ref: ChangeDetectorRef, private userAuthService: UserAuthService) { }

  ngOnInit() {
    onAuthUIStateChange((authState, authData) => {
      this.authState = authState;
      if (this.authState === 'signedin') {
        this.user = authData as CognitoUserInterface;
        this.userAuthService.loggedIn(this.user);
      }
      else if (this.authState === 'confirmSignUp') {
        this.user = authData as CognitoUserInterface;
        var newUsername: string = this.user.username;
        var newUserEmail: string = this.user.signUpAttrs.attributes['email']
        this.userAuthService.signUp(newUsername, newUserEmail).then(value => {
          console.log("🚀 ~ file: app.component.ts ~ line 31 ~ AppComponent ~ this.userAuthService.signUp ~ value", value);
        }, reason => {
          console.log("🚀 ~ file: app.component.ts ~ line 33 ~ AppComponent ~ this.userAuthService.signUp ~ reason", reason);
        });
      }
      this.ref.detectChanges();
    })
  }

  ngOnDestroy() {
    return onAuthUIStateChange;
  }
}
