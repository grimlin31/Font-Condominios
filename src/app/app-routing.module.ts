import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from "./module/admin/admin-home/admin-home.component";
import { AdminGuard } from "./share/guards/admin.guard";
import { LoginComponent } from "./module/login/login.component";
import { AuthGuard } from "./share/guards/auth.guard";
import { PaymentResidentComponent } from "./module/payment-resident/payment-resident.component";
import { CommonAreasResidentComponent } from "./module/common-areas-resident/common-areas-resident.component";
import { AdminCommonAreasComponent } from "./module/admin/admin-common-areas/admin-common-areas.component";
import { AdminHousesComponent } from "./module/admin/admin-houses/admin-houses.component";
import { ProfileComponent } from "./module/profile/profile.component";
import { AdminCondominiumComponent } from "./module/admin/admin-condominium/admin-condominium.component";

const routes: Routes = [
  {path: '',  redirectTo: 'login', pathMatch: 'full'},
  {path:'login', component: LoginComponent},
  {path:'resident/:username', canActivate:[AuthGuard], children: [
      {path: '', component: ProfileComponent},
      {path: 'profile', redirectTo: '', pathMatch: 'full'},
      {path: 'payment', component: PaymentResidentComponent},
      {path: 'careas', component: CommonAreasResidentComponent}
    ]},
  {path:'admin/:username', canActivate: [AdminGuard], children:[
      {path: '', component: AdminHomeComponent},
      {path: 'resident', redirectTo: '', pathMatch: 'full'},
      {path: 'careas', component: AdminCommonAreasComponent},
      {path: 'condom', component: AdminCondominiumComponent},
      {path:'condom/:condom_id', component: AdminHousesComponent},
      {path: '**', redirectTo: ''}
    ]},
  {path:'**', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponent = [
  LoginComponent,
  AdminHomeComponent,
  PaymentResidentComponent,
  CommonAreasResidentComponent,
  AdminCommonAreasComponent,
  ProfileComponent,
  AdminHousesComponent,
  AdminCondominiumComponent
]
