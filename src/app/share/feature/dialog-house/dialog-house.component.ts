import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { DialogDataInterface } from "../../model/dialog-data.interface";
import { Router } from "@angular/router";
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from "@angular/material/dialog";
import { TransactionService } from "../../service/transaction/transaction.service";
import { CommonFundService } from "../../service/common-fund/common-fund.service";
import { ReserveService } from "../../service/reserve/reserve.service";
import { TransactionInterface } from "../../model/transaction.interface";
import { CommonfundInterface } from "../../model/commonfund.interface";
import { ReserveInterface } from "../../model/reserve.interface";
import { HouseInterface } from "../../model/house.interface";
import { Subscription } from "rxjs";
import { CondominiumInterface } from "../../model/condominium.interface";
import { MatTableDataSource } from "@angular/material/table";
import { UserInterface } from "../../model/user.interface";
import { PeriodService } from "../../service/period/period.service";
import { PeriodInterface } from "../../model/period.interface";
import { CommonFieldService } from "../../service/common-field/common-field.service";
import { DialogPaymentComponent } from "../dialog-payment/dialog-payment.component";

@Component({
  selector: 'app-dialog-house',
  templateUrl: './dialog-house.component.html',
  styleUrls: ['./dialog-house.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogHouseComponent implements OnInit, OnDestroy {

  data: DialogDataInterface

  user?: UserInterface;
  house?: HouseInterface;
  // @ts-ignore
  reserve = new MatTableDataSource<ReserveInterface>([]);
  columnNameReserve = [
    'position',
    'area',
    'start',
    'end',
    'createdAt'
  ]
  // @ts-ignore
  common: CommonfundInterface;
  // @ts-ignore
  transaction = new MatTableDataSource<TransactionInterface>([]);
  columnNameTransaction = [
    'position',
    'reason',
    'amount',
    'state',
    'createdAt'
  ]

  suscription = new Subscription();
  // @ts-ignore
  condominium?: CondominiumInterface;
  // @ts-ignore
  periodId: String[];
  // @ts-ignore
  commonFieldsId: String[];
  // @ts-ignore
  periodMap: Map<string, PeriodInterface>;
  // @ts-ignore
  commonFieldMap: Map<string, string>;

  constructor(
    public dialogRef: MatDialogRef<DialogHouseComponent>,
    @Inject(MAT_DIALOG_DATA) data: DialogDataInterface,
    private matDialog: MatDialog,
    private _router: Router,
    private _transactionService: TransactionService,
    private _commonFoundService: CommonFundService,
    private _reserveService: ReserveService,
    private _periodService: PeriodService,
    private _cdr: ChangeDetectorRef,
    private _commonFieldService: CommonFieldService
  ) {
    this.data = data;
    this.house = this.data.infoHouse;
    this.user = this.data.infoUser;
    this.condominium = this.data.condominium;
  }
  ngOnInit(): void {
    if (!this.user?.isAdmin) this.columnNameTransaction.push('actions')
    this.getData()
    this.resetAllDataQuery();
  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }

  close() {
    this.dialogRef.close();
  }

  private getData() {
    const transSub = this._transactionService.getTransactionByHouse().subscribe(
      (transaction: TransactionInterface[]) => {
        this.transaction.data = [...transaction].map(
          (transaction, index) => {
            return {
              ...transaction,
              position: index + 1
            }
          }
        );
        this._cdr.markForCheck()
      }
    )
    const commonSub = this._commonFoundService.getCommonFundByHouse().subscribe(
      ([common, ...array]: CommonfundInterface[]) => {
        this.common = common
        this._cdr.markForCheck()
      }
    )
    const reserveSub = this._reserveService.getReserveByHouse().subscribe(
      (reserve: ReserveInterface[]) => {
        this.periodId = [...reserve].map(reserve => reserve.periodId)
        this.reserve.data = [...reserve].map(
          (reserve, index) => {
            return {
              ...reserve,
              position: index + 1
            }
          }
        );
        this._periodService.resetQueryRef(
          this._periodService.qrGetPeriodByIds,
          { periodsId: this.periodId }
        )
        this._cdr.markForCheck()
      }
    )
    const periodSub = this._periodService.getPeriodByIds().subscribe(
      (periods: PeriodInterface[]) => {
        this.commonFieldsId = [...periods].map((period) => period.commonfieldId);
        this.periodMap = this.arrayToMap<string, PeriodInterface>(periods, '_id', [
          'commonfieldId',
          'startDate',
          'endDate',
          'reserved',
          '_id'
        ])
        this._commonFieldService.resetQueryRef(
          this._commonFieldService.qrGetCommonFieldsById,
          { commonFieldId: this.commonFieldsId }
        )
        this._cdr.markForCheck()
      }
    )

    const commonFieldSub = this._commonFieldService.getCommonFieldsById().subscribe(
      (commonFields) => {
        this.commonFieldMap = this.arrayToMap<string, string>(
          commonFields,
          '_id',
          ['name']
        );
        this._cdr.markForCheck()

      }
    )


    this.suscription.add(transSub);
    this.suscription.add(reserveSub);
    this.suscription.add(commonSub);
    this.suscription.add(periodSub);
    this.suscription.add(commonFieldSub);
  }

  public resetAllDataQuery() {
    this._commonFoundService.resetQueryRef(
      this._commonFoundService.qrGetCommonFundByHouse,
      {houseId: this.data.infoHouse?._id}
    )

    this._reserveService.resetQueryRef(
      this._reserveService.qrGetReserveByHouse,
      {houseId: this.data.infoHouse?._id}
    )

    this.resetQueryTransactions()
  }

  private resetQueryTransactions() {
    this._transactionService.resetQueryRef(
      this._transactionService.qrGetTransactionByHouse,
      {houseId: this.data.infoHouse?._id}
    )
  }

  isPaid(element: TransactionInterface): boolean {
    return element.amount === element.payedAmount;
  }

  payTransaction(element: TransactionInterface) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.maxWidth = '40%'

    dialogConfig.data = {
      title: 'Pay Transaction',
      transaction: element,
      pay: true,
    } as DialogDataInterface

    const dialog = this.matDialog.open(DialogPaymentComponent, dialogConfig)

    dialog.afterClosed().subscribe(
      (paymentAmount) => {
        if (!paymentAmount) return;
        const subPay = this._transactionService.payTransaction(
          element._id,
          parseInt(paymentAmount)
        ).subscribe(() => this.resetQueryTransactions());
        this.suscription.add(subPay);
      }
    )
  }

  detailPayment(element: TransactionInterface) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.maxWidth = '40%'

    dialogConfig.data = {
      title: 'Pay Transaction',
      transaction: element,
      pay: false,

    } as DialogDataInterface

    this.matDialog.open(DialogPaymentComponent, dialogConfig)
  }

  private arrayToMap<K,V>(arr:any, key: string, value: string[]) {
    if (value?.length > 1) {
      return new Map<K,V>(
        arr?.map((obj: any) => {
          const newObj = {}
          value.map((v: any) => {
            // @ts-ignore
            return newObj[v] = obj[v]
          })
          return [obj[key], newObj]
        })
      )
    }
    return new Map<K, V>(
      arr.map((obj: any) => [obj[key], obj[value[0]]])
    )
  }
}
