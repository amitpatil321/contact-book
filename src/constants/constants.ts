import { Database } from "../types/supabase";

type TableNames = keyof Database["public"]["Tables"];

export const TABLES: Record<TableNames, TableNames> = {
  contacts: "contacts",
  meta: "meta",
  labels: "labels",
};
