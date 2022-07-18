import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from "apollo-angular";
import { map, Observable } from "rxjs";
import { CommonServiceService } from "../common-service.service";
import { GET_PERIODS_BY_ID } from "./period.query";
import { PeriodInterface } from "../../model/period.interface";

@Injectable({
  providedIn: 'root'
})
export class PeriodService extends CommonServiceService{

// @ts-ignore
  private _qrGetPeriodByIds: QueryRef<any>;

  get qrGetPeriodByIds() { return this._qrGetPeriodByIds }

  private set qrGetPeriodByIds(queryRef: QueryRef<any>) { this._qrGetPeriodByIds = queryRef }

  constructor(
    private _apollo: Apollo,
  ) {
    super();
    this.setGetPeriodByIds()
  }

  private setGetPeriodByIds(): void {
    this.qrGetPeriodByIds = this._apollo.watchQuery<any>({
      query: GET_PERIODS_BY_ID,
      variables: {
        periodsId: []
      }
    })
  }

  public getPeriodByIds(): Observable<PeriodInterface[]> {
    return this.qrGetPeriodByIds.valueChanges.pipe(
      map(({data}: any) => {
        console.log(data)
        return data.findPeriodsById as PeriodInterface[]
      })
    )
  }
}
