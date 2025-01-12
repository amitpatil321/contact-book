import { motion } from "framer-motion";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import {
  Control,
  Controller,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

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
                {...register(name)}
                {...field}
                maxDate={new Date()}
                placeholder={placeholder}
                showIcon
                dateFormat="dd/mm/yy"
                className={`h-[38px] mb-1 ${className}`}
                panelStyle={{ width: "300px" }}
                aria-invalid={!!errors[name]?.message}
              />
              <MotionError
                message={(errors[name]?.message as string) || ""}
                showError={!!errors[name]?.message}
              />
            </>
          ) : (
            <>
              <InputText
                {...register(name)}
                {...field}
                placeholder={placeholder}
                className={`p-2 ${className}`}
                aria-invalid={!!errors[name]?.message}
              />
              <MotionError
                message={(errors[name]?.message as string) || ""}
                showError={!!errors[name]?.message}
              />
            </>
          )}
        </>
      )}
    />
  );
};

interface MotionErrorProps {
  message?: string;
  showError: boolean;
}

const MotionError: React.FC<MotionErrorProps> = ({ message, showError }) => {
  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={
        showError ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }
      }
      transition={{ duration: 0.1 }}
      style={{ overflow: "hidden" }}
    >
      {message && (
        <small className="p-error text-red-500 text-sm">{message}</small>
      )}
    </motion.div>
  );
};

export default FormInputController;
