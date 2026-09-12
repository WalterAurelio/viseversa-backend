import { connectDb } from "../config/database";
import seedUsers from "./seedUsers";
import seedProducts from "./seedProducts";

const seedDatabase = async () => {
  try {
    await connectDb();
    await seedUsers();
    await seedProducts();
    console.log("✅ Base de datos sembrada correctamente");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error al sembrar la base de datos:", error);
    process.exit(1);
  }
};

seedDatabase();
