import { gql } from "apollo-angular";

const GET_TRANSACTION_BY_HOUSE = gql`
  query findAllTransactionByHouse($houseId: ID!){
    findAllTransactionByHouse(houseId: $houseId) {
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
  GET_TRANSACTION_BY_HOUSE
}
