import { gql } from "apollo-angular";

const GET_COMMON_FUND_BY_HOUSE = gql`
  query findAllCommonfundByHouse($houseId: ID!) {
    findAllCommonfundByHouse(houseId: $houseId) {
      _id
      houseId
      amount
      detail
      expirationCycle
    }
  }
`
export {
  GET_COMMON_FUND_BY_HOUSE
}
