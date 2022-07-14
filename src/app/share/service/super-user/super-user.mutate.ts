import { gql } from "apollo-angular";

const ADD_SUPER_USER = gql`
  mutation addSuperUser($name: String!, $username: String!, $password: String!){
    addSuperUser(input: { name: $name, username: $username, password: $password}) {
      _id
      name
      username
    }
  }
`

const UPDATE_SUPER_USER = gql`
  mutation updateSuperUser($id: ID!, $name: String, $username: String, $password: String) {
    updateSuperUser(
      id: $id,
      input: { name: $name, username: $username, password: $password}
    ){
      _id
      name
      username
    }
  }
`

const DELETE_SUPER_USER = gql`
  mutation deleteSuperUser($_id: ID!) {
    deleteSuperUser(_id: $_id) {
      _id
      name
      username
    }
  }
`

export {
  ADD_SUPER_USER,
  DELETE_SUPER_USER,
  UPDATE_SUPER_USER
}
