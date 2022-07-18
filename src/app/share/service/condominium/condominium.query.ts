import { gql } from "apollo-angular";

const GET_ALL_CONDOMINIUM = gql`
  query findAllCondominium {
    findAllCondominium {
    _id
    owner_id
    name
    }
  }
`

const GET_CONDOMINIUM_BY_ID = gql`
  query findOneCondominium($_id: ID!) {
    findOneCondominium(_id: $_id) {
      _id
      owner_id
      name
    }
  }
`

const GET_CONDOMINIUM_BY_OWNER_ID = gql`
  query findByOwnerIdCondominium($owner_id: ID!) {
    findByOwnerIdCondominium(owner_id: $owner_id) {
      _id
      owner_id
      name
    }
  }
`


export {
  GET_ALL_CONDOMINIUM,
  GET_CONDOMINIUM_BY_ID,
  GET_CONDOMINIUM_BY_OWNER_ID
}
