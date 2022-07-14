import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { SuperUserService } from "../service/super-user/super-user.service";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    private _adminService: SuperUserService,
    private _router: Router,
  ) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const { username } = route.params
    const routeState = this._router.getCurrentNavigation()?.extras?.state as any;

    if (!username || !routeState?.password ) return of(false);

    return this._adminService.authSuperUser(username, routeState?.password)
  }

}
