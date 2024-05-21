import { motion } from "framer-motion";

export default function ErrorContainer({ title, error }) {
  return (
    <motion.div
      className="error-block"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="error-block-icon">!</div>
      <div className="error-block-text">
        <h2>{title}</h2>
        <p>{error}</p>
      </div>
    </motion.div>
  );
}
