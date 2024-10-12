// lib/supabaseClient.ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// import axios from "axios";

// const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
// const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY;

// const supabase = axios.create({
//   baseURL: SUPABASE_URL,
//   headers: {
//     apikey: SUPABASE_KEY,
//     Authorization: `Bearer ${SUPABASE_KEY}`,
//   },
// });

// export default supabase;
