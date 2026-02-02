import { env } from "@/env";
import { cookies } from "next/headers";
const api_url = env.API_URL;
 type PgOptionsRs = {
  page?: string | number;
  limit?: string | number;
  skip?: string | number;
  sortBy?: string;
  sortOrder?: string;
  status?: string;
  search?: string;
}
 interface serviceOptions {
  cache?: RequestCache;
  revalidate?: number;
}

const getMedicines = async (params?: PgOptionsRs, options?: serviceOptions) => {
  try {
    const url = new URL(`${api_url}/api/medicines`);
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

    return { data, error: null };
  } catch (err:unknown) {
    return {
      data: null,
      error: { message: "Something went wrong on get medicines." },
    };
  }
};
 export {getMedicines}