export interface TransactionInterface {
  _id: String
  houseId: String,
  detail: String,
  reason: String,
  amount: Number,
  payedAmount: Number,
  expirationFee: Number,
  expirationCycle: String,
  createdAt: Date
}