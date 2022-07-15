import { UserInterface } from "./user.interface";

export interface DialogDataInterface {
  title: string,
  message?: string,
  redirect?: boolean

  infoUser?: UserInterface;

  type: {
    error?: boolean,
    edit?: boolean,
    create?: boolean,
    delete?: boolean,
  }
}
