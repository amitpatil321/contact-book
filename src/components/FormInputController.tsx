import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import {
  Control,
  Controller,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import { MotionError } from "../helpers/utils";

interface FormInputControllerProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  register: UseFormRegister<T>;
  placeholder?: string;
  className?: string;
}

const FormInputController = <T extends FieldValues>({
  name,
  control,
  register,
  placeholder = "",
  className = "",
}: FormInputControllerProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, formState: { errors } }) => (
        <>
          {name === "birthdate" ? (
            <>
              <Calendar
                {...register(name, {
                  validate: () => !errors[name] || undefined,
                })}
                {...field}
                value={field.value || null}
                maxDate={new Date()}
                placeholder={placeholder}
                showIcon
                dateFormat="dd/mm/yy"
                className={`h-[38px] mb-1 ${className}`}
                panelStyle={{ width: "300px" }}
                aria-invalid={!!errors[name]?.message}
              />
              {errors[name]?.message && (
                <MotionError
                  message={(errors[name]?.message as string) || ""}
                  showError={!!errors[name]?.message}
                />
              )}
            </>
          ) : (
            <>
              <InputText
                {...register(name, {
                  validate: () => !errors[name] || undefined, // Skip validation if no Zod schema
                })}
                {...field}
                value={field.value || ""}
                placeholder={placeholder}
                className={`p-2 ${className}`}
                aria-invalid={!!errors[name]?.message}
              />
              {errors[name]?.message && (
                <MotionError
                  message={(errors[name]?.message as string) || ""}
                  showError={!!errors[name]?.message}
                />
              )}
            </>
          )}
        </>
      )}
    />
  );
};

export default FormInputController;
