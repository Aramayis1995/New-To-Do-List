import React from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { BiCheck, BiCheckDouble } from "react-icons/bi";

import Input from "../Input/Input";

export default function ToDoItem({
  text,
  handleDelate,
  id,
  handleCheck,
  isCompleted,
  handleEdit,
  handleEditEnter,
  handleItemInputChange,
  isEditable,
}) {
  return (
    <li className="flex justify-between px-6 py-2 ">
      {isEditable ? (
        <Input
          isEditable={isEditable}
          text={text}
          changeHandler={(e) => {
            handleItemInputChange(e, id);
          }}
          enterHandler={handleEditEnter}
          id={id}
        />
      ) : (
        <p
          className={`${
            isCompleted
              ? "bg-gradient-to-r from-green-400 to-blue-400 line-through"
              : "bg-gradient-to-r from-gray-200 to-gray-400"
          }   w-10/12 text-2xl px-2`}
        >
          {text}
        </p>
      )}

      <div className="flex justify-center w-2/12">
        <button
          className={`${
            isEditable ? "bg-blue-200" : ""
          } border-2 w-4/12 h-10 flex justify-center hover:bg-blue-300`}
          type="button"
          onClick={() => handleEdit(id)}
        >
          <AiFillEdit className="w-9 h-9 text-blue-500 hover:text-blue-700" />
        </button>
        <button
          className=" border-2 w-4/12 h-10 flex justify-center hover:bg-green-200"
          type="button"
          onClick={() => handleCheck(id)}
        >
          {isCompleted ? (
            <BiCheckDouble className="w-9 h-9 text-green-500 hover:text-green-700 " />
          ) : (
            <BiCheck className="w-9 h-9 text-green-500 hover:text-green-700" />
          )}
        </button>
        <button
          className="border-2 w-4/12 h-10 flex justify-center	hover:bg-gray-200"
          type="button"
          onClick={() => handleDelate(id)}
        >
          <AiFillDelete className="w-9 h-9 text-gray-500 hover:text-red-700" />
        </button>
      </div>
    </li>
  );
}
