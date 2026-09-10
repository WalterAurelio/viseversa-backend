interface IProduct {
  id: string;
  userId: string;
  title: string;
  description: string;
  images: string[];
  category: string;
  gender: string;
  size: string;
  color: string;
  brand: string;
  condition: string;
  // createdAt: Date;
  isActive: boolean;
}

export default IProduct;
