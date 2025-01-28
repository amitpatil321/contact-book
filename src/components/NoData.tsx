import { motion } from "framer-motion";

const NoData: React.FC<{
  message: React.ReactNode | string;
  actionComponent?: React.ReactNode;
}> = ({ message, actionComponent }) => {
  return (
    <div className="flex justify-center items-center h-full overflow-hidden">
      <motion.div
        className="flex flex-col justify-center items-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
        }}
      >
        <img
          src="/contact-book-icon.png"
          alt="no contact selected"
          className="h-40"
        />
        <div className="text-center">
          <h5 className="font-semibold text-gray-500 text-xl">{message}</h5>
          {actionComponent && <div className="mt-2">{actionComponent}</div>}
        </div>
        {/* <h5 className="font-semibold text-gray-500 text-xl">{message}</h5> */}
      </motion.div>
    </div>
  );
};

export default NoData;
