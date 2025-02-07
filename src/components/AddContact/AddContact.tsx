import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Button } from "primereact/button";
import { Inplace, InplaceContent, InplaceDisplay } from "primereact/inplace";
import { TabPanel, TabView } from "primereact/tabview";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { v4 as uuid } from "uuid";
import { z } from "zod";

import { useQueryClient } from "@tanstack/react-query";
import useSaveContact from "../../api/useSaveContact";
import { CONTACT_STATUS } from "../../constants/constants";
import messages from "../../constants/messages";
import { formSchema } from "../../helpers/AddContactZodSchema";
import { useToast } from "../../hooks/useToast";
import useStore from "../../store/store";
import BasicForm from "./BasicInfo";
import HomeAddress from "./HomeAddress";
import PersonalInfo from "./PersonalInfo";
import WorkAddress from "./WorkAddress";

type FormDataType = z.infer<typeof formSchema>;

const AddContact: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const { setSelectedContact, setShowAddContact } = useStore();

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
    setLoading(true);
    const profilePicValue =
      formData.profile_pic instanceof File ? null : formData.profile_pic;

    const contactForm = {
      ...formData,
      profile_pic: profilePicValue,
      id: uuid(),
      created_at:
        new Date().toISOString().slice(0, 19).replace("T", " ") + "+00",
      status: CONTACT_STATUS.active,
    };
    mutate(contactForm, {
      onSuccess: (response) => {
        setLoading(false);
        queryClient.invalidateQueries({ queryKey: ["fetchContacts"] });
        showToast("success", "Success", messages.contacts.saveSuccess);
        reset();
        setSelectedContact(response.contacts[0]);
        setShowAddContact(false);
      },
      onError: (error) => {
        setLoading(false);
        showToast("error", "Error", error.message);
      },
    });
  };

  return (
    <motion.div
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h4 className="pb-1 pl-8">Add Contact</h4>
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
                <TabPanel className="m-0 p-0" header="Work Details">
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
              disabled={loading}
              onClick={(event) => {
                event.preventDefault();
                setShowAddContact(false);
              }}
            />
            <Button
              size="small"
              type="submit"
              label="Submit"
              disabled={loading}
              loading={loading}
            />
          </div>
        </form>
      </FormProvider>
    </motion.div>
  );
};

export default AddContact;
