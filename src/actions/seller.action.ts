/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';
import { SellerService } from "@/service/seller.service";
import { PgOptionsRs, serviceOptions } from "@/types/pg.types";
import { updateTag } from "next/cache";
import { cookies } from "next/headers";



export const getSellerMedicines = async (
  
  params?: PgOptionsRs,
  options?: serviceOptions,

) => {
  const cookieStore = await cookies();
  const res = await SellerService.getSellerMedicines( params, options, cookieStore.toString());
  return res;
};

export const getSellerMetadata = async (options?: serviceOptions) => {
  const cookieStore = await cookies();
  const res = await SellerService.getSellerMetadata(options, cookieStore.toString());
  return res;
};

export const createMedicine = async (data: any) => {
  const cookieStore = await cookies();
  const res = await SellerService.createMedicine(data, cookieStore.toString());
  return res;
};
export const getSellerOrders = async (
  params?: PgOptionsRs,
  options?: serviceOptions,
) => {
  const res = await SellerService.getSellerAllOrders(params, options);
  return res;
};
export const updateOrderStatus = async (id: string, payload: any) => {
  const cookieStore = await cookies();
  const res = await SellerService.updateOrderStatus(id, payload, cookieStore.toString());
  updateTag("seller-orders");
  return res;
};

export const deleteSellerMedicine = async (id: string,) => {
  const cookieStore = await cookies();
  const res = await SellerService.deleteSellerMedicine(id, cookieStore.toString());
  updateTag("medicines");
  return res;
};