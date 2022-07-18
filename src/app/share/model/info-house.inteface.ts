import { HouseInterface } from "./house.interface";
import { CommonfundInterface } from "./commonfund.interface";
import { TransactionInterface } from "./transaction.interface";
import { ReserveInterface } from "./reserve.interface";

export interface InfoHouseInteface {
  house: HouseInterface,
  commonFound: CommonfundInterface,
  transaction: TransactionInterface,
  reserve: ReserveInterface,
}
