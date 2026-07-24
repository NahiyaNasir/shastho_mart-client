export interface Review {
  id: string;
  rating: number;
  comment: string;
  userId: string;
  medicineId: string;
  createdAt: string;
  user: {
    name: string;
    email: string;
    emailVerified: boolean;
    image: string | null;
  };
  medicine: {
    name: string;
    manufacturer: string | null;
  };
}