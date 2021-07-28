import React from "react";

export default function Input({
  text,
  type,
  changeHandler,
  enterHandler,
  isEditable,
  id,
}) {
  return (
    <input
      className={`${
        isEditable ? "bg-gradient-to-r from-blue-50 to-blue-100   " : ""
      }w-10/12 h-10 outline-none text-2xl px-2`}
      onKeyPress={(e) => enterHandler(e, id)}
      onBlur={(e) => enterHandler(e, id)}
      type={type}
      placeholder="Write..."
      value={text}
      onChange={changeHandler}
      autoFocus
    />
  );
}
