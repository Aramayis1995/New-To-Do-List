import React from "react";
import { BiCheck, BiCheckDouble } from "react-icons/bi";

export default function Footer({
  deleteCompleted,
  deleteAll,
  itemCount,
  completedItemCount,
  handleFilterClick,
  filterState,
}) {
  return (
    <li className=" flex justify-between ">
      <p className="w-2/12 h-10 border-2 flex justify-center text-2xl">
        {completedItemCount}/{itemCount}
      </p>
      <button
        name="all"
        className={`${
          filterState === "all" ? "bg-gray-200" : ""
        } w-2/12 h-10 border-2 text-2xl hover:bg-green-200 hover:border-green-200 flex justify-center `}
        onClick={handleFilterClick}
      >
        Show all
      </button>
      <button
        name="completed"
        className={`${
          filterState === "completed" ? "bg-gray-200" : ""
        } w-2/12 h-10 border-2 text-2xl hover:bg-green-200 hover:border-green-200  flex justify-center `}
        onClick={handleFilterClick}
      >
        Show
        <BiCheckDouble className="w-9 h-9 text-green-500 " />
      </button>
      <button
        name="active"
        className={`${
          filterState === "active" ? "bg-gray-200" : ""
        } w-2/12 h-10 border-2 text-2xl hover:bg-green-200 hover:border-green-200  flex justify-center `}
        onClick={handleFilterClick}
      >
        Show <BiCheck className="w-9 h-9 text-green-500  " />
      </button>
      <button
        className="w-2/12 h-10 border-2 text-2xl hover:bg-gray-200 hover:border-gray-200  flex justify-center"
        onClick={() => deleteCompleted()}
      >
        Delete <BiCheckDouble className="w-9 h-9 text-green-500 " />
      </button>
      <button
        className="w-2/12 h-10 border-2 text-2xl hover:bg-gray-200 hover:border-gray-200"
        onClick={() => deleteAll()}
      >
        Delete all
      </button>
    </li>
  );
}
