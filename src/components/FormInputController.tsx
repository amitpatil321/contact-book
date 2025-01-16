import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import {
  Control,
  Controller,
  FieldErrors,
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
  controlType?: string;
}

const FormInputController = <T extends FieldValues>({
  name,
  control,
  register,
  placeholder = "",
  className = "",
  controlType = "input",
}: FormInputControllerProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, formState: { errors } }) => {
        switch (controlType) {
          case "calendar":
            return (
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
                <ErrorHandler errors={errors} name={name} />
              </>
            );
          case "input":
            return (
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
                <ErrorHandler errors={errors} name={name} />
              </>
            );
          case "textarea":
            return (
              <>
                <InputTextarea
                  {...register(name, {
                    validate: () => !errors[name] || undefined, // Skip validation if no Zod schema
                  })}
                  {...field}
                  value={field.value || ""}
                  placeholder={placeholder}
                  className={`p-2 ${className}`}
                  aria-invalid={!!errors[name]?.message}
                />
                <ErrorHandler errors={errors} name={name} />
              </>
            );
          default:
            return <div>Unsupported field type</div>;
        }
      }}
    />
  );
};

interface ErrorHandlerProps<T extends FieldValues> {
  errors: FieldErrors<T>;
  name: Path<T>;
}

const ErrorHandler = <T extends FieldValues>({
  errors,
  name,
}: ErrorHandlerProps<T>) => {
  return (
    errors[name]?.message && (
      <MotionError
        message={(errors[name]?.message as string) || ""}
        showError={!!errors[name]?.message}
      />
    )
  );
};

export default FormInputController;
