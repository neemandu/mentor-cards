import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AmplifyUIAngularModule } from '@aws-amplify/ui-angular';
import Amplify from 'aws-amplify';
import awsconfig from '../aws-exports';
Amplify.configure(awsconfig);

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MainScreenComponent } from './main-screen/main-screen.component';
import { NavComponent } from './main-screen/nav/nav.component';
import { OverlaySpinnerComponent } from './main-screen/overlay-spinner/overlay-spinner.component';
import { LoginComponent } from './main-screen/user-related/user-related-dialog/login/login.component';
import { RegisterComponent } from './main-screen/user-related/user-related-dialog/register/register.component';
import { UserRelatedDialogComponent } from './main-screen/user-related/user-related-dialog/user-related-dialog.component';
import { AboutPageComponent } from './Pages/about-page/about-page.component';
import { AllPacksPageComponent } from './Pages/all-packs-page/all-packs-page.component';
// import { HomePageComponent } from './Pages/home-page/home-page.component';
import { NoProgramPageComponent } from './Pages/no-program-page/no-program-page.component';
import { CardsRevealDialogComponent } from './Pages/pack-content-page/cards-reveal-dialog/cards-reveal-dialog.component';
import { PackContentPageComponent } from './Pages/pack-content-page/pack-content-page.component';
import { RandomCardRevealDialogComponent } from './Pages/pack-content-page/random-card-reveal-dialog/random-card-reveal-dialog.component';
import { CardComponent } from './Shared Components/card/card.component';
import { PackComponent } from './Shared Components/pack/pack.component';
import { TooltipListViewPipe } from './Shared Components/Pipes/tooltip-list-view.pipe';
import { TransitionGroupComponent, TransitionGroupItemDirective } from './Pages/pack-content-page/transition-group';
import { ProgramChoiseDialogComponent } from './Pages/no-program-page/program-choise-dialog/program-choise-dialog.component';

//Material
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatRippleModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatBottomSheetModule, MAT_BOTTOM_SHEET_DEFAULT_OPTIONS } from '@angular/material/bottom-sheet';
import { PackPreviewComponent } from './Shared Components/pack/pack-preview/pack-preview.component';


@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    PackComponent,
    MainScreenComponent,
    NavComponent,
    // HomePageComponent,
    AboutPageComponent,
    PackContentPageComponent,
    TooltipListViewPipe,
    CardsRevealDialogComponent,
    OverlaySpinnerComponent,
    RandomCardRevealDialogComponent,
    TransitionGroupComponent,
    TransitionGroupItemDirective,
    LoginComponent,
    RegisterComponent,
    UserRelatedDialogComponent,
    AllPacksPageComponent,
    NoProgramPageComponent,
    ProgramChoiseDialogComponent,
    PackPreviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AmplifyUIAngularModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    //Material
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    MatSnackBarModule,
    MatDividerModule,
    MatListModule,
    MatRippleModule,
    MatTooltipModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatTabsModule,
    MatProgressBarModule,
    MatMenuModule,
    MatSlideToggleModule,
    MatButtonToggleModule,
    MatStepperModule,
    MatBottomSheetModule
  ],
  providers: [
    {provide: MAT_BOTTOM_SHEET_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}}
  ],
  bootstrap: [AppComponent],
  entryComponents: [CardsRevealDialogComponent, RandomCardRevealDialogComponent, UserRelatedDialogComponent, ProgramChoiseDialogComponent, PackPreviewComponent]
})
export class AppModule { }
