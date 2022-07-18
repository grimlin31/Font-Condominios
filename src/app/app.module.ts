import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routingComponent } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
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
import { DialogComponent } from './share/feature/dialog/dialog.component';
import { MatDialogModule } from "@angular/material/dialog";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { DialogFormComponent } from './share/feature/dialog-form/dialog-form.component';
import { MatMenuModule } from "@angular/material/menu";
import { MatGridListModule } from "@angular/material/grid-list";
import { DialogHouseComponent } from './share/feature/dialog-house/dialog-house.component';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatChipsModule } from "@angular/material/chips";
import { DialogPaymentComponent } from './share/feature/dialog-payment/dialog-payment.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminLoginComponent,
    ResidentLoginComponent,
    routingComponent,
    DialogComponent,
    DialogFormComponent,
    DialogHouseComponent,
    DialogPaymentComponent,
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
    MatToolbarModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatMenuModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    MatChipsModule
  ],
  providers: [AdminGuard],
  bootstrap: [AppComponent],
  entryComponents: [
    DialogComponent,
    DialogFormComponent
  ]
})
export class AppModule { }
