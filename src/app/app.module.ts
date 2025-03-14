import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AmplifyUIAngularModule } from '@aws-amplify/ui-angular';
import { Amplify } from 'aws-amplify';
import awsConfig from '../aws-exports';

const isLocalhost = Boolean(
  window.location.hostname === "localhost" ||
  // [::1] is the IPv6 localhost address.
  window.location.hostname === "[::1]" ||
  // 127.0.0.1/8 is considered localhost for IPv4.
  window.location.hostname.match(
    /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
  )
);

const isDev = Boolean(
  window.location.hostname === "dev.d15egmtmsipj3q.amplifyapp.com");

const isProd = Boolean(
    window.location.hostname === "www.mentor-cards.com");

    
const redirectSignIn = "http://localhost:4200/all-packs-page/,https://dev.d15egmtmsipj3q.amplifyapp.com/all-packs-page/,https://www.mentor-cards.com/all-packs-page/";
const redirectSignOut = "http://localhost:4200/home-page/,https://dev.d15egmtmsipj3q.amplifyapp.com/home-page/,https://www.mentor-cards.com/home-page/";
 

// Assuming you have two redirect URIs, and the first is for localhost and second is for production
const [
  localRedirectSignIn,
  devRedirectSignIn,
  productionRedirectSignIn,
] = redirectSignIn.split(",");

const [
  localRedirectSignOut,
  devRedirectSignOut,
  productionRedirectSignOut,
] = redirectSignOut.split(",");
       
const oauth = {
  "domain": isProd ? "mentor-cards-prod.auth.eu-west-2.amazoncognito.com" : "mentor-cards-dev.auth.eu-west-2.amazoncognito.com",
  "redirectSignIn": isLocalhost ? localRedirectSignIn : (isDev ? devRedirectSignIn : productionRedirectSignIn),
  "redirectSignOut": isLocalhost ? localRedirectSignOut : (isDev ? devRedirectSignOut : productionRedirectSignOut),
  "responseType": "code"
};

const updatedAwsConfig = {
  ...awsConfig,
  oauth: oauth
}

Amplify.configure(updatedAwsConfig);
//Auth.configure(updatedAwsConfig)

import LogRocket from 'logrocket';
LogRocket.init('cyu6kh/mentor-cards');

import {
  SocialAuthServiceConfig,
  SocialAuthService,
  GoogleLoginProvider,
} from 'angularx-social-login';

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
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { PortalModule } from '@angular/cdk/portal';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule} from '@angular/material/sort';
import { I18nModule } from './Modules/i18n/i18n.module';
// import {DataTablesModule} from 'angular-datatables';
//Components
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
import { HomePageComponent } from './Pages/home-page/home-page.component';
import { NoProgramPageComponent } from './Pages/no-program-page/no-program-page.component';
import { CardsRevealDialogComponent } from './Pages/pack-content-page/cards-reveal-dialog/cards-reveal-dialog.component';
import { PackContentPageComponent, PortraitWarningDialogComponent } from './Pages/pack-content-page/pack-content-page.component';
import { RandomCardRevealDialogComponent } from './Pages/pack-content-page/random-card-reveal-dialog/random-card-reveal-dialog.component';
import { CardComponent } from './Shared Components/card/card.component';
import { PackComponent } from './Shared Components/pack/pack.component';
import { AmountOfPacksViewPipe, LineBreakPipe, TooltipListViewPipe } from './Shared Components/Pipes/tooltip-list-view.pipe';
import { TransitionGroupComponent, TransitionGroupItemDirective } from './Pages/pack-content-page/transition-group';
import { PackPreviewComponent } from './Shared Components/pack/pack-preview/pack-preview.component';
import { DynamicDialogYesNoComponent } from './Shared Components/Dialogs/dynamic-dialog-yes-no/dynamic-dialog-yes-no.component';
import { UserPageComponent } from './Pages/user-page/user-page.component';
import { GroupManagementComponent } from './Pages/group-management/group-management.component';
import { NewEditGroupUserDialogComponent } from './Shared Components/Dialogs/new-edit-group-user-dialog/new-edit-group-user-dialog.component';
import { EnterGroupIdDialogComponent } from './Pages/no-program-page/enter-group-id-dialog/enter-group-id-dialog.component';
import { ContactUsComponent } from './Pages/contact-us/contact-us.component';
import { PostPurchaseSummeryDialogComponent } from './Shared Components/Dialogs/post-purchase-summery-dialog/post-purchase-summery-dialog.component';
import { GuideBookComponent, PopupDialogComponent } from './Pages/pack-content-page/guide-book/guide-book.component';
import { SiteRulesDialogComponent } from './Shared Components/Dialogs/site-rules-dialog/site-rules-dialog.component';
import { PricePageComponent } from './Pages/price-page/price-page.component';
import { GuidePageComponent } from './Pages/guide-page/guide-page.component';
import { ApprovePurchaseDialogComponent } from './Pages/price-page/approve-purchase-dialog/approve-purchase-dialog.component';
import { EnterCouponCodeDialogComponent } from './Pages/no-program-page/enter-coupon-code-dialog/enter-coupon-code-dialog.component';
import { AboutAuthorComponent } from './Shared Components/pack/about-author/about-author.component';
import { InformationBarComponent } from './Shared Components/information-bar/information-bar.component';
import { CompanyPackChoiseComponent } from './Modules/management/company-pack-choise/company-pack-choise.component';
import { ManagementModule } from './Modules/management/management.module';
import { FbChatComponent } from './Shared Components/fb-chat/fb-chat.component';
import { WelcomeToNewOrgDialogComponent } from './Shared Components/Dialogs/welcome-to-new-org-dialog/welcome-to-new-org-dialog.component';
import { ServicesComponent } from './Pages/services/services.component';
import { PlanTableComponent } from './Pages/user-page/plan-table/plan-table.component';
import { CardsCarouselComponent } from './Shared Components/pack/pack-preview/cards-carousel/cards-carousel.component';
import { AuthService } from './Services/auth.service';
import { BlogCardComponent } from './Shared Components/blog-card/blog-card.component';
import { BlogDetailComponent } from './Pages/blog-detail/blog-detail.component';
import { AllBlogsComponent } from './Pages/all-blogs/all-blogs.component';
import { ReadTermsDialogComponent } from './Pages/price-page/read-terms-dialog/read-terms-dialog.component';
import { SelectLanguageComponent } from './Pages/select-language/select-language.component';
import { CopyCommonLinkDialogComponent } from './Pages/pack-content-page/copy-common-link-dialog-component/copy-common-link-dialog-component.component';
import { AffiliatesPageComponent } from './Pages/affiliates-page/affiliates-page.component';
import { AffiliatesDashboardPageComponent } from './Pages/affiliate-dashboard/affiliate-dashboard.component';
import { AffiliateDialogComponent } from './Pages/affiliate-dashboard/affiliate-dialog/affiliate-dialog.component';
import { ManageAffiliateComponent } from './Pages/manage-affiliate/manage-affiliate.component';
import { EditDialogComponent } from './Pages/manage-affiliate/edit-dialog/edit-dialog.component';
import { addDialogComponent } from './Pages/manage-affiliate/add-dialog/add-dialog.component';
import { UserLoginDialogComponent } from './Pages/all-packs-page/user-login-dialog/user-login-dialog.component';
import { AffiliateWithdrawsComponent } from './Pages/manage-affiliate/affiliate-withdraws/affiliate-withdraws.component';
import { addDialogWithdrawsComponent } from './Pages/manage-affiliate/affiliate-withdraws/add-dialog-withdraws/add-dialog-withdraws.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { EditDialogWithdrawsComponent } from './Pages/manage-affiliate/affiliate-withdraws/edit-dialog-withdraws/edit-dialog-withdraws.component';
import { PrintPopUpComponent } from './Pages/pack-content-page/guide-book/print-pop-up/print-pop-up.component';
import { HomePageNewComponent } from './Pages/home-page-new/home-page-new.component';
import { NavBarNewComponent } from './main-screen/nav-bar-new/nav-bar-new.component';
import { HomePageHeroComponent } from './Pages/home-page-new/home-page-hero/home-page-hero.component';
import { HomePageSubHeroComponent } from './Pages/home-page-new/home-page-sub-hero/home-page-sub-hero.component';
import { HomePageCardsComponent } from './Pages/home-page-new/home-page-cards/home-page-cards.component';
import { HomePageTryThisComponent } from './Pages/home-page-new/home-page-try-this/home-page-try-this.component';
import { HomePageHowToUseComponent } from './Pages/home-page-new/home-page-how-to-use/home-page-how-to-use.component';
import { HomePageAdvantageComponent } from './Pages/home-page-new/home-page-advantage/home-page-advantage.component';
import { HomePageClientsComponent } from './Pages/home-page-new/home-page-clients/home-page-clients.component';
import { HomePageClientsCardComponent } from './Pages/home-page-new/home-page-clients-card/home-page-clients-card.component';
import { HomePagePartnersComponent } from './Pages/home-page-new/home-page-partners/home-page-partners.component';
import { HomePageUpdatesComponent } from './Pages/home-page-new/home-page-updates/home-page-updates.component';
import { HomePageContactUsComponent } from './Pages/home-page-new/home-page-contact-us/home-page-contact-us.component';
import { HomePageFooterComponent } from './Pages/home-page-new/home-page-footer/home-page-footer.component';
import { AllPacksPageNewComponent } from './Pages/all-packs-page-new/all-packs-page-new.component';
import { FiltersComponent } from './Pages/all-packs-page-new/filters/filters.component';
import { PacksCardComponent } from './Pages/all-packs-page-new/packs-card/packs-card.component';
import { SubscribeCardComponent } from './Pages/all-packs-page-new/subscribe-card/subscribe-card.component';
import { FilterDialogComponent } from './Pages/all-packs-page-new/filter-dialog/filter-dialog.component';
import { AiChatComponent } from './Pages/all-packs-page-new/ai-chat/ai-chat.component';
import { GradientRippleDirective } from './main-screen/nav-bar-new/gradient-ripple.directive';
import { TopQuestionsCustomDialogComponent } from './Pages/pack-content-page/top-questions-dialog';
import { PackContentPageNewComponent } from './Pages/pack-content-page-new/pack-content-page-new.component';
import { confirmationDialogueComponent } from './Pages/pack-content-page/confirmation-dialog';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    PackComponent,
    MainScreenComponent,
    NavComponent,
    HomePageComponent,
    AboutPageComponent,
    PackContentPageComponent,
    TooltipListViewPipe,
    AmountOfPacksViewPipe,
    LineBreakPipe,
    CardsRevealDialogComponent,
    TopQuestionsCustomDialogComponent,
    OverlaySpinnerComponent,
    RandomCardRevealDialogComponent,
    TransitionGroupComponent,
    EditDialogComponent,
    addDialogComponent,
    TransitionGroupItemDirective,
    LoginComponent,
    RegisterComponent,
    UserRelatedDialogComponent,
    AllPacksPageComponent,
    NoProgramPageComponent,
    PackPreviewComponent,
    DynamicDialogYesNoComponent,
    UserPageComponent,
    GroupManagementComponent,
    NewEditGroupUserDialogComponent,
    EnterGroupIdDialogComponent,
    ContactUsComponent,
    PostPurchaseSummeryDialogComponent,
    GuideBookComponent,
    SiteRulesDialogComponent,
    PricePageComponent,
    GuidePageComponent,
    ApprovePurchaseDialogComponent,
    PortraitWarningDialogComponent,
    EnterCouponCodeDialogComponent,
    AboutAuthorComponent,
    InformationBarComponent,
    CompanyPackChoiseComponent,
    FbChatComponent,
    WelcomeToNewOrgDialogComponent,
    ServicesComponent,
    PlanTableComponent,
    CardsCarouselComponent,
    BlogCardComponent,
    BlogDetailComponent,
    AllBlogsComponent,
    ReadTermsDialogComponent,
    CopyCommonLinkDialogComponent,
    SelectLanguageComponent,
    AffiliatesPageComponent,
    AffiliatesDashboardPageComponent,
    AffiliateDialogComponent,
    ManageAffiliateComponent,
    PopupDialogComponent,
    UserLoginDialogComponent,
    AffiliateWithdrawsComponent,
    addDialogWithdrawsComponent,
    EditDialogWithdrawsComponent,
    PrintPopUpComponent,
    HomePageNewComponent,
    NavBarNewComponent,
    HomePageHeroComponent,
    HomePageSubHeroComponent,
    HomePageCardsComponent,
    HomePageTryThisComponent,
    HomePageHowToUseComponent,
    HomePageAdvantageComponent,
    HomePageClientsComponent,
    HomePageClientsCardComponent,
    HomePagePartnersComponent,
    HomePageUpdatesComponent,
    HomePageContactUsComponent,
    HomePageFooterComponent,
    AllPacksPageNewComponent,
    FiltersComponent,
    PacksCardComponent,
    SubscribeCardComponent,
    FilterDialogComponent,
    AiChatComponent,
    GradientRippleDirective,
    PackContentPageNewComponent,
    confirmationDialogueComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    AmplifyUIAngularModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    PortalModule,
    ManagementModule,
    I18nModule,
    // DataTablesModule,
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
    MatToolbarModule,
    MatTableModule,
    MatSelectModule,
    MatCardModule,
    DragDropModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatDatepickerModule

  ],
  providers: [AuthService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('190819062590-9t1orgtvli8t5k0orkv885gg7h9hpjlp.apps.googleusercontent.com') // your client id
          },
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    },
    SocialAuthService
  ],
  bootstrap: [AppComponent],
  entryComponents: [CardsRevealDialogComponent,TopQuestionsCustomDialogComponent, RandomCardRevealDialogComponent, UserRelatedDialogComponent,
    PackPreviewComponent, NewEditGroupUserDialogComponent, EnterGroupIdDialogComponent, PostPurchaseSummeryDialogComponent,
    GuideBookComponent, SiteRulesDialogComponent, ApprovePurchaseDialogComponent, PortraitWarningDialogComponent,AiChatComponent]
})
export class AppModule { }