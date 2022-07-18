export interface TransactionInterface {
  _id: string
  houseId: string,
  detail: string,
  reason: string,
  amount: number,
  payedAmount: number,
  expirationFee: number,
  expirationCycle: string,
  createdAt: Date

  // local
  position?: number;
  actions: number;
}
