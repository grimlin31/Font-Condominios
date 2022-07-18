import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from "apollo-angular";
import { GET_RESERVE_BY_HOUSE } from "./reserve.query";
import { map, Observable } from "rxjs";
import { ReserveInterface } from "../../model/reserve.interface";
import { CommonServiceService } from "../common-service.service";

@Injectable({
  providedIn: 'root'
})
export class ReserveService extends CommonServiceService {
  // @ts-ignore
  private _qrGetReserveByHouse: QueryRef<any>;

  get qrGetReserveByHouse() { return this._qrGetReserveByHouse }

  private set qrGetReserveByHouse(queryRef: QueryRef<any>) { this._qrGetReserveByHouse = queryRef }

  constructor(
    private _apollo: Apollo,
  ) {
    super();
    this.setGetReserveByHouse()
  }

  private setGetReserveByHouse(): void {
    this.qrGetReserveByHouse = this._apollo.watchQuery<any>({
      query: GET_RESERVE_BY_HOUSE,
      variables: {
        houseId: ''
      }
    })
  }

  public getReserveByHouse(): Observable<ReserveInterface[]> {
    return this.qrGetReserveByHouse.valueChanges.pipe(
      map(({data}: any) => data.findAllReserveByHouse as ReserveInterface[])
    )
  }
}
