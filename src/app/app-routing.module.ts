import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutPageComponent } from './Pages/about-page/about-page.component';
import { AllPacksPageComponent } from './Pages/all-packs-page/all-packs-page.component';
import { HomePageComponent } from './Pages/home-page/home-page.component';
import { NoProgramPageComponent } from './Pages/no-program-page/no-program-page.component';
import { PackContentPageComponent } from './Pages/pack-content-page/pack-content-page.component';
import { AuthGuardLoggedOutService } from './Services/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: '/all-packs-page', pathMatch: 'full' },
  // { path: 'home-page', component: HomePageComponent },
  { path: 'no-program-page', component: NoProgramPageComponent },
  // { path: 'all-packs-page', component: AllPacksPageComponent, canActivate: [AuthGuardLoggedOutService] },
  { path: 'all-packs-page', component: AllPacksPageComponent },
  { path: 'about-page', component: AboutPageComponent },
  { path: 'pack-view/:id', component: PackContentPageComponent },
  { path: '**', redirectTo: '/all-packs-page' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
