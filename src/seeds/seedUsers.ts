import "../firebase/app";
import { getAuth } from "firebase-admin/auth";
import User from "../models/User";
import users from "../json/users.json";

const auth = getAuth();

const seedUsers = async () => {
  await User.deleteMany({});
  console.log("✅ Usuarios eliminados de la base de datos");

  const usersArr = await auth.listUsers();
  const uids = usersArr.users.map(user => user.uid);
  if (uids.length > 0) {
    await auth.deleteUsers(uids);
    console.log("✅ Usuarios eliminados de Firebase Authentication");
  } else {
    console.log("✅ No hay usuarios para eliminar en Firebase Authentication");
  }

  for (const user of users) {
    const { id, password, ...rest } = user;

    const firebaseUser = await auth.createUser({
      email: user.email,
      password
    });
    await User.create({
      _id: id,
      firebaseUid: firebaseUser.uid,
      ...rest
    });
  }
  console.log("✅ Usuarios creados en Firebase Authentication y en la base de datos");
};

export default seedUsers;
