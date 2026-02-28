/* eslint-disable @typescript-eslint/no-unused-vars */

import { env } from "@/env";
import { PgOptionsRs, serviceOptions } from "@/types/pg.types";

import { cookies } from "next/headers";

const auth_url = env.AUTH_URL;
const api_url = env.API_URL;


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
export const userService = {
  getSession,
  getMedicines,
 
};