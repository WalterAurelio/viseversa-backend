import { connectDb } from "../config/database";
import seedComments from "./seedComments";
import seedProducts from "./seedProducts";
import seedUsers from "./seedUsers";

const seedDatabase = async () => {
  try {
    await connectDb();
    await seedComments();
    await seedProducts();
    await seedUsers();
    console.log("✅ Base de datos sembrada correctamente");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error al sembrar la base de datos:", error);
    process.exit(1);
  }
};

seedDatabase();
