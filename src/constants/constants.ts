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
  dashboard: "/",
  favorites: "/favorites",
  archived: "/archived",
  deleted: "/deleted",
};

// export const VALID_ACTIONS = {
//   edit: ["active"],
//   delete: ["active"],
//   archieve: ["active"],
//   favorite: ["active"],
// };

export const VALID_ACTIONS = {
  active: ["edit", "delete", "archive", "favorite"],
  favorite: ["edit", "delete", "archive", "favorite"],
  archived: ["edit", "delete", "archive"],
  deleted: ["delete"],
};
