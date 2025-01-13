import { motion } from "framer-motion";

interface MotionErrorProps {
  message?: string;
  showError: boolean;
}

export const MotionError: React.FC<MotionErrorProps> = ({
  message,
  showError,
}) => {
  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={
        showError ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }
      }
      transition={{ duration: 0.1 }}
      style={{ overflow: "hidden" }}
    >
      {message && (
        <small className="p-error text-red-500 text-sm">{message}</small>
      )}
    </motion.div>
  );
};
