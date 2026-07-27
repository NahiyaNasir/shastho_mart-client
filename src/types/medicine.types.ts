export enum UnitType {
  Pcs = "Pcs",
  Strip = "Strip",
  Box = "Box",
  Bottle = "Bottle",
}

export interface ICategory {
  id: string;
  name: string;
  slug?: string;
  description?: string;
  image?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface ISeller {
  id: string;
  name: string;
  email?: string;
}

export interface IMedicineReview {
  id: string;
  rating: number;
  comment: string;
  user?: {
    name: string;
    image: string | null;
  };
}

export interface IMedicine {
  id: string;
  name: string;
  genericName: string;
  strength: string | null;
  unitType: UnitType;
  group: string | null;
  description: string;
  overview: string;
  price: number;
  discountPrice: number | null;
  stock: number;
  image: string;
  tags: string[];
  isPrescriptionRequired: boolean;
  expiryDate: string | null;
  sku: string | null;
  views: number;
  categoryId: string;
  sellerId: string;
  createdAt: string;
  updatedAt: string;

  category: ICategory;
  seller?: ISeller;
  reviews?: IMedicineReview[];
}