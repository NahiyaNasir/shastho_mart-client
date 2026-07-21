"use server"

import { AdminService } from "@/service/admin.service";
import { userService } from "@/service/userService";
import { PgOptionsRs, serviceOptions } from "@/types/pg.types";
import { cookies } from "next/headers";

export const getAllMedicines = async (
  params?: PgOptionsRs,
  options?: serviceOptions,
) => {
  const res = await userService.getMedicines(params, options);
  return res;
};
export const getSingleMedicine = async (medicineId: string) => {
  const res = await AdminService.singleMedicineData(medicineId);
  return res;
}
export const createOrder = async (data: any) => {
  const cookieStore = await cookies();
  const res = await userService.createOrder(data, cookieStore.toString());
  return res;
};


export const getMyOrders = async (
  params?: PgOptionsRs,
  options?: serviceOptions,
) => {
  const res = await userService.getMyOrders(params, options);
  return res;
};
export const getOrderById = async (orderId: string) => {
  const res = await userService.getOrderById(orderId);
  return res;
}

