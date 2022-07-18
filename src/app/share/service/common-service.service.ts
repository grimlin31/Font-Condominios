import { QueryRef } from "apollo-angular";

export abstract class CommonServiceService {

  constructor() {}

  public resetQueryRef(queryRef: QueryRef<any>, variables: any){
    return queryRef.refetch(variables);
  }
}
