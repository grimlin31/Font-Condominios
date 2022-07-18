import { gql } from "apollo-angular";

const GET_ALL_RESIDENT = gql`
  query findAllResident {
    findAllResident {
      _id
      name
      username
      email
    }
  }
`

const GET_RESIDENT_BY_USERNAME = gql`
  query findResidentByUsername($username: String!){
    findResidentByUsername(username: $username) {
      _id
      name
      username
      email
    }
  }
`

const AUTHENTICATION_USER = gql`
  query authResident($username: String!, $pass: String!) {
    authResident(username: $username, password: $pass)
  }
`

const GET_USER_BY_ID = gql`
  query findOneResident($_id: ID!) {
    findOneResident(_id: $_id) {
      _id
      name
      username
      email
    }
  }
`

export {
  GET_ALL_RESIDENT,
  GET_RESIDENT_BY_USERNAME,
  AUTHENTICATION_USER,
  GET_USER_BY_ID
}
