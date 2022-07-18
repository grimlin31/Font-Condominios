export interface UserInterface {
  _id: string,
  username: string,
  password?: string,
  email?: string,
  name: string,

  // typeuser
  isAdmin?: boolean,
  actions?: string,
}
