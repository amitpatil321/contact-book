import { useFormContext } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "../../helpers/AddContactZodSchema";
import FormInputController from "../FormInputController";

type FormDataType = z.infer<typeof formSchema>;

const HomeAddress = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<FormDataType>();
  return (
    // <div className="gap-2 grid grid-cols-2 border w-[100%] sm:w-[40%] md:w-[60%] lg:w-[80%]">
    <div className="gap-2 grid grid-cols-2 md:w-[100%] lg:w-[80%]">
      <FormInputController
        name="home_address1"
        control={control}
        register={register}
        placeholder="Address Line 1"
        className={errors.home_address1 ? "p-invalid" : ""}
      />
      <FormInputController
        name="home_address2"
        control={control}
        register={register}
        placeholder="Address Line 2"
        className={errors.home_address2 ? "p-invalid" : ""}
      />
      <FormInputController
        name="home_city"
        control={control}
        register={register}
        placeholder="City"
        className={errors.home_city ? "p-invalid" : ""}
      />
      <FormInputController
        name="home_state"
        control={control}
        register={register}
        placeholder="State"
        className={errors.home_state ? "p-invalid" : ""}
      />
      <FormInputController
        name="home_country"
        control={control}
        register={register}
        placeholder="Country"
        className={errors.home_country ? "p-invalid" : ""}
      />
      <FormInputController
        name="home_zip"
        control={control}
        register={register}
        placeholder="Zip"
        className={errors.home_zip ? "p-invalid" : ""}
      />
    </div>
  );
};

export default HomeAddress;
