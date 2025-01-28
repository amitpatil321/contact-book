import { motion } from "framer-motion";
import { Messages } from "primereact/messages";
import { useRef } from "react";

import { Avatar } from "primereact/avatar";
import useFetchContactMeta from "../../api/useFetchContactMeta";
import messages from "../../constants/messages";
import useStore from "../../store/store";
import NoData from "../NoData";
import CompanyDesignation from "../Skeletons/CompanyDesignation.skeleton";
import ContactDetailsTabs from "../Skeletons/ContactDetailsTabs.skeleton";
import ActionButton from "./ActionButtons";
import MetaInfo from "./MetaInfo";
import SocialLinks from "./SocialLinks";

const ContactDetails = () => {
  const { selected: contact } = useStore();
  const msgs = useRef<Messages | null>(null);
  const contactId = contact?.id ? contact.id : undefined;
  const {
    data: meta = [],
    error,
    isLoading: loading,
  } = useFetchContactMeta(contactId);

  if (!contact) return <NoData message={messages.contacts.nothingSelected} />;

  const { first_name, last_name, profile_pic, email, mobile } = contact;
  const { work_company, work_designation } = meta[0] || {};

  if (error && msgs.current) {
    msgs.current.clear();
    msgs.current.show({
      sticky: true,
      severity: "error",
      summary: "Error",
      detail: error.message,
      closable: false,
    });
  }

  return (
    <motion.div
      className="flex flex-col"
      key={contact.id}
      // initial={{ opacity: 0 }}
      // animate={{ opacity: 1 }}
      // exit={{ opacity: 0 }}
      // transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{
        duration: 0.5,
        ease: "easeInOut",
      }}
    >
      <div className="flex justify-center items-start gap-6 h-[200px]">
        <div className="w-[30%] text-center">
          <div className="inline-block">
            <Avatar
              image={profile_pic ?? ""}
              label={first_name?.[0] ?? "U"}
              shape="circle"
              style={{
                width: "150px",
                height: "150px",
                objectFit: "cover",
              }}
              className="bg-purple-500 text-6xl text-white"
            />
          </div>
        </div>
        <div className="flex flex-col w-full h-full">
          <div>
            <h3 className="mb-1 font-semibold text-2xl text-gray-800">
              {first_name} {last_name}
            </h3>
            {loading ? (
              <CompanyDesignation />
            ) : (
              (work_company || work_designation) && (
                <div className="pb-2">
                  {work_company && <b>{work_company} </b>}
                  {work_designation && <>({work_designation})</>}
                </div>
              )
            )}
            {email && (
              <div className="flex items-center mb-1 text-gray-600">
                <i className="mr-2 text-purple-500 pi pi-envelope" />
                <span className="hover:text-purple-500">
                  <a href={`mailto:${email}`}>{email}</a>
                </span>
              </div>
            )}
            <div className="flex items-center text-gray-600">
              <i className="mr-2 text-purple-500 pi pi-mobile" />
              <span className="hover:text-purple-500">
                <a href={`tel:${mobile}`}>{mobile}</a>
              </span>
            </div>
          </div>
          <SocialLinks meta={meta} loading={loading} />
          <ActionButton contact={contact} />
        </div>
      </div>
      {loading ? <ContactDetailsTabs /> : <MetaInfo meta={meta} msgs={msgs} />}
    </motion.div>
  );
};

export default ContactDetails;
