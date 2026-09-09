interface IUser {
  id: string;
  firebaseUid: string;
  username: string;
  profilePicture?: string;
  name: string;
  lastName: string;
  email: string;
  location?: string;
  createdAt: Date;
}

export default IUser;
