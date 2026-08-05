/* eslint-disable @typescript-eslint/no-unused-vars */

import { env } from "@/env";
import { PgOptionsRs, serviceOptions } from "@/types/pg.types";

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

const createMedicine = async (payload: any, cookieString?: string) => {
  try {
    const res = await fetch(`${env.API_URL}/api/medicine`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(cookieString && { Cookie: cookieString }),
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok || data.error) {
      return {
        data: null,
        error: { message: data.message || data.error || "Medicine not created!" },
        details: data,
      };
    }
    return { data, error: null };
  } catch (err) {
    return { data: null, error: { message: "Network or server error while creating medicine." } };
  }
};

const getSellerMetadata = async (
  options?: serviceOptions,
  cookieString?: string,
) => {
  try {
    const url = new URL(`${api_url}/api/stats`);

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
      ? `${api_url}/api/medicine?${queryString}`
      : `${api_url}/api/medicine`;

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

const updateOrderStatus = async (
  id: string,
  payload: any,
  cookieString?: string,
) => {
  try {
    const res = await fetch(`${env.API_URL}/api/orders/${id}/seller`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...(cookieString && { Cookie: cookieString }),
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok || data.error) {
      return {
        data: null,
        error: { message: data.message || data.error || "Order not updated!" },
        details: data,
      };
    }
    return { data, error: null };
  } catch (err) {
    return { data: null, error: { message: "Something went wrong" } };
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
      ? `${api_url}/api/orders/seller/orders?${queryString}`
      : `${api_url}/api/orders/seller/orders`;

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
    const url = new URL(`${api_url}/api/medicine/${id}`);

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

const getSellerMedicines = async (
  params?: PgOptionsRs,
  options?: serviceOptions,
  cookieString?: string,
) => {
  try {
    const queryString = buildQueryString(params);
    const url = queryString
      ? `${api_url}/api/medicine?${queryString}`
      : `${api_url}/api/medicine`;

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

export const SellerService = {
  createMedicine,
  getSellerMetadata,
  getSellerMedicines,
  getMedicines,
  updateOrderStatus,
  getSellerAllOrders,
  deleteSellerMedicine,
};
