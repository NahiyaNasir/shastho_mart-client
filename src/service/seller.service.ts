/* eslint-disable @typescript-eslint/no-unused-vars */
import "server-only";
import { env } from "@/env";
import { serviceOptions } from "@/types/pg.types";

import { cookies } from "next/headers";
const api_url = env.API_URL;


const createMedicine = async (payload: unknown) => {
  try {
    const cookieStore = await cookies();

    const res = await fetch(`${env.API_URL}/api/medicine`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    console.log(data, "medicine creation response"); // Debug log
    if (data.error) {
      return {
        data: null,
        error: { message: data.error || "Medicine not created!" },
        details: data,
      };
    }
    return { data, error: null };   
  } catch (err) {
    return {
      data: null,
      error: { message: "Something went wrong while creating medicine." },
    };
  }
};
const getSellerMetadata = async (options?: serviceOptions) => {
  try {
    const url = new URL(`${api_url}/seller/metadata`);
    const cookieStore = await cookies();

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

    config.next = { ...config.next, tags: ["seller-orders"] };

    const res = await fetch(url.toString(), config);
    const data = await res.json();

    return { data, error: null };
  } catch (err) {
    return {
      data: null,
      error: { message: "Something went wrong on get seller metadata." },
    };
  }
};

export const SellerService = {
 
  createMedicine,
  getSellerMetadata,
  
};
