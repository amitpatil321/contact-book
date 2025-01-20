import { Database } from "../types/supabase.types";

type TableNames = keyof Database["public"]["Tables"];
type RouteNames = "dashboard" | "favorites" | "archived" | "deleted";

export const TABLES: Record<TableNames, TableNames> = {
  contacts: "contacts",
  meta: "meta",
  labels: "labels",
  favorites: "favorites",
};

export const PAGES: Record<RouteNames, string> = {
  dashboard: "",
  favorites: "favorites",
  archived: "archived",
  deleted: "deleted",
};
