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
  // birthdate: z.string().optional(),
  birthdate: z
    .date()
    .optional()
    .refine((date) => !date || date <= new Date(), {
      message: "Birthdate cannot be in the future.",
    }),
  company: z.string().optional(),
  designation: z.string().optional(),
  linkedin: z.string().optional(),
  github: z.string().optional(),
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
  //     ,
  //   birthdate: z
  //     .string({ required_error: "Birthdate is required" })
  //     .nonempty("Birthdate is required")
  //     .refine((val) => !isNaN(new Date(val).getTime()), {
  //       message: "Invalid date format",
  //     }),
  //   company: z.string({
  //     invalid_type_error,
  //     required_error: "Company name is required",
  //   }),
  //   designation: z.string({
  //     invalid_type_error,
  //     required_error: "Designation is required",
  //   }),
  //   linkedin: z.string({
  //     invalid_type_error,
  //     required_error: "Linkedin url is required",
  //   }),
  //   github: z.string({
  //     invalid_type_error,
  //     required_error: "Github url is required",
  //   }),
  //   home_address1: z.string({
  //     invalid_type_error,
  //     required_error: "Address line 1 is required",
  //   }),
  //   home_address2: z.string({
  //     invalid_type_error,
  //     required_error: "Address line 2 is required",
  //   }),
  //   home_city: z.string({
  //     invalid_type_error,
  //     required_error: "City is required",
  //   }),
  //   home_state: z.string({
  //     invalid_type_error,
  //     required_error: "State is required",
  //   }),
  //   home_country: z.string({
  //     invalid_type_error,
  //     required_error: "Country is required",
  //   }),
  //   home_zip: z.string({
  //     invalid_type_error,
  //     required_error: "Zip is required",
  //   }),
  //   work_address1: z.string({
  //     invalid_type_error,
  //     required_error: "Address line 1 is required",
  //   }),
  //   work_address2: z.string({
  //     invalid_type_error,
  //     required_error: "Address line 2 is required",
  //   }),
  //   work_city: z.string({
  //     invalid_type_error,
  //     required_error: "City is required",
  //   }),
  //   work_state: z.string({
  //     invalid_type_error,
  //     required_error: "State is required",
  //   }),
  //   work_country: z.string({
  //     invalid_type_error,
  //     required_error: "Country is required",
  //   }),
  //   work_zip: z.string({
  //     invalid_type_error,
  //     required_error: "Zip is required",
  //   }),
});
