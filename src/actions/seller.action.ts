/* eslint-disable @typescript-eslint/no-explicit-any */
import { SellerService } from "@/service/seller.service";
import { serviceOptions } from "@/types/pg.types";


export const createMedicine = async (data: any) => {
  const res = await SellerService.createMedicine(data);
  console.log(res.data);
  return res;
}

export const getSellerMetadata = async (options?: serviceOptions) => {
  const res = await SellerService.getSellerMetadata(options);
 
  return res;
};