import { UserDocument } from "../models/User";

export class UserProfileDto {
  name: string;
  lastName: string;
  username: string;
  profilePicture?: string;
  location?: string;
  createdAt: Date;

  constructor(data: UserDocument) {
    this.name = data.name;
    this.lastName = data.lastName;
    this.username = data.username;
    this.profilePicture = data.profilePicture;
    this.location = data.location;
    this.createdAt = data.createdAt;
  }
}
