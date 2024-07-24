import React from 'react'

const SelectField = ({
    label,
    options,
    name,
    onChange,
    placeHolder,
    error,
    errorText,
    value,
    formik
  }) => {
  return (
    <div className="flex flex-col mb-2 w-full">
      <label htmlFor="" className="text-[#344054]">
        {label}
      </label>

      <select
        className={
          error
            ? "border border-red-500 h-10  shadow-[0_1px_2px_0_rgba(16,_24,_40,_0.05)] w-full bg-white form-select   rounded-[5px] outline-0 text-[#11233D] "
            : "h-10 border shadow-[0_1px_2px_0_rgba(16,_24,_40,_0.05)] w-full rounded-[5px]   outline-none bg-white    placeholder:font-normal form-select  border-[#D0D5DD] focus:ring-0 focus:border-[#D0D5DD] text-[#11233D] placeholder:text-[#11233D] "
        }
        name={name}
        onChange={onChange}
        value={value}
      >
        <option
          style={{ color:"#C5C5C5 !important" }}
          value=""
          disabled
          selected
          hidden
          className="text-[#C5C5C5]"
        >
        <p className="text-[#C5C5C5]">{placeHolder}</p>  
        </option>
        {options.map((option, i) => (
          <option about={option.code}  key={i} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-red-500">{errorText}</p>}
    </div>
  )
}

export default SelectField