import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from "apollo-angular";
import { map, Observable } from "rxjs";
import { ADD_RESIDENT, DELETE_RESIDENT, UPDATE_RESIDENT } from "./resident.mutate";
import { UserInterface } from "../../model/user.interface";
import { AUTHENTICATION_USER, GET_ALL_RESIDENT, GET_RESIDENT_BY_USERNAME, GET_USER_BY_ID } from "./resident.query";


@Injectable({
  providedIn: 'root'
})
export class ResidentService {

  // @ts-ignore
  private _qrGetAllResident: QueryRef<any>;

  get qrGetAllResident() { return this._qrGetAllResident }

  constructor(
    private _apollo: Apollo
  ) {
    this.setQueryGetAllResident();
  }

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

  private setQueryGetAllResident(): void {
     this._qrGetAllResident = this._apollo.watchQuery<any>({
      query: GET_ALL_RESIDENT,
    })
  }

  public getUserById(
    _id: String
  ): Observable<UserInterface> {
    return this._apollo.watchQuery({
      query: GET_USER_BY_ID,
      variables: {
        _id
      }
    }).valueChanges.pipe(
      map(({data}:  any) => {
        return data.findOneResident as UserInterface;
      })
    );
  }

  public getAllResident(): Observable<UserInterface[]>{
    return this.qrGetAllResident
      .valueChanges
      .pipe(
        map(({data}: any) => {
          return data.findAllResident as UserInterface[];
        })
      )
  }

  public getByUsername(username: string): Observable<UserInterface> {
    return this._apollo.watchQuery<any>({
      query: GET_RESIDENT_BY_USERNAME,
      variables: {
        username,
      }
    }).valueChanges.pipe(
      map(({data}: any) => {
        return data.findResidentByUsername as UserInterface
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

  public resetQueryRef(query: QueryRef<any>, variable?: any) {
    query.refetch(variable);
  }
}
