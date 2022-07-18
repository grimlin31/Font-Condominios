
import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from "apollo-angular";
import { GET_HOUSES_BY_CONDOM_ID, GET_HOUSES_BY_RESIDENT_ID } from "./houses.query";
import { map, Observable } from "rxjs";
import { HouseInterface } from "../../model/house.interface";

@Injectable({
  providedIn: 'root'
})
export class HouseService {

  // @ts-ignore
  private _qrGetHousesByCondomId: QueryRef<any>;
  // @ts-ignore
  private _qrGetHousesByResidentId: QueryRef<any>;

  get qrGetHousesByCondomId() { return this._qrGetHousesByCondomId }
  get qrGetHousesByResidentId() { return this._qrGetHousesByResidentId }

  private set qrGetHousesByCondomId(queryRef: QueryRef<any>) { this._qrGetHousesByCondomId = queryRef }
  private set qrGetHousesByResidentId(queryRef: QueryRef<any>) { this._qrGetHousesByResidentId = queryRef }

  constructor(
    private apollo: Apollo,
  ) {
    this.setGetHousesByCondomId();
    this.setGetHousesByResidenId()
  }

  private setGetHousesByCondomId(): void {
    this.qrGetHousesByCondomId = this.apollo.watchQuery<any>({
      query: GET_HOUSES_BY_CONDOM_ID,
      variables: { condominiumId: '' }
    })
  }

  private setGetHousesByResidenId(): void {
    this.qrGetHousesByResidentId = this.apollo.watchQuery<any>({
      query: GET_HOUSES_BY_RESIDENT_ID,
      variables: {
        residentId: ''
      }
    })
  }

  public getHousesByCondomId(): Observable<HouseInterface[]> {
    return this.qrGetHousesByCondomId.valueChanges.pipe(
      map(({data}: any) => data.findAllHousesByCondominium as HouseInterface[])
    )
  }

  public getHousesByResidentId(): Observable<HouseInterface[]> {
    return this.qrGetHousesByResidentId.valueChanges.pipe(
      map(
        ({data}: any) => {
          return data.findAllHousesByResident as HouseInterface[];
        }
      )
    )
  }

  public resetQueryRef(queryRef: QueryRef<any>, variables: any): void{
    queryRef.refetch(variables);
  }

}
