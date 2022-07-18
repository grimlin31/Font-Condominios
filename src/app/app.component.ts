import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { UserInterface } from "./share/model/user.interface";
import { Apollo } from "apollo-angular";
import { SuperUserService } from "./share/service/super-user/super-user.service";
import { ResidentService } from "./share/service/resident/resident.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'angular-graphql';

  username: string = '';

  buttonArray: string[] = []

  // @ts-ignore
  user: Partial<UserInterface>;

  isLogin = true;

  constructor(
    private _router: Router,
    private _routes: ActivatedRoute,
    private _adminUserService: SuperUserService,
    private _residentServices: ResidentService,
  ) {
    this._router.events.subscribe(
      (value) => {
        this.user = {}
        if(value instanceof NavigationEnd) {
          this.username = value.url.split('/')[2]
          if (value.url.includes('admin')) {
            this.buttonArray = [
              'Condominium',
              'Common Areas',
              'Residents'
            ]
            this.getUserSuper()
          }
          else if (value.url.includes('resident')) {
            this.buttonArray = [
              'Common Areas',
            ]
            this.getUser()
          }


          this.isLogin = value.url === '/login' || value.urlAfterRedirects === '/login'
        }
      }
    )
  }

  ngOnInit(): void {
  }

  private getUserSuper(): void {
    this._adminUserService.getByUsername(this.username).subscribe(
      (user:Partial<UserInterface>) => {
        this.user = {...user, isAdmin: true};
      }
    )
  }

  private getUser(): void {
    this._residentServices.getByUsername(this.username).subscribe(
      (user:Partial<UserInterface>) => {
        this.user = {...user, isAdmin: false};
      }
    )
  }

  goTo(i?: number) {
    switch (i) {
      case 0:
        if (this.user?.isAdmin) {
          this._router.navigate(['admin', this.user.username, 'condom'], {
            state: {...this.user}
          })
          return;
        }
        this._router.navigate(['resident', this.user.username, 'payment'], {
          state: {...this.user}
        });
        return;
      case 1:
        if (this.user?.isAdmin) {
          this._router.navigate(['admin', this.user.username, 'careas'], {
            state: {...this.user}
          });
          return;
        }
        this._router.navigate(['resident', this.user.username, 'careas'], {
          state: {...this.user}
        });
        return;
      case 2:
        if (this.user?.isAdmin) {
          this._router.navigate(['admin', this.user.username, 'resident'], {
            state: {...this.user}
          });
          return;
        }
        return;
      default:
        if (!this.user.isAdmin) {
          this._router.navigate(['resident', this.user.username, 'profile'], {
            state: {...this.user}
          });
          return;
        }
        return;
    }
  }

  logout() {
    this._router.navigate(['']);
  }
}
