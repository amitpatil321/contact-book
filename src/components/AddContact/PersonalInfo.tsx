import { useFormContext } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "../../helpers/AddContactZodSchema";
import FormInputController from "../FormInputController";

type FormDataType = z.infer<typeof formSchema>;

const PersonalInfo = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<FormDataType>();
  return (
    <div className="flex flex-col justify-left gap-2 w-full sm:w-[40%] md:w-full lg:w-[60%]">
      <div className="flex flex-col gap-2">
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
        <FormInputController
          name="linkedin"
          control={control}
          register={register}
          placeholder="Linkedin"
          className={errors.linkedin ? "p-invalid" : ""}
        />
        <FormInputController
          name="github"
          control={control}
          register={register}
          placeholder="github"
          className={errors.github ? "p-invalid" : ""}
        />
      </div>
    </div>
  );
};

export default PersonalInfo;
