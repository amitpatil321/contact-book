import { motion } from "framer-motion";
import { Messages } from "primereact/messages";
import { Skeleton } from "primereact/skeleton";
import React, { useRef } from "react";
import { v4 as uuid } from "uuid";

import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { TabPanel, TabView } from "primereact/tabview";
import useFetchContactMeta from "../api/useFetchContactMeta";
import useStore from "../store/store";
import { Contact, Meta } from "../types/types";
import Loading from "./Loading";
import NoContactSelected from "./NoContactSelected";

const ContactDetails = () => {
  const { selected: contact } = useStore();
  const msgs = useRef<Messages | null>(null);

  const {
    data: meta = [],
    error,
    isLoading: loading,
  } = useFetchContactMeta(contact?.id);

  if (!contact) return <NoContactSelected />;

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

  return contact ? (
    <motion.div
      className="flex flex-col gap-8"
      key={contact.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-start gap-6 h-[150px]">
        <div className="text-center">
          <div className="inline-block">
            <Avatar
              image={profile_pic ?? ""}
              label={first_name?.[0] ?? "U"}
              shape="circle"
              style={{
                width: "150px",
                height: "150px",
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
              <div className="flex flex-row pt-2">
                <Skeleton width="3rem" height="0.7rem" />
                &nbsp;
                <Skeleton width="3rem" height="0.7rem" />
              </div>
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
      {loading ? (
        <Loading size="medium" />
      ) : (
        <MetaInfo meta={meta} msgs={msgs} />
      )}
    </motion.div>
  ) : (
    <NoContactSelected />
  );
};

export default ContactDetails;

const ActionButton: React.FC<{ contact: Contact }> = ({ contact }) => {
  return (
    <div className="flex justify-start items-center gap-2 mt-auto text-gray-400 text-sm">
      <span className="hover:text-purple-500 cursor-pointer">Edit</span>
      <span className="text-gray-400">|</span>
      <span className="hover:text-purple-500 cursor-pointer">Archive</span>
      <span className="text-gray-400">|</span>
      <Button
        link
        className="px-1 text-gray-400 hover:text-red-500 cursor-pointer"
        onClick={() => console.log(contact.id)}
      >
        Delete
      </Button>
    </div>
  );
};

const SocialLinks: React.FC<{ meta: Meta[]; loading: boolean }> = ({
  meta,
  loading,
}) => {
  if (!meta || meta.length === 0) return null;
  const { linkedin, github, website } = meta[0];

  const links = [
    {
      label: "LinkedIn",
      url: linkedin,
      icon: <i className="text-blue-600 pi pi-linkedin" />,
    },
    {
      label: "GitHub",
      url: github,
      icon: <i className="text-gray-800 pi pi-github" />,
    },
    {
      label: "Website",
      url: website,
      icon: <i className="text-green-600 pi pi-globe" />,
    },
  ];

  return (
    <div className="flex flex-row pt-2 w-full">
      {loading ? (
        <div className="flex flex-row space-x-3 py-1.8">
          <div className="flex flex-row items-center space-x-1">
            <Skeleton shape="circle" size="1.4rem" />
            <Skeleton width="3rem" height="0.7rem" />
          </div>
          <div className="flex flex-row items-center space-x-1">
            <Skeleton shape="circle" size="1.4rem" />
            <Skeleton width="3rem" height="0.7rem" />
          </div>
          <div className="flex flex-row items-center space-x-1">
            <Skeleton shape="circle" size="1.4rem" />
            <Skeleton width="3rem" height="0.7rem" />
          </div>
        </div>
      ) : (
        links.map((link) =>
          link.url ? (
            <a
              key={uuid()}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center mr-2"
            >
              <span className="mr-2 text-xl">{link.icon}</span>
              <span className="font-medium text-gray-700">{link.label}</span>
            </a>
          ) : null
        )
      )}
    </div>
  );
};

const MetaInfo: React.FC<{
  meta: Meta[];
  msgs: React.RefObject<Messages>;
}> = ({ meta, msgs }) => {
  const {
    birthdate,
    work_company,
    work_designation,
    home_address1,
    home_address2,
    home_city,
    home_state,
    home_country,
    home_zip,
    work_address1,
    work_address2,
    work_city,
    work_state,
    work_country,
    work_zip,
  } = meta[0] || {};

  const hasAnyField = [
    birthdate,
    work_company,
    work_designation,
    home_address1,
    home_address2,
    home_city,
    home_state,
    home_country,
    home_zip,
    work_address1,
    work_address2,
    work_city,
    work_state,
    work_country,
    work_zip,
  ].some((field) => field != null);

  return (
    <>
      <Messages ref={msgs} />
      {hasAnyField ? (
        <TabView>
          {birthdate || work_company || work_designation ? (
            <TabPanel header="Personal Details">
              <div>
                {home_address1 && (
                  <div className="flex gap-3">
                    <p className="text-gray-400">Birthdate : </p>
                    {birthdate}
                  </div>
                )}
                {work_company && (
                  <div className="flex gap-3">
                    <p className="text-gray-400">Company : </p>
                    {work_company}
                  </div>
                )}
                {work_designation && (
                  <div className="flex gap-3">
                    <p className="text-gray-400">Designation : </p>
                    {work_designation}
                  </div>
                )}
              </div>
            </TabPanel>
          ) : null}
          {home_address1 ||
          home_address2 ||
          home_city ||
          home_state ||
          home_country ||
          home_zip ? (
            <TabPanel header="Home Address">
              <div className="flex flex-col gap-3">
                <p className="text-gray-400">Home Address : </p>
                <div>
                  {home_address1 && <div>{home_address1}</div>}
                  {home_address2 && <div>{home_address2}</div>}
                  {(home_city || home_state) && (
                    <div>
                      {home_city && <span>{home_city}</span>}
                      {home_city && home_state && ", "}
                      {home_state && <span>{home_state}</span>}
                    </div>
                  )}
                  {(home_country || home_zip) && (
                    <div>
                      {home_country && <span>{home_country}</span>}
                      {home_country && home_zip && ", "}
                      {home_zip && <span>{home_zip}</span>}
                    </div>
                  )}
                </div>
              </div>
            </TabPanel>
          ) : null}
          {work_address1 ||
          work_address2 ||
          work_city ||
          work_state ||
          work_country ||
          work_zip ? (
            <TabPanel header="Work Address">
              <div className="flex flex-col gap-3">
                <p className="text-gray-400">Work Address : </p>
                <div>
                  {work_address1 && <div>{work_address1}</div>}
                  {work_address2 && <div>{work_address2}</div>}
                  {(work_city || work_state) && (
                    <div>
                      {work_city && <span>{work_city}</span>}
                      {work_city && work_state && ", "}
                      {work_state && <span>{work_state}</span>}
                    </div>
                  )}
                  {(work_country || work_zip) && (
                    <div>
                      {work_country && <span>{work_country}</span>}
                      {work_country && work_zip && ", "}
                      {work_zip && <span>{work_zip}</span>}
                    </div>
                  )}
                </div>
              </div>
            </TabPanel>
          ) : null}
        </TabView>
      ) : null}
    </>
  );
};
