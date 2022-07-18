import { gql } from "apollo-angular";

const PAY_TRANSACTION = gql`
  mutation payTransaction($transactionId: ID!, $payedAmount: Int) {
    payTransaction(transactionId: $transactionId, payedAmount: $payedAmount) {
      _id
      houseId
      detail
      reason
      amount
      payedAmount
      expirationFee
      expirationCycle
      createdAt
    }
  }
`

export {
  PAY_TRANSACTION,
}
