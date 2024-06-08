import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutPageComponent } from './Pages/about-page/about-page.component';
import { AllPacksPageComponent } from './Pages/all-packs-page/all-packs-page.component';
import { ContactUsComponent } from './Pages/contact-us/contact-us.component';
import { GroupManagementComponent } from './Pages/group-management/group-management.component';
import { GuidePageComponent } from './Pages/guide-page/guide-page.component';
import { HomePageComponent } from './Pages/home-page/home-page.component';
import { NoProgramPageComponent } from './Pages/no-program-page/no-program-page.component';
import { GuideBookComponent } from './Pages/pack-content-page/guide-book/guide-book.component';
import { PackContentPageComponent } from './Pages/pack-content-page/pack-content-page.component';
import { PricePageComponent } from './Pages/price-page/price-page.component';
import { CompanyPackChoiseComponent } from './Modules/management/company-pack-choise/company-pack-choise.component';
import { UserPageComponent } from './Pages/user-page/user-page.component';
import {
  AuthGuardAllPacksPageService,
  AuthGuardCompanyCardChoiseService,
  AuthGuardGroupManagementService,
  AuthGuardNoProgramPageService,
  AuthGuardPackContentService,
  AuthGuardPricePageService,
  AuthGuardSiteContentManagementService,
  AuthGuardUserPageService,
} from './Services/auth-guard.service';
import { CanDeactivateGuardService } from './Services/can-deactivate-guard.service';
import { GuideBookManagementComponent } from './Modules/management/guide-book-management/guide-book-management.component';
import { NewsManagementComponent } from './Modules/management/news-management/news-management.component';
import { CouponCodesManagementComponent } from './Modules/management/coupon-codes-management/coupon-codes-management.component';
import { OrganizationManagementComponent } from './Modules/management/organization-management/organization-management.component';
import { PacksManagementComponent } from './Modules/management/packs-management/packs-management.component';
import { PaymentProgramsManagementComponent } from './Modules/management/payment-programs-management/payment-programs-management.component';
import { ReceiptsManagementComponent } from './Modules/management/receipts-management/receipts-management.component';
import { ServicesComponent } from './Pages/services/services.component';
import { BlogDetailComponent } from './Pages/blog-detail/blog-detail.component';
import { AllBlogsComponent } from './Pages/all-blogs/all-blogs.component';
import { AffiliatesPageComponent } from './Pages/affiliates-page/affiliates-page.component';
import { AffiliatesDashboardPageComponent } from './Pages/affiliate-dashboard/affiliate-dashboard.component';
import { ManageAffiliateComponent } from './Pages/manage-affiliate/manage-affiliate.component';
import { AffiliateWithdrawsComponent } from './Pages/manage-affiliate/affiliate-withdraws/affiliate-withdraws.component';
import { PrintPopUpComponent } from './Pages/pack-content-page/guide-book/print-pop-up/print-pop-up.component';
import { HomePageNewComponent } from './Pages/home-page-new/home-page-new.component';
import { AllPacksPageNewComponent } from './Pages/all-packs-page-new/all-packs-page-new.component';

const routes: Routes = [
  { path: '', redirectTo: '/home-page', pathMatch: 'full' },
  {
    path: 'home-page',
    component: HomePageNewComponent,
  },
  {
    path: 'no-program-page',
    component: NoProgramPageComponent,
  },
  {
    path: 'user-page',
    component: UserPageComponent,
    canActivate: [AuthGuardUserPageService],
  },
  {
    path: 'group-management',
    component: GroupManagementComponent,
    canActivate: [AuthGuardGroupManagementService],
  },
  { path: 'all-packs-page', component: AllPacksPageNewComponent },
  { path: 'about-page', component: AboutPageComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'all-blogs', component: AllBlogsComponent },
  { path: 'detail/:slug', component: BlogDetailComponent },
  { path: 'affiliates-page', component: AffiliatesPageComponent },
  { path: 'affiliate-dashboard', component: AffiliatesDashboardPageComponent },
  { path: 'affiliate-withdraws/:id', component: AffiliateWithdrawsComponent},
  { path:'print', component: PrintPopUpComponent},
  // { path: 'manage-affiliate', component: ManageAffiliateComponent },

  {
    path: 'pack-view/:id',
    component: PackContentPageComponent, //,
    //canActivate: [AuthGuardPackContentService],
  },
  { path: 'example-pack', component: PackContentPageComponent },
  { path: 'guide-book', component: GuideBookComponent },
  {
    path: 'price-page',
    component: PricePageComponent,
  },
  { path: 'guide-page', component: GuidePageComponent },
  { path: 'services', component: ServicesComponent },
  {
    path: 'company-pack-choise',
    component: CompanyPackChoiseComponent,
    canActivate: [AuthGuardCompanyCardChoiseService],
  },
  {
    path: 'guide-book-management',
    component: GuideBookManagementComponent,
    canActivate: [AuthGuardSiteContentManagementService],
    canDeactivate: [CanDeactivateGuardService],
  },
  // Management //

  {
    path: 'affiliate-management',
    component: ManageAffiliateComponent,
    canActivate: [AuthGuardSiteContentManagementService],
  },
  {
    path: 'news-management',
    component: NewsManagementComponent,
    canActivate: [AuthGuardSiteContentManagementService],
  },
  {
    path: 'coupon-codes-management',
    component: CouponCodesManagementComponent,
    canActivate: [AuthGuardSiteContentManagementService],
  },
  {
    path: 'orgs-management',
    component: OrganizationManagementComponent,
    canActivate: [AuthGuardSiteContentManagementService],
  },
  {
    path: 'packs-management',
    component: PacksManagementComponent,
    canActivate: [AuthGuardSiteContentManagementService],
  },
  {
    path: 'payment-programs-management',
    component: PaymentProgramsManagementComponent,
    canActivate: [AuthGuardSiteContentManagementService],
  },
  {
    path: 'receipts-management',
    component: ReceiptsManagementComponent,
    canActivate: [AuthGuardSiteContentManagementService],
  },
  // { path: '**', redirectTo: '/all-packs-page' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', relativeLinkResolution: 'legacy' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
