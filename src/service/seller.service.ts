/* eslint-disable @typescript-eslint/no-unused-vars */

import { env } from "@/env";
import { PgOptionsRs, serviceOptions } from "@/types/pg.types";

import { cookies } from "next/headers";
const api_url = env.API_URL;

const buildQueryString = (params?: PgOptionsRs): string => {
  if (!params) return "";
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      if (typeof value === "object") {
        Object.entries(value).forEach(([nestedKey, nestedValue]) => {
          if (nestedValue !== undefined && nestedValue !== null) {
            searchParams.append(`${key}[${nestedKey}]`, String(nestedValue));
          }
        });
      } else {
        searchParams.append(key, String(value));
      }
    }
  });

  return searchParams.toString();
};

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
    // console.log(data, "medicine creation response"); // Debug log
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
const getMedicines = async (
  params?: PgOptionsRs,
  options?: serviceOptions,
  cookieString?: string,
) => {
  try {
    const queryString = buildQueryString(params);
    const url = queryString
      ? `${api_url}/seller/medicines?${queryString}`
      : `${api_url}/seller/medicines`;

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...(cookieString && { Cookie: cookieString }),
      },
      cache: "no-cache",
    };

    if (options?.cache) {
      config.cache = options.cache;
    }

    if (options?.revalidate) {
      config.next = { revalidate: options.revalidate };
    }

    config.next = { ...config.next };

    const res = await fetch(url, config);
    const data = await res.json();

    return { data, error: null };
  } catch (err) {
    return {
      data: null,
      error: { message: "Something went wrong on get medicines." },
    };
  }
};
const updateOrderStauts = async (
  id: string,
  payload: any,
  cookieString?: string,
) => {
  try {
    const res = await fetch(`${env.API_URL}/seller/orders/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...(cookieString && { Cookie: cookieString }),
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (data.error) {
      return {
        data: null,
        error: { message: data.error || "Order not updated!" },
        details: data,
      };
    }
    return { data, error: null };
  } catch (err) {
    return { data: null, error: { message: "Something went long" } };
  }
};

const getSellerAllOrders = async (
  params?: PgOptionsRs,
  options?: serviceOptions,
  cookieString?: string,
) => {
  try {
    const queryString = buildQueryString(params);
    const url = queryString
      ? `${api_url}/seller/orders?${queryString}`
      : `${api_url}/seller/orders`;

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...(cookieString && { Cookie: cookieString }),
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

    const res = await fetch(url, config);
    const data = await res.json();

    return { data, error: null };
  } catch (err) {
    return {
      data: null,
      error: { message: "Something went wrong on get orders." },
    };
  }
};
const deleteSellerMedicine = async (
  id: string,
  cookieString?: string,
) => {
  try {
    const url = new URL(`${api_url}/seller/medicines/${id}`);

    const config: RequestInit = {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        ...(cookieString && { Cookie: cookieString }),
      },
      cache: "no-store",
    };

    const res = await fetch(url.toString(), config);
    const data = await res.json();

    return { data, error: null };
  } catch (err) {
    return {
      data: null,
      error: { message: "Something went wrong on delete medicine." },
    };
  }
};

export const SellerService = {
 
  createMedicine,
  getSellerMetadata,
  
};
