"use server"

import { AdminService } from "@/service/admin.service";
import { userService } from "@/service/userServise";
import { PgOptionsRs, serviceOptions } from "@/types/pg.types";

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


