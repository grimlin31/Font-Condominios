export interface HouseInterface {
  _id: string,
  condominiumId: string,
  residentsId: [string],
  name: string

  // local
  position?: number,
}
