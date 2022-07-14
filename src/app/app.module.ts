import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routingComponent } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './module/profile/profile.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatTabsModule } from "@angular/material/tabs";
import { AdminLoginComponent } from './module/admin/admin-login/admin-login.component';
import { AdminGuard } from "./share/guards/admin.guard";
import { ResidentLoginComponent } from "./module/resident-login/resident-login.component";
import { MatToolbarModule } from "@angular/material/toolbar";

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    AdminLoginComponent,
    ResidentLoginComponent,
    routingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FlexLayoutModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatToolbarModule
  ],
  providers: [AdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
