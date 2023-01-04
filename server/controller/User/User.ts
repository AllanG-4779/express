import { UserType } from "../../types/types";

export class User {
 
  private userList: UserType[];

  constructor() {
  
    this.userList = [
      {
        username: "gregory",
        firstname: "Gregory",
        lastname: "Ouma",
        age: 23,
        email: "allang@gmail.com",
        password: "1345",
      },
      {
        username: "Allan",
        firstname: "AllanG",
        lastname: "Onyango",
        age: 23,
        email: "grg@gmail.com",
        password: "1345",
      },
    ];
  }

  public getUser(username: string): UserType {
    const user = this.userList.filter(
      (user: UserType) => user.username === username
    )[0];
    return user;
  }
  public postUser(user: UserType): UserType[] {
    this.userList.push(user);
    return this.userList;
  }
  public getUserList(): UserType[] {
    return this.userList;
  }
}
