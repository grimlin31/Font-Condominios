import { Injectable } from '@angular/core';
import { Apollo } from "apollo-angular";
import { map, Observable } from "rxjs";
import { ADD_RESIDENT, DELETE_RESIDENT, UPDATE_RESIDENT } from "./resident.mutate";
import { UserInterface } from "../../model/user.interface";
import { AUTHENTICATION_USER, GET_ALL_RESIDENT, GET_RESIDENT_BY_USERNAME } from "./resident.query";
import { GET_BY_USERMANE } from "../super-user/super-user.query";

@Injectable({
  providedIn: 'root'
})
export class ResidentService {

  constructor(
    private _apollo: Apollo
  ) { }

  public authenticate(
    username: string,
    pass: string,
  ): Observable<boolean> {
    return this._apollo.watchQuery({
      query: AUTHENTICATION_USER,
      variables: {
        username,
        pass
      }
    }).valueChanges
      .pipe(
        map(({data}: any) => data.authResident)
      )
  }

  public getAllResident(): Observable<UserInterface[]> {
    return this._apollo.watchQuery({
      query: GET_ALL_RESIDENT
    }).valueChanges.pipe(
      map(({data}:any) => {
        return data.findAllResident
      })
    )
  }

  public getByUsername(
    username: String,
  ): Observable<Partial<UserInterface>> {
    return this._apollo.watchQuery({
      query: GET_RESIDENT_BY_USERNAME,
      variables: {
        username,
      }
    }).valueChanges.pipe(
      map(({data}: any) => {
        return data.findResidentByUsername;
      })
    )
  }

  public addResident(resident: Partial<UserInterface>): Observable<UserInterface> {
    return this._apollo.mutate({
      mutation: ADD_RESIDENT,
      variables: resident
    }).pipe(
      map(({data}: any) => {
        return data.addResident
      }))
  }

  public deleteResident(_id: String): Observable<UserInterface> {
    return this._apollo.mutate({
      mutation: DELETE_RESIDENT,
      variables: { _id },
    }).pipe(
      map(({data}: any) => {
        return data.deleteResident
      })
    )
  }

  public updateResident(_id: String, resident: UserInterface): Observable<UserInterface> {
    return this._apollo.mutate({
      mutation: UPDATE_RESIDENT,
      variables:{
        ...resident,
        id: _id
      }
    }).pipe(
      map(({data}: any) => {
        return data.updateResident
      })
    )
  }
}
