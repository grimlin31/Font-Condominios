import { UserInterface } from "./user.interface";
import { HouseInterface } from "./house.interface";
import { CondominiumInterface } from "./condominium.interface";
import { TransactionInterface } from "./transaction.interface";

export interface DialogDataInterface {
  title: string,
  message?: string,
  redirect?: boolean

  infoUser?: UserInterface;
  infoHouse?: HouseInterface;
  condominium?: CondominiumInterface;
  transaction?: TransactionInterface;

  pay?: boolean;

  type: {
    error?: boolean,
    edit?: boolean,
    create?: boolean,
    delete?: boolean,
  }
}
