import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Button } from "primereact/button";
import { Inplace, InplaceContent, InplaceDisplay } from "primereact/inplace";
import { TabPanel, TabView } from "primereact/tabview";
import { useContext } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { z } from "zod";

import { AppContext } from "../../context/AppContext";
import { formSchema } from "../../helpers/AddContactZodSchema";
import { AppContextType } from "../../types/types";
import FormInputController from "../FormInputController";

type FormDataType = z.infer<typeof formSchema>;

const AddContact: React.FC = () => {
  const methods = useForm<FormDataType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      birthdate: undefined,
    },
  });
  const { handleSubmit } = methods;

  const { setShowAddContact } = useContext(AppContext) as AppContextType;

  const submitForm = (formData: FormDataType) => {
    console.log(formData);
  };

  return (
    <motion.div
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h4>Add Contact</h4>
      <hr />
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(submitForm)}
          className="flex flex-col gap-4 px-4 pt-4 text-sm"
        >
          <BasicForm />
          <Inplace className="pb-3 pl-4">
            <InplaceDisplay>
              <span className="text-purple-500">Add more information</span>
            </InplaceDisplay>
            <InplaceContent>
              <TabView>
                <TabPanel className="m-0 p-0" header="Personal Details">
                  <PersonalInfo />
                </TabPanel>
                <TabPanel className="m-0 p-0" header="Home Address">
                  <HomeAddress />
                </TabPanel>
                <TabPanel className="m-0 p-0" header="Work Address">
                  <WorkAddress />
                </TabPanel>
              </TabView>
            </InplaceContent>
          </Inplace>
          <div className="flex flex-row gap-2 pl-4">
            <Button
              outlined
              size="small"
              label="Cancel"
              onClick={(event) => {
                event.preventDefault();
                setShowAddContact(false);
              }}
            />
            <Button size="small" type="submit" label="Submit" />
          </div>
        </form>
      </FormProvider>
    </motion.div>
  );
};

const BasicForm = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<FormDataType>();

  return (
    <div className="flex flex-col justify-left pb-3 w-full sm:w-[40%] md:w-full lg:w-[40%]">
      <div className="flex flex-col gap-2 pl-4">
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
  return (
    <div className="flex flex-col justify-left gap-2 w-full sm:w-[40%] md:w-full lg:w-[40%]">
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

const HomeAddress = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<FormDataType>();
  return (
    <div className="gap-2 grid grid-cols-2 w-full sm:w-[40%] md:w-full lg:w-[80%]">
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

const WorkAddress = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<FormDataType>();
  return (
    <div className="gap-2 grid grid-cols-2 w-full sm:w-[40%] md:w-full lg:w-[80%]">
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

export default AddContact;
