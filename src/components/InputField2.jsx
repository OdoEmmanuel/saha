import React from 'react'

const InputField2 = (
    {
        label,
        placeHolder,
        name,
        onChange,
        type,
        InputStyle,
        value,
        error,
        errorText,
        className,
        disabled,
        defaultValue,
        min,
        max,
        onBlur
      }
) => {
  return (
    <div className="flex flex-col w-full mb-2">
    <label htmlFor="" className="text-[#000] mb-2">
      {label}
    </label>

    <input
      type={type ? type : "text"}
      placeholder={placeHolder}
      className={`border ${
        error ? "border border-red-500" : ""
      } ${className}  rounded-[5px]   h-[36px]  w-full pl-4 text-[#000] bg-[rgba(255,255,255,0.05)] shadow-[0px_4px_4px_0px_rgba(rgb(59,130,246,0.5))] text-md font-normal placeholder:font-normal outline-none ${
        InputStyle && InputStyle.className
      }`}
      style={InputStyle && InputStyle.style}
      name={name}
      onChange={onChange}
      value={value}
      disabled={disabled}
      defaultValue={defaultValue}
      min={min}
      max={max}
      onBlur={onBlur}
    />
    {error && <p className="text-xs text-red-500">{errorText}</p>}
  </div>
  )
}

export default InputField2