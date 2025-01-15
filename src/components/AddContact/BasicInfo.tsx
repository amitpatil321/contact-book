import { Controller, useFormContext, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "../../helpers/AddContactZodSchema";
import { MotionError } from "../../helpers/utils";
import FormInputController from "../FormInputController";

type FormDataType = z.infer<typeof formSchema>;

interface BasicFormType {
  methods: UseFormReturn<FormDataType>;
}

const BasicForm: React.FC<BasicFormType> = ({ methods }) => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<FormDataType>();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64File = reader.result as string;
        methods.setValue("profile_pic", base64File);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col justify-left pb-3 w-full sm:w-[40%] md:w-full lg:w-[60%]">
      <div className="flex flex-col gap-2 pl-4">
        <Controller
          name="profile_pic"
          control={control}
          render={({ field: { ref, name, onBlur } }) => (
            <>
              <input
                id="profile_pic"
                type="file"
                accept="image/*"
                ref={ref}
                name={name}
                onBlur={onBlur}
                onChange={(event) => handleFileUpload(event)}
                className="block file:border-0 file:bg-purple-50 hover:file:bg-purple-100 file:mr-4 file:px-4 file:py-2 file:rounded-md w-full file:font-semibold text-slate-500 text-sm file:text-purple-700 file:text-sm"
              />
              <p className="text-gray-400 text-xs">
                Only image files are Allowed.
              </p>
            </>
          )}
        />

        {errors?.profile_pic?.message && (
          <MotionError
            message={(errors?.profile_pic?.message as string) || ""}
            showError={!!errors?.profile_pic.message}
          />
        )}
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

export default BasicForm;
