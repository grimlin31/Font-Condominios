import { gql } from "apollo-angular";

const AUTH_SUPER_USER = gql`
  query authSuperUser($username: String!, $pass: String!) {
    authSuperUser(username: $username, password: $pass)
  }
`

const GET_BY_USERMANE = gql`
  query findSuperUserByUsername($username: String) {
    findSuperUserByUsername(username: $username) {
      _id
      username
      name
    }
  }
`

export {
  AUTH_SUPER_USER,
  GET_BY_USERMANE
}
