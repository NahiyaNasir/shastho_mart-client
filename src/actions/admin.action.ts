"use server"

/* eslint-disable @typescript-eslint/no-explicit-any */
import { AdminService } from "@/service/admin.service";
import { serviceOptions } from "@/types/pg.types";
import { updateTag } from "next/cache";


export const createCategory = async (data: any) => {
  const res = await AdminService.createCategory(data);
  //  console.log(res,"from action");
  updateTag("categories");
  return res;
};
export const getCategories = async (
//   params?: PgOptionsRs,
  options?: serviceOptions,
) => {
  const res = await AdminService.getCategories( options);
  return res;
};