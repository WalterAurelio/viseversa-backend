import { ProductDocument } from "../models/Product";

type ProductWithUserLocation = Omit<ProductDocument, "userId"> & {
  userId: {
    location: string;
  };
};

export class ProductIdentifierDto {
  id: string;

  constructor(data: ProductDocument) {
    this.id = data._id.toString();
  }
}

export class ProductDisplayDto {
  id: string;
  title: string;
  image: string;
  inExchangeOf: string;
  location: string;

  constructor(data: ProductWithUserLocation) {
    this.id = data._id.toString();
    this.title = data.title;
    this.image = data.images[0];
    this.inExchangeOf = data.inExchangeOf;
    this.location = data.userId.location;
  }
}

export class ProductDetailsDto {
  id: string;
  title: string;
  description: string;
  images: string[];
  category: string;
  gender: string;
  size: string;
  color: string;
  brand: string;
  condition: string;
  location: string;

  constructor(data: ProductWithUserLocation) {
    this.id = data._id.toString();
    this.title = data.title;
    this.description = data.description;
    this.images = data.images;
    this.category = data.category;
    this.gender = data.gender;
    this.size = data.size;
    this.color = data.color;
    this.brand = data.brand;
    this.condition = data.condition;
    this.location = data.userId.location;
  }
}
