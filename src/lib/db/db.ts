

import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const queryString = "postgresql://postgres.wslboyscbvjtewkzkffl:DOlAyh6icgRF7FY2@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres";

console.log("ENV TESTING:" , process.env.TEST_ENV as string);


export const connection = postgres(queryString);

export const db = drizzle(connection);