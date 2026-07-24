/* eslint-disable @typescript-eslint/no-unused-vars */

import { env } from "@/env";
import { PgOptionsRs, serviceOptions } from "@/types/pg.types";

import { cookies } from "next/headers";

const auth_url = env.AUTH_URL;
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

const getSession = async () => {
  try {
    const cookieStore =  await  cookies();
    const res = await fetch(`${auth_url}/get-session`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
    });
    const session = await res.json();
        // console.log(session);
    if (session === null) {
      return { data: null, error: { message: "Session is missing!" } };
    }

    return { data: session, error: null };
  } catch (error) {
    return { data: null, error: { message: "Something Went Wrong!" } };
  }
};

const getMedicines = async (params?: PgOptionsRs, options?: serviceOptions) => {
  try {
    const url = new URL(`${api_url}/api/medicine`);
    const cookieStore = await cookies();

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          url.searchParams.append(key, value as any);
        }
      });
    }

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
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

    const res = await fetch(url.toString(), config);
    const data = await res.json();
    // console.log("Seller metadata data:", data.data); // Debug log
    return { data, error: null };
   
  } catch (err: unknown) {
    return {
      data: null,
      error: { message: "Something went wrong on get seller metadata." },
    };
  }
};

const getAllOrders = async (params?: PgOptionsRs, options?: serviceOptions, cookieString?: string) => {
  try {
    const queryString = buildQueryString(params);
    const url = queryString
      ? `${api_url}/orders?${queryString}`
      : `${api_url}/orders`;

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

    config.next = { ...config.next, tags: ["customer-orders"] };

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

const createOrder = async (payload: any, cookieString?: string) => {
  try {
    const res = await fetch(`${env.API_URL}/orders`, {
      method: "POST",
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
        error: { message: data.error || "orders not created!" },
        details: data,
      };
    }
    return { data, error: null };
  } catch (err) {
    return { data: null, error: { message: "Something went long" } };
  }
};

const getMyOrders = async (params?: PgOptionsRs, options?: serviceOptions) => {
  try {
    const url = new URL(`${api_url}/api/orders/my-orders`);
    const cookieStore = await cookies();

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          url.searchParams.append(key, value as unknown as string);
        }
      });
    }

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

    config.next = { ...config.next, tags: ["my-orders"] };

    const res = await fetch(url.toString(), config);
    const data = await res.json();

    if (!res.ok) {
      return {
        data: null,
        error: { message: data.message || `Failed to fetch orders (status ${res.status})` },
        details: data,
      };
    }

    return { data, error: null };
  } catch (err) {
    return { data: null, error: { message: "Something went wrong on get my orders." } };
  }
};

const getOrderById = async (orderId: string) => {
  try {
    const cookieStore = await cookies();

    const res = await fetch(`${api_url}/api/orders/${orderId}`, {
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        data: null,
        error: { message: data.message || "Failed to fetch order!" },
        details: data,
      };
    }

    return { data, error: null };
  } catch (err) {
    return { data: null, error: { message: "Something went wrong while fetching the order." } };
  }
};
const getStats = async () => {
  try {
    const res = await fetch(`${api_url}/api/stats`, {
      cache: "no-store",
    });
    const data = await res.json();
    return { data, error: null };
  } catch (err) {
    return { data: null, error: { message: "Something went wrong on get stats." } };
  }
};

// Public — used by the homepage's "Testimonials" section.
const getReviews = async (params?: PgOptionsRs, options?: serviceOptions) => {
  try {
    const url = new URL(`${api_url}/api/review`);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          url.searchParams.append(key, value as unknown as string);
        }
      });
    }

    const config: RequestInit = {
      cache: "no-store",
    };

    if (options?.cache) {
      config.cache = options.cache;
    }

    if (options?.revalidate) {
      config.next = { revalidate: options.revalidate };
    }

    const res = await fetch(url.toString(), config);
    const data = await res.json();
    return { data, error: null };
  } catch (err) {
    return { data: null, error: { message: "Something went wrong on get reviews." } };
  }
};

export const userService = {
  getSession,
  getMedicines,
  createOrder,
  getAllOrders,
  getStats,
  getMyOrders,
  getOrderById,
  getReviews,
 
};