
import { env } from "@/env";
import { cookies } from "next/headers";

const auth_url = env.AUTH_URL;
// const api_url = env.API_URL;

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


export const userService = {
  getSession,
 
};