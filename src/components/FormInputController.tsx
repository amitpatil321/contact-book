import { Calendar, CalendarProps } from "primereact/calendar";
import { InputText, InputTextProps } from "primereact/inputtext";
import { InputTextarea, InputTextareaProps } from "primereact/inputtextarea";
import {
  Control,
  Controller,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import { MotionError } from "../helpers/utils";

type ControlType = "calendar" | "input" | "textarea";

interface FormInputControllerProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  register: UseFormRegister<T>;
  placeholder?: string;
  className?: string;
  controlType?: ControlType;
}

const FormInputController = <T extends FieldValues>({
  name,
  control,
  register,
  placeholder = "",
  className = "",
  controlType = "input",
}: FormInputControllerProps<T>) => {
  const controlComponents: Record<
    ControlType,
    (props: CalendarProps | InputTextProps | InputTextareaProps) => JSX.Element
  > = {
    calendar: (props) => (
      <Calendar
        {...(props as CalendarProps)}
        maxDate={new Date()}
        showIcon
        dateFormat="dd/mm/yy"
        panelStyle={{ width: "300px" }}
        className="h-10"
      />
    ),
    input: (props) => (
      <InputText {...(props as InputTextProps)} className="h-10" />
    ),
    textarea: (props) => <InputTextarea {...(props as InputTextareaProps)} />,
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, formState: { errors } }) => (
        <>
          {controlComponents[controlType]?.({
            ...field,
            ...register(name),
            className,
            placeholder,
          }) || <div>Unsupported field type</div>}
          {errors[name]?.message && (
            <MotionError
              message={(errors[name]?.message as string) || ""}
              showError={!!errors[name]?.message}
            />
          )}
        </>
      )}
    />
  );
};

export default FormInputController;
