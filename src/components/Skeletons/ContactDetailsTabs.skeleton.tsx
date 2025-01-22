import { Skeleton } from "primereact/skeleton";

const ContactDetailsTabs = () => {
  return (
    <>
      <div className="flex gap-6 pb-2 pl-2">
        <Skeleton width="8rem" height="2rem"></Skeleton>
        <Skeleton width="8rem" height="2rem"></Skeleton>
        <Skeleton width="8rem" height="2rem"></Skeleton>
        <Skeleton width="7rem" height="2rem"></Skeleton>
      </div>
      <hr />
      <div className="flex flex-row gap-2 pt-6 pl-6">
        <div>
          <Skeleton width="5rem" height="0.6rem" className="mb-2"></Skeleton>
          <Skeleton width="6rem" height="0.6rem" className="mb-2"></Skeleton>
          <Skeleton width="6rem" height="0.6rem" className="mb-2"></Skeleton>
        </div>
        <div>
          <Skeleton width="5rem" height="0.6rem" className="mb-2"></Skeleton>
          <Skeleton width="4rem" height="0.6rem" className="mb-2"></Skeleton>
          <Skeleton width="6rem" height="0.6rem" className="mb-2"></Skeleton>
        </div>
      </div>
    </>
  );
};

export default ContactDetailsTabs;
