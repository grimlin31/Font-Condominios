import { gql } from "apollo-angular";

const GET_HOUSES_BY_CONDOM_ID = gql`
  query findAllHousesByCondominium($condominiumId: ID!) {
    findAllHousesByCondominium(condominiumId: $condominiumId) {
      _id
      condominiumId
      residentsId
      name
    }
  }
`

const GET_HOUSES_BY_RESIDENT_ID = gql`
  query findAllHousesByResident($residentId: ID!) {
    findAllHousesByResident(residentId: $residentId) {
      _id
      condominiumId
      residentsId
      name
    }
  }
`

export {
  GET_HOUSES_BY_CONDOM_ID,
  GET_HOUSES_BY_RESIDENT_ID
}
