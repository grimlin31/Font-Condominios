import { gql } from "apollo-angular";

const AUTH_SUPER_USER = gql`
  query authSuperUser($username: String!, $pass: String!) {
    authSuperUser(username: $username, password: $pass)
  }
`

export {
  AUTH_SUPER_USER
}
