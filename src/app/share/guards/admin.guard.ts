import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { SuperUserService } from "../service/super-user/super-user.service";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { DialogComponent } from "../feature/dialog/dialog.component";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    private _adminService: SuperUserService,
    private _router: Router,
    private _dialog: MatDialog,
  ) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const { username } = route.params
    const routeState = this._router.getCurrentNavigation()?.extras?.state as any;

    if ((!username || !routeState?.password)) {
      this.openDialog(
        'Access Error',
        "Do not access to this page",
        true
      );
      return of(false)
    };

    return this._adminService.authSuperUser(username, routeState?.password)
      .pipe(
        map((isSuperUser => {
          if (isSuperUser) return isSuperUser;
          this.openDialog(
            'Login Error',
            'User or password are incorrect, please try again.',
            false
          );
          return isSuperUser;
        }))
      );
  }

  private openDialog(title: string, message: string, redirect: boolean) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      title,
      message,
      redirect
    }

    this._dialog.open(DialogComponent, dialogConfig);
  }

}
