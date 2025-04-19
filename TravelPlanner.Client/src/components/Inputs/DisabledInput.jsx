const DisabledInput = ({ label, type = "text", value, onChange, placeholder, name }) => {
    return (
      <>
        <label className="mb-[10px] block text-base font-medium text-dark dark:text-white">
          {children}
        </label>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder || "Enter value"}
          disabled
          className="w-full rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 disabled:border-gray-2 dark:disabled:bg-dark-4 dark:disabled:border-dark-4"
        />
      </>
    );
  };
  
  export default DisabledInput;
  