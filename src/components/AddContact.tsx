import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "primereact/button";
import { Inplace, InplaceContent, InplaceDisplay } from "primereact/inplace";
import { TabPanel, TabView } from "primereact/tabview";
import { useContext } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { z } from "zod";
import { AppContext } from "../context/AppContext";
import { AppContextType } from "../types/types";
import FormInputController from "./FormInputController";

const invalid_type_error = "Invalid type provided for this field";

const formSchema = z.object({
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
  birthdate: z
    .string({ required_error: "Birthdate is required" })
    .nonempty("Birthdate is required")
    .refine((val) => !isNaN(new Date(val).getTime()), {
      message: "Invalid date format",
    }),
  company: z
    .string({ invalid_type_error, required_error: "Company name is required" })
    .nonempty("Company name is required"),
  designation: z
    .string({ invalid_type_error, required_error: "Designation is required" })
    .nonempty("Designation is required"),
});

type FormDataType = z.infer<typeof formSchema>;

const AddContact: React.FC = () => {
  const methods = useForm<FormDataType>({
    resolver: zodResolver(formSchema),
  });
  const { handleSubmit } = methods;

  const { setShowAddContact } = useContext(AppContext) as AppContextType;

  const submitForm = (formData: FormDataType) => {
    console.log(formData);
  };

  return (
    <div className="">
      <h4>Add Contact</h4>
      <hr />
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(submitForm)}
          className="flex flex-col gap-4 px-4 pt-4 text-sm"
        >
          <BasicForm />
          <Inplace className="pb-3">
            <InplaceDisplay>
              <span className="text-purple-500">Add more information</span>
            </InplaceDisplay>
            <InplaceContent>
              <TabView>
                <TabPanel className="m-0 p-0" header="Personal Information">
                  <PersonalInfo />
                </TabPanel>
              </TabView>
            </InplaceContent>
          </Inplace>
          <div className="flex flex-row gap-2">
            <Button
              outlined
              size="small"
              label="Cancel"
              onClick={() => setShowAddContact(false)}
            />
            <Button size="small" type="submit" label="Submit" />
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

const BasicForm = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<FormDataType>();

  return (
    <div className="flex flex-col justify-left w-full sm:w-[40%] md:w-full lg:w-[40%]">
      <div className="flex flex-col gap-1">
        hello
        <FormInputController
          name="first_name"
          control={control}
          register={register}
          placeholder="First Name"
          className={errors.first_name ? "p-invalid" : ""}
        />
        <FormInputController
          name="last_name"
          control={control}
          register={register}
          placeholder="Last Name"
          className={errors.last_name ? "p-invalid" : ""}
        />
        <FormInputController
          name="email"
          control={control}
          register={register}
          placeholder="Email"
          className={errors.email ? "p-invalid" : ""}
        />
        <FormInputController
          name="mobile"
          control={control}
          register={register}
          placeholder="Mobile"
          className={errors.mobile ? "p-invalid" : ""}
        />
      </div>
    </div>
  );
};

const PersonalInfo = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<FormDataType>();
  console.log(errors);
  return (
    <div className="flex flex-col justify-left gap-2 w-full sm:w-[40%] md:w-full lg:w-[40%]">
      <div className="flex flex-col gap-1">
        <FormInputController
          name="birthdate"
          control={control}
          register={register}
          placeholder="Birthdate"
          className={errors.birthdate ? "p-invalid" : ""}
        />
        <FormInputController
          name="company"
          control={control}
          register={register}
          placeholder="Company Name"
          className={errors.company ? "p-invalid" : ""}
        />
        <FormInputController
          name="designation"
          control={control}
          register={register}
          placeholder="Designation"
          className={errors.designation ? "p-invalid" : ""}
        />
      </div>
    </div>
  );
};

export default AddContact;
