import { z } from "zod";

const invalid_type_error = "Invalid type provided for this field";

export const formSchema = z.object({
  first_name: z.string({
    invalid_type_error,
    required_error: "First name is required",
  }),
  last_name: z.string({
    invalid_type_error,
    required_error: "Last name is required",
  }),
  email: z
    .string({ invalid_type_error, required_error: "Email is required" })
    .email("Invalid email format"),
  mobile: z
    .string({
      invalid_type_error: "Invalid input",
      required_error: "Mobile is required",
    })
    .refine((val) => /^\d+$/.test(val), {
      message: "Mobile number must contain only digits",
    })
    .refine((val) => val.length === 10, {
      message: "Mobile number must be exactly 10 digits",
    }),
  notes: z.string().optional(),
  birthdate: z
    .date()
    .optional()
    .refine((date) => !date || date <= new Date(), {
      message: "Birthdate cannot be in the future.",
    }),
  profile_pic: z
    .union([
      z.instanceof(File, { message: "Profile pic is required" }),
      z.string().optional(),
    ])
    .refine((value) => value instanceof File || typeof value === "string", {
      message: "Profile pic is required",
    }),
  work_company: z.string().optional(),
  work_designation: z.string().optional(),
  website: z
    .string()
    .url({ message: "Please enter valid url, starting with http/https" })
    .optional(),
  linkedin: z
    .string()
    .url({ message: "Please enter valid url, starting with http/https" })
    .optional(),
  github: z
    .string()
    .url({ message: "Please enter valid url, starting with http/https" })
    .optional(),
  home_address1: z.string().optional(),
  home_address2: z.string().optional(),
  home_city: z.string().optional(),
  home_state: z.string().optional(),
  home_country: z.string().optional(),
  home_zip: z.string().optional(),
  work_address1: z.string().optional(),
  work_address2: z.string().optional(),
  work_city: z.string().optional(),
  work_state: z.string().optional(),
  work_country: z.string().optional(),
  work_zip: z.string().optional(),
});
