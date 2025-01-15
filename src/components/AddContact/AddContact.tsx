import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Button } from "primereact/button";
import { Inplace, InplaceContent, InplaceDisplay } from "primereact/inplace";
import { TabPanel, TabView } from "primereact/tabview";
import { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { v4 as uuid } from "uuid";
import { z } from "zod";

import { useQueryClient } from "@tanstack/react-query";
import useSaveContact from "../../api/useSaveContact";
import { AppContext } from "../../context/AppContext";
import { formSchema } from "../../helpers/AddContactZodSchema";
import { useToast } from "../../hooks/useToast";
import useStore from "../../store/store";
import { AppContextType } from "../../types/types";
import BasicForm from "./BasicInfo";
import HomeAddress from "./HomeAddress";
import PersonalInfo from "./PersonalInfo";
import WorkAddress from "./WorkAddress";

type FormDataType = z.infer<typeof formSchema>;

const AddContact: React.FC = () => {
  const queryClient = useQueryClient();
  const { setShowAddContact } = useContext(AppContext) as AppContextType;
  const { setSelectedContact } = useStore();

  const { showToast } = useToast();
  const { mutate } = useSaveContact();
  const methods = useForm<FormDataType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      birthdate: undefined,
    },
  });
  const { handleSubmit, reset } = methods;

  const submitForm = (formData: FormDataType) => {
    const profilePicValue =
      formData.profile_pic instanceof File ? null : formData.profile_pic;

    const contactForm = {
      ...formData,
      profile_pic: profilePicValue,
      id: uuid(),
      created_at:
        new Date().toISOString().slice(0, 19).replace("T", " ") + "+00",
    };
    mutate(contactForm, {
      onSuccess: (contact) => {
        console.log(contact);
        queryClient.invalidateQueries({ queryKey: ["fetchContacts"] });
        showToast("success", "Success", "Contact saved successfully!");
        reset();
        setSelectedContact(contact[0]);
        setShowAddContact(false);
      },
      onError: (error) => showToast("error", "Error", error.message),
    });
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
          <BasicForm methods={methods} />
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

export default AddContact;
