import { IProductDocument } from "../models/Product";
import IProduct from "../interfaces/IProduct";

export class ProductCardDto implements Partial<IProduct> {
  id: string;
  title: string;
  description: string;
  image: string;

  constructor(data: IProductDocument) {
    this.id = data._id.toString();
    this.title = data.title;
    this.description = data.description;
    this.image = data.images[0];
  }
}
