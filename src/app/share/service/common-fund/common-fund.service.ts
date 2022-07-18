import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from "apollo-angular";
import { GET_RESERVE_BY_HOUSE } from "../reserve/reserve.query";
import { map, Observable } from "rxjs";
import { CommonServiceService } from "../common-service.service";
import { CommonfundInterface } from "../../model/commonfund.interface";
import { GET_COMMON_FUND_BY_HOUSE } from "./common-fund.query";

@Injectable({
  providedIn: 'root'
})
export class CommonFundService extends CommonServiceService{
// @ts-ignore
  private _qrGetCommonFundByHouse: QueryRef<any>;

  get qrGetCommonFundByHouse() { return this._qrGetCommonFundByHouse }

  private set qrGetCommonFundByHouse(queryRef: QueryRef<any>) { this._qrGetCommonFundByHouse = queryRef }

  constructor(
    private _apollo: Apollo,
  ) {
    super();
    this.setGetCommonFundByHouse()
  }

  private setGetCommonFundByHouse(): void {
    this.qrGetCommonFundByHouse = this._apollo.watchQuery<any>({
      query: GET_COMMON_FUND_BY_HOUSE,
      variables: {
        houseId: ''
      }
    })
  }

  public getCommonFundByHouse(): Observable<CommonfundInterface[]> {
    return this.qrGetCommonFundByHouse.valueChanges.pipe(
      map(({data}: any) => {
        return data.findAllCommonfundByHouse as CommonfundInterface[];
      })
    )
  }
}
