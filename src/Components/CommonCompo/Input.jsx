import React from "react";

const Input = ({ className, label, type, placeholder, id }) => {
  return (
    <>
      <div className={className}>
        <label
          className="font-Nunito text-sm block font-semibold opacity-30"
          htmlFor={type}
        >
          {label}
        </label>
        <input
          type={type}
          placeholder={placeholder}
          id={id}
          autoComplete="off"
          className="py-[26px] w-3/4 rounded-lg px-6 border-4 border-[rgba(17,23,93,0.45)]"
        />
      </div>
    </>
  );
};

export default Input;
