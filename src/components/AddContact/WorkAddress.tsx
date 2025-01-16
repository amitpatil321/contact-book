import { useFormContext } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "../../helpers/AddContactZodSchema";
import FormInputController from "../FormInputController";

type FormDataType = z.infer<typeof formSchema>;

const WorkAddress = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<FormDataType>();
  return (
    <div className="gap-2 grid grid-cols-2 w-full sm:w-[40%] md:w-full lg:w-[80%]">
      <FormInputController
        name="work_company"
        control={control}
        register={register}
        placeholder="Company Name"
        className={errors.work_company ? "p-invalid" : ""}
      />
      <FormInputController
        name="work_designation"
        control={control}
        register={register}
        placeholder="Designation"
        className={errors.work_company ? "p-invalid" : ""}
      />
      <FormInputController
        name="work_address1"
        control={control}
        register={register}
        placeholder="Work Address Line 1"
        className={errors.work_address1 ? "p-invalid" : ""}
      />
      <FormInputController
        name="work_address2"
        control={control}
        register={register}
        placeholder="Work Address Line 2"
        className={errors.work_address2 ? "p-invalid" : ""}
      />
      <FormInputController
        name="work_city"
        control={control}
        register={register}
        placeholder="City"
        className={errors.work_city ? "p-invalid" : ""}
      />
      <FormInputController
        name="work_state"
        control={control}
        register={register}
        placeholder="State"
        className={errors.work_state ? "p-invalid" : ""}
      />
      <FormInputController
        name="work_country"
        control={control}
        register={register}
        placeholder="Country"
        className={errors.work_country ? "p-invalid" : ""}
      />
      <FormInputController
        name="work_zip"
        control={control}
        register={register}
        placeholder="Zip"
        className={errors.work_zip ? "p-invalid" : ""}
      />
    </div>
  );
};

export default WorkAddress;
