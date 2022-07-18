import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from "apollo-angular";
import { GET_RESERVE_BY_HOUSE } from "../reserve/reserve.query";
import { map, Observable } from "rxjs";
import { ReserveInterface } from "../../model/reserve.interface";
import { CommonServiceService } from "../common-service.service";
import { GET_COMMON_FIELDS_BY_ID } from "./common-field.query";
import { CommonfundInterface } from "../../model/commonfund.interface";
import { CommonFieldInterface } from "../../model/commonfield.interface";

@Injectable({
  providedIn: 'root'
})
export class CommonFieldService extends CommonServiceService{
  // @ts-ignore
  private _qrGetCommonFieldsById: QueryRef<any>;

  get qrGetCommonFieldsById() { return this._qrGetCommonFieldsById }

  private set qrGetCommonFieldsById(queryRef: QueryRef<any>) { this._qrGetCommonFieldsById = queryRef }

  constructor(
    private _apollo: Apollo,
  ) {
    super();
    this.setGetCommonFieldsById()
  }

  private setGetCommonFieldsById(): void {
    this.qrGetCommonFieldsById = this._apollo.watchQuery<any>({
      query: GET_COMMON_FIELDS_BY_ID,
      variables: {
        commonFieldId: []
      }
    })
  }

  public getCommonFieldsById(): Observable<CommonFieldInterface[]> {
    return this.qrGetCommonFieldsById.valueChanges.pipe(
      map(({data}: any) => data.findCommonfieldsById as CommonFieldInterface[])
    )
  }
}
