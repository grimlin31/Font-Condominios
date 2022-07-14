import { gql } from "apollo-angular";

const ADD_RESIDENT = gql`
  mutation addResident($name: String, $username: String, $password: String){
    addResident(input: { name: $name, username: $username, password: $password}) {
      _id
      name
      username
    }
  }
`

const UPDATE_RESIDENT = gql`
  mutation updateResident($id: ID!, $name: String, $username: String, $password: String) {
    updateResident(
      id: $id,
      input: { name: $name, username: $username, password: $password}
    ){
      _id
      name
      username
    }
  }
`

const DELETE_RESIDENT = gql`
  mutation deleteResident($_id: ID!) {
    deleteResident(_id: $_id) {
      _id
      name
      username
    }
  }
`

export {
  ADD_RESIDENT,
  DELETE_RESIDENT,
  UPDATE_RESIDENT
}
