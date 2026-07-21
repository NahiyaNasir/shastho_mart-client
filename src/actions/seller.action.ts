/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';
import { SellerService } from "@/service/seller.service";
import { PgOptionsRs, serviceOptions } from "@/types/pg.types";
import { updateTag } from "next/cache";


export const createMedicine = async (data: any) => {
  const res = await SellerService.createMedicine(data);
  // console.log(res.data);
  return res;
}
export const getSellerMedicines = async (
  sellerId: string,
  params?: PgOptionsRs,
  options?: serviceOptions,
) => {
  const res = await SellerService.getSellerMedicines(sellerId, params, options);
  return res;
};

export const getSellerOrders = async (
  params?: PgOptionsRs,
  options?: serviceOptions,
) => {
  const res = await SellerService.getSellerAllOrders(params, options);
  return res;
};
export const getSellerMetadata = async (options?: serviceOptions) => {
  const res = await SellerService.getSellerMetadata(options);
 
  return res;
};

export const updateOrderStatus = async (orderId: string, status: string) => {
  const res = await SellerService.updateOrderStatus(orderId, status);
  updateTag("seller-orders");
  return res;
};