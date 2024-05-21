import { motion } from "framer-motion";
import Input from "../UI/Input";
import Select from "../UI/Select";

export default function SearchContainer({
  title = "Search",
  onSubmit,
  hideDays = false,
}) {
  const inputClasses =
    "shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline my-2 text-black";

  return (
    <motion.form
      onSubmit={onSubmit}
      className="container mx-auto p-4 bg-primary text-neutral-content rounded-lg mt-8 text-white"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold text-center p-4">{title}</h1>
      <Input label="City" id="city" className={inputClasses} />
      {!hideDays && (
        <Select
          label="Days"
          id="days"
          className={inputClasses}
          options={[
            { value: "1", label: "1" },
            { value: "2", label: "2" },
            { value: "3", label: "3" },
            { value: "4", label: "4" },
            { value: "5", label: "5" },
            { value: "6", label: "6" },
            { value: "7", label: "7" },
          ]}
        />
      )}
      <button type="submit" className="btn btn-accent mt-4">
        Search
      </button>
    </motion.form>
  );
}
