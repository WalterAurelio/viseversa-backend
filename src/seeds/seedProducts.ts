import Product from "../models/Product";
import products from "../json/products.json";

const seedProducts = async () => {
  await Product.deleteMany({});
  console.log("✅ Productos eliminados de la base de datos");

  await Product.insertMany(products.map((product) => ({ _id: product.id, ...product })));
  console.log("✅ Productos creados en la base de datos");
};

export default seedProducts;
