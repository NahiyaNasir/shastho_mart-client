"use server"

/* eslint-disable @typescript-eslint/no-explicit-any */
import { AdminService } from "@/service/admin.service";
import { PgOptionsRs, serviceOptions } from "@/types/pg.types";
import { updateTag } from "next/cache";


export const createCategory = async (data: any) => {
  const res = await AdminService.createCategory(data);
  //  console.log(res,"from action");
  updateTag("categories");
  return res;
};
export const getCategories = async (
  params?: PgOptionsRs,
  options?: serviceOptions,
) => {
  const res = await AdminService.getCategories(params, options);
  return res;
};

export const getUsers = async (
  params?: PgOptionsRs,
  options?: serviceOptions,
) => {
  const res = await AdminService.getUsers(params, options);
  return res;
};

export const updateUserStatus = async (userId: string, status: "BAN" | "UNBAN") => {
  const res = await AdminService.updateUserStatus(userId, status);
  updateTag("users");
  return res;
};
export const getAllOrders = async (
  params?: PgOptionsRs,
  options?: serviceOptions,
) => {
  const res = await AdminService.getAllOrders(params, options);
  return res;
};