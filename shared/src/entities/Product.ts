import { Category } from "./Category";

export type AdditionalInfo = Record<string, string>;

export enum ProductStatusEnum {
  ACTIVE = "ACTIVE",
  DISABLED = "DISABLED",
}

export interface Product {
  id: string;
  name: string;
  uploadedDate: Date;
  description: string;
  price: number;
  sellerName: string;
  imageUrl: string;
  category: Category; 
  additionalInfo?: AdditionalInfo;
  Status: ProductStatusEnum
}