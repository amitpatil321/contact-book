import { ReactNode } from "react";

const Empty: React.FC<{ message: string | ReactNode }> = ({ message }) => {
  return (
    <div className="flex flex-col justify-center items-center gap-5 h-full">
      <img
        src="/contact-book-icon.png"
        alt="no contact selected"
        className="h-40"
      />
      <h5 className="font-semibold text-gray-500 text-xl">{message}</h5>
    </div>
  );
};

export default Empty;
