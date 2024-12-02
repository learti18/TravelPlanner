const InvalidInput = ({ label, type = "text", value, onChange, placeholder, name }) => {
    return (
      <>
        <label className="mb-[10px] block text-base font-medium text-dark dark:text-white">
         {label}
        </label>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder || "Enter value"}
          className="w-full rounded-md border border-danger py-[10px] px-5 text-dark-6 outline-none transition focus:border-danger"
        />
      </>
    );
  };
  
  export default InvalidInput;
  