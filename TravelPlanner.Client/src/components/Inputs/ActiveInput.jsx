const ActiveInput = ({ label, type = "text", value, onChange, placeholder, name }) => {
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
          className="w-full bg-transparent rounded-md border border-primary py-[10px] px-5 text-dark-5 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 disabled:border-gray-2"
        />
      </>
    );
  };
  
  export default ActiveInput;
  