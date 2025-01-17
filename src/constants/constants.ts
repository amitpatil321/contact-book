import { Database } from "../types/supabase.types";

type TableNames = keyof Database["public"]["Tables"];

export const TABLES: Record<TableNames, TableNames> = {
  contacts: "contacts",
  meta: "meta",
  labels: "labels",
  favorites: "favorites",
};
