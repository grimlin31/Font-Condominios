import { gql } from "apollo-angular";

const GET_PERIODS_BY_ID = gql`
  query findPeriodsById($periodsId: [ID!]) {
    findPeriodsById(periodsId: $periodsId) {
      _id
      commonfieldId
      startDate
      endDate
      reserved
    }
  }
`

export {
  GET_PERIODS_BY_ID
}
