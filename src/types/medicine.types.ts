export interface ICategory {
  id: string;
  name: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ISeller {
  id: string;
  name: string;
  email?: string;
  shopName?: string;
}

export interface IMedicine {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  manufacturer: string | null;
  categoryId: string;
  sellerId: string;
  createdAt: string;
  updatedAt: string;
 
  category: ICategory;
  seller?: ISeller;
}

export interface IMedicineResponse {
  success: boolean;
  message?: string;
  data: {
    data: IMedicine[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
}