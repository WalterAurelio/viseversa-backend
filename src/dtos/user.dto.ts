import { IUserDocument } from "../models/User";
import IUser from "../interfaces/IUser";

export class UserProfileDto implements Partial<IUser> {
  name: string;
  lastName: string;
  username: string;
  profilePicture?: string;
  location?: string;
  createdAt: Date;

  constructor(data: IUserDocument) {
    this.name = data.name;
    this.lastName = data.lastName;
    this.username = data.username;
    this.profilePicture = data.profilePicture;
    this.location = data.location;
    this.createdAt = data.createdAt;
  }
}
