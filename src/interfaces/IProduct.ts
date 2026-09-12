import { Category } from "../types/Category";
import { Gender } from "../types/Gender";
import { Size } from "../types/Size";
import { Color } from "../types/Colour";
import { Condition } from "../types/Condition";

interface IProduct {
  id: string;
  userId: string;
  title: string;
  description: string;
  images: string[];
  category: Category;
  gender: Gender;
  size: Size;
  color: Color;
  brand: string;
  condition: Condition;
  isActive: boolean;
}

export default IProduct;
