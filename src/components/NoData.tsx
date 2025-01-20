import Empty from "./NoContactSelected";

const NoData: React.FC<{
  message: React.ReactNode | string;
  actionComponent?: React.ReactNode;
}> = ({ message, actionComponent }) => {
  return (
    <Empty
      message={
        <div className="flex flex-col items-center">
          <span>{message}</span>
          {actionComponent && <div className="mt-2">{actionComponent}</div>}
        </div>
      }
    />
  );
};

export default NoData;
