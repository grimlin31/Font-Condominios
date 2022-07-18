import { gql } from "apollo-angular";

const GET_COMMON_FIELDS_BY_ID = gql`
  query findCommonfieldsById($commonFieldId: [ID!]) {
    findCommonfieldsById(commonfieldsId:$commonFieldId) {
      _id
      condominiumId
      name
      description
      period
      periodFee
    }
  }
`

export {
  GET_COMMON_FIELDS_BY_ID
}
