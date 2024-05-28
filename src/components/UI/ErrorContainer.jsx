import { motion } from "framer-motion";

export default function ErrorContainer({ title, error }) {
  return (
    <motion.div
      className="bg-error text-error-content p-4 rounded-md shadow-md"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex gap-2 mb-5 items-center">
        <p
          className="bg-error-content text-error w-8 h-8 flex items-center justify-center rounded-full"
          role="alert"
        >
          !
        </p>
        <h2 className="text-lg font-bold">{title}</h2>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm">{error}</p>
      </div>
    </motion.div>
  );
}
