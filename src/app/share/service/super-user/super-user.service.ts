import { Injectable } from '@angular/core';
import { Apollo } from "apollo-angular";
import { UserInterface } from "../../model/user.interface";
import { ADD_SUPER_USER } from "./super-user.mutate";
import { catchError, map, Observable } from "rxjs";
import { AUTH_SUPER_USER, GET_BY_USERMANE } from "./super-user.query";

@Injectable({
  providedIn: 'root'
})
export class SuperUserService {

  constructor(
    private _apollo: Apollo
  ) { }

  public addNewAdmin(
    user: UserInterface
  ): Observable<UserInterface> {
    return this._apollo.mutate({
      mutation: ADD_SUPER_USER,
      variables: {
        ...user
      }
    }).pipe(
      map(({data}: any) => {
        return data.addSuperUser as UserInterface;
      })
    )
  }

  public authSuperUser(
    username: String,
    password: String,
  ): Observable<boolean> {
    return this._apollo.watchQuery({
      query: AUTH_SUPER_USER,
      variables: {
        username,
        pass: password,
      }
    }).valueChanges.pipe(
      map(({data}: any) => {
        return data.authSuperUser;
      })
    )
  }

  public getByUsername(
    username: String,
  ): Observable<Partial<UserInterface>> {
    return this._apollo.watchQuery({
      query: GET_BY_USERMANE,
      variables: {
        username,
      }
    }).valueChanges.pipe(
      map(({data}: any) => {
        return data.findSuperUserByUsername;
      })
    )
  }

}
