export interface ReserveInterface {
  _id: string
  houseId: string,
  periodId: string,
  transactionId: string
  createdAt: Date

  // local
  position?: number
}
