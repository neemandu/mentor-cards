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
import { SiteContentManagementComponent } from './Pages/site-content-management/site-content-management.component';
import { UserPageComponent } from './Pages/user-page/user-page.component';
import { AuthGuardGroupManagementService, AuthGuardNoProgramPageService, AuthGuardSiteContentManagementService, AuthGuardUserPageService } from './Services/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: '/home-page', pathMatch: 'full' },
  { path: 'home-page', component: HomePageComponent },
  { path: 'no-program-page', component: NoProgramPageComponent, canActivate: [AuthGuardNoProgramPageService] },
  // { path: 'no-program-page', component: NoProgramPageComponent },
  { path: 'user-page', component: UserPageComponent, canActivate: [AuthGuardUserPageService] },
  { path: 'group-management', component: GroupManagementComponent, canActivate: [AuthGuardGroupManagementService] },
  { path: 'site-content-management', component: SiteContentManagementComponent, canActivate: [AuthGuardSiteContentManagementService] },
  { path: 'all-packs-page', component: AllPacksPageComponent },
  { path: 'about-page', component: AboutPageComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'pack-view/:id', component: PackContentPageComponent },
  { path: 'example-pack', component: PackContentPageComponent },
  { path: 'guide-book', component: GuideBookComponent },
  { path: 'price-page', component: PricePageComponent },
  { path: 'guide-page', component: GuidePageComponent },
  { path: '**', redirectTo: '/all-packs-page' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
