import { Skeleton } from "primereact/skeleton";

const CompanyDesignation = () => {
  return (
    <div className="flex flex-row pt-2">
      <Skeleton width="5rem" height="0.7rem" />
      &nbsp;
      <Skeleton width="7rem" height="0.7rem" />
    </div>
  );
};

export default CompanyDesignation;
