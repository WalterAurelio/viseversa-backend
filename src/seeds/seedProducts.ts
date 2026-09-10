import Product from "../models/Product";
import products from "../json/products.json";

const seedProducts = async () => {
  await Product.deleteMany({});
  console.log("✅ Productos eliminados de la base de datos");

  await Product.insertMany(products);
  console.log("✅ Productos creados en la base de datos");
};

export default seedProducts;
