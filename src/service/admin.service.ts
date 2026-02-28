/* eslint-disable @typescript-eslint/no-unused-vars */


import { env } from "@/env";
import {  serviceOptions } from "@/types/pg.types";
import { cookies } from "next/headers";

const api_url = env.API_URL;


const getCategories = async (
  // params?: PgOptionsRs,
  options?: serviceOptions,
) => {
  try {
    const url = new URL(`${api_url}/api/categories`);
    const cookieStore = await cookies();
    // if (params) {
    //   Object.entries(params).forEach(([key, value]) => {
    //     if (value !== undefined && value !== null && value !== "") {
    //       url.searchParams.append(key, value as unknown as string);
    //     }
    //   });
    // }

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
    };

    if (options?.cache) {
      config.cache = options.cache;
    }

    if (options?.revalidate) {
      config.next = { revalidate: options.revalidate };
    }

    config.next = { ...config.next, tags: ["categories"] };

    const res = await fetch(url.toString(), config);
    const data = await res.json();
    // console.log(data,"from service");
    return { data, error: null };
  
  } catch (err) {
    return {
      data: null,
      error: { message: "Something went wrong on get categories." },
    };
  }
};
const createCategory = async (payload: unknown) => {
  try {
    const cookieStore = await cookies();

    const res = await fetch(`${env.API_URL}/api/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
// console.log(data,"from service");
    if (data.error) {
      return {
        data: null,
        error: { message: data.error || "Category not created!" },
        details: data,
      };
    }
    return { data, error: null };
 
  } catch (err) {
    return { data: null, error: { message: "Something went long" } };
  }
};
const singleMedicineData = async (medicineId: string) => {
  try {
    const cookieStore = await cookies();

    const res = await fetch(`${env.API_URL}/api/medicine/${medicineId}`, {
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
    });

    const data = await res.json();

    if (data.error) {
      return {
        data: null,
        error: { message: data.error || "single medicine error!" },
        details: data,
      };
    }
    return { data, error: null };
  } catch (err: unknown) {
    return { data: null, err: { message: "Something went wrong while fetching single medicine data." } };
  }
};
export const AdminService = {
  getCategories,
  createCategory,
  // deleteCategory,
  // updateCategory,
  // getUser,
  // updateUserStatus,
  // getAllOrders,
  singleMedicineData,
  // updateMedicineData,
  // updateMedicineStock,
  // deleteMedicine,
  // getAdminMetadata
};