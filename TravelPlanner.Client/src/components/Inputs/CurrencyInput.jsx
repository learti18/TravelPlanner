
  const CurrencyInput = ({ label, value, onChange, placeholder, name }) => {
    return (
      <>
        <label className='mb-[10px] block text-base font-medium text-dark dark:text-gray-600"'>
          {label}
        </label>
        <div className='flex items-center'>
          <span className='h-full rounded-tl-md rounded-bl-md border border-r-0 border-stroke dark:border-dark-3 bg-gray-2 dark:bg-dark-2 py-[10px] px-4 text-base uppercase text-body-color dark:text-dark-6'>
            USD
          </span>
          <input
            type="number"
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder || "USD"}
            className='w-full bg-transparent rounded-br-md rounded-tr-md border border-stroke dark:border-dark-3 py-[10px] pr-3 pl-5 text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2'
          />
        </div>
      </>
    )
  }
  export default CurrencyInput;