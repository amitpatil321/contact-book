import { Messages } from "primereact/messages";
import { TabPanel, TabView } from "primereact/tabview";
import { Meta } from "../../types/types";

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
    notes,
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
    notes,
  ].some((field) => field != null);

  return (
    <div className="mt-12">
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
          {notes && (
            <TabPanel header="Notes">
              <div className="flex flex-col gap-3">
                <div>
                  <div>{notes}</div>
                </div>
              </div>
            </TabPanel>
          )}
        </TabView>
      ) : null}
    </div>
  );
};

export default MetaInfo;
