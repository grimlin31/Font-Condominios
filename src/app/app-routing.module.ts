import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from "./module/admin/admin-home/admin-home.component";
import { AdminGuard } from "./share/guards/admin.guard";
import { LoginComponent } from "./module/login/login.component";

const routes: Routes = [
  {path: '',  redirectTo: 'login', pathMatch: 'full'},
  {path:'login', component: LoginComponent},
  {path:'admin/:username', canActivate: [AdminGuard], children:[
      {path: '', component: AdminHomeComponent,},
      {path: '**', redirectTo: '', pathMatch: 'full'}
    ]},
  {path:'**', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponent = [
  LoginComponent,
  AdminHomeComponent
]
