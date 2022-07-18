import { Injectable } from '@angular/core';
import { CommonServiceService } from "../common-service.service";
import { Apollo, QueryRef } from "apollo-angular";
import { map, Observable } from "rxjs";
import { ReserveInterface } from "../../model/reserve.interface";
import { GET_TRANSACTION_BY_HOUSE } from "./transaction-query";
import { TransactionInterface } from "../../model/transaction.interface";
import { PAY_TRANSACTION } from "./transaction-mutate";

@Injectable({
  providedIn: 'root'
})
export class TransactionService extends CommonServiceService{

// @ts-ignore
  private _qrGetTransactionByHouse: QueryRef<any>;

  get qrGetTransactionByHouse() { return this._qrGetTransactionByHouse }

  private set qrGetTransactionByHouse(queryRef: QueryRef<any>) { this._qrGetTransactionByHouse = queryRef }

  constructor(
    private _apollo: Apollo,
  ) {
    super();
    this.setGetTransactionByHouse()
  }

  private setGetTransactionByHouse(): void {
    this.qrGetTransactionByHouse = this._apollo.watchQuery<any>({
      query: GET_TRANSACTION_BY_HOUSE,
      variables: {
        houseId: ''
      }
    })
  }

  public getTransactionByHouse(): Observable<TransactionInterface[]> {
    return this.qrGetTransactionByHouse.valueChanges.pipe(
      map(({data}: any) => data.findAllTransactionByHouse as TransactionInterface[])
    )
  }

  public payTransaction(
    transactionId: string,
    payedAmount: number
  ): Observable<TransactionInterface>{
    return this._apollo.mutate({
      mutation: PAY_TRANSACTION,
      variables: {
        transactionId,
        payedAmount
      }
    }).pipe(
      map(({data}: any) => data.payTransaction as TransactionInterface)
    )
  }

}
