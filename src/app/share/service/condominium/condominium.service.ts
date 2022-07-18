import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from "apollo-angular";
import { MatTableDataSource } from "@angular/material/table";
import { UserInterface } from "../../model/user.interface";
import { CondominiumInterface } from "../../model/condominium.interface";
import { GET_ALL_CONDOMINIUM, GET_CONDOMINIUM_BY_ID, GET_CONDOMINIUM_BY_OWNER_ID } from "./condominium.query";
import { map, Observable } from "rxjs";
import { CommonServiceService } from "../common-service.service";

@Injectable({
  providedIn: 'root'
})
export class CondominiumService extends CommonServiceService{

  // @ts-ignore
  private _qrGetAllCondom: QueryRef<any>;
  // @ts-ignore
  private _qrGetCondomOwnerById: QueryRef<any>;
  // @ts-ignore
  private _qrGetCondomById: QueryRef<any>;

  get qrGetAllCondom() { return this._qrGetAllCondom };
  get qrGetCondomOwnerById() { return this._qrGetCondomOwnerById };
  get qrGetCondomById() { return this._qrGetCondomById }
  private set qrGetCondomById(queryRef: QueryRef<any>) { this._qrGetCondomById = queryRef };
  private set qrGetAllCondom(queryRef: QueryRef<any>) { this._qrGetAllCondom = queryRef };
  private set qrGetCondomOwnerById(querRef: QueryRef<any>) { this._qrGetCondomOwnerById = querRef };

  constructor(
    private _apollo: Apollo
  ) {
    super();
    this.setQueryGetCondomByOwner();
  }

  private setQueryGetAllCondom() {
    this.qrGetAllCondom = this._apollo.watchQuery<CondominiumInterface>({
      query: GET_ALL_CONDOMINIUM,
    })
  }

  private setQueryGetCondomByOwner(): void{
    this._qrGetCondomOwnerById = this._apollo.watchQuery<CondominiumInterface[]>({
      query: GET_CONDOMINIUM_BY_OWNER_ID,
      variables: {
        owner_id: ''
      }
    })
  }

  public getCondomById(_id: string): Observable<CondominiumInterface> {
    return this._apollo.watchQuery<any>({
      query: GET_CONDOMINIUM_BY_ID,
      variables: { _id }
    }).valueChanges.pipe(
      map(({data}: any) => {
        return data.findOneCondominium as CondominiumInterface
      })
    )
  }

  public getAllCondom(): Observable<CondominiumInterface[]> {
    return this._qrGetAllCondom.valueChanges.pipe(
      map(({data}: any) => {
        return data.findAllCondominium as CondominiumInterface[];
      })
    )
  }

  public getCondomByOwnerId():Observable<CondominiumInterface[]> {
    return this.qrGetCondomOwnerById.valueChanges.pipe(
      map(({data}: any) => {
        return data.findByOwnerIdCondominium as CondominiumInterface[];
      })
    );
  }

}
