import { Skeleton } from "primereact/skeleton";

const ContactDetailsTabs = () => {
  return (
    <>
      <div className="flex gap-6 mt-14 pb-2 pl-4">
        <Skeleton width="7rem" height="2rem"></Skeleton>
        <Skeleton width="7rem" height="2rem"></Skeleton>
        <Skeleton width="7rem" height="2rem"></Skeleton>
        <Skeleton width="6rem" height="2rem"></Skeleton>
      </div>
      <hr />
      <div className="flex flex-col pt-6 pl-4">
        <Skeleton width="8rem" height="0.6rem" className="mb-2"></Skeleton>
        <Skeleton width="5rem" height="0.6rem" className="mb-2"></Skeleton>
        <Skeleton width="7rem" height="0.6rem" className="mb-2"></Skeleton>
        <Skeleton width="5rem" height="0.6rem" className="mb-2"></Skeleton>
      </div>
    </>
  );
};

export default ContactDetailsTabs;
