import { gql } from "apollo-angular";

const GET_RESERVE_BY_HOUSE = gql`
  query findAllReserveByHouse($houseId: ID!) {
    findAllReserveByHouse(houseId: $houseId) {
      _id
      houseId
      periodId
      transactionId
      createdAt
    }
  }
`

export {
  GET_RESERVE_BY_HOUSE
}
