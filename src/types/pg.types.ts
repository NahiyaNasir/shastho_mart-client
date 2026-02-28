


  export type PgOptionsRs = {
  page?: string | number;
  limit?: string | number;
  skip?: string | number;
  sortBy?: string;
  sortOrder?: string;
  status?: string;
  search?: string;
}
  export   interface serviceOptions {
  cache?: RequestCache;
  revalidate?: number;
}