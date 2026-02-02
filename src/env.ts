import { createEnv } from "@t3-oss/env-nextjs";
import * as Z from "zod";

export const env = createEnv({
  server: {
    BACKEND_URL: Z.url(),
    FRONTEND_URL: Z.url(),
    API_URL: Z.url(),
    AUTH_URL: Z.url(),
  },
  client: {
  },
  runtimeEnv: {
    BACKEND_URL: process.env.BACKEND_URL,
    FRONTEND_URL: process.env.FRONTEND_URL,
    API_URL: process.env.API_URL,
    AUTH_URL: process.env.AUTH_URL,
    
  },
});