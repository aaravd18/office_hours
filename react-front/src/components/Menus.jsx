import React, { useState } from "react";
import edit_icon from "./images/edit.png";

export function CreateNote() {
  return (
    <div className="w-72 aspect-square bg-gray-200 rounded-lg flex flex-col">
      <h2 className="text-xl mx-auto my-2">Creating a New Note</h2>
      <input placeholder="Name" className="w-5/6 mx-auto round-md " />
      <div className=" grid"></div>
    </div>
  );
}

export function EditNote({
  closeFunction,
  renameFunction,
  deleteFunction,
  note,
}) {
  const [newName, setNewName] = useState();
  const [toggle, setToggle] = useState(false);

  return (
    <div className="w-72 aspect-square bg-gray-200 rounded-lg flex flex-col">
      <div className="px-5 flex flex-row">
        <h2 className="text-xl mx-auto my-2 grow">Edit Menu</h2>
        <button
          className="transition ease-in-out delay-25 bg-gray-500 hover:-translate-y-1 hover:scale-80 hover:bg-rose-500 duration-200 my-auto px-3 rounded-md text-white shadow-lg"
          onClick={() => {
            closeFunction();
          }}
        >
          x
        </button>
      </div>
      {toggle ? (
        <div className="w-fit mx-auto my-3 flex flex-row">
          <input
            placeholder={note}
            className="w-auto px-1 rounded-sm"
            onChange={(e) => {
              setNewName(e.target.value);
            }}
          />
          <button
            className="ml-1 px-2 rounded-sm bg-blue-500 text-white"
            onClick={() => {
              renameFunction();
              setToggle(false);
            }}
          >
            rename
          </button>
        </div>
      ) : (
        <div className="w-fit mx-auto my-3 flex flex-row">
          <h1 className="text-2xl">{'"' + note + '"'}</h1>{" "}
          <button
            onClick={() => {
              setToggle(true);
            }}
          >
            <img className="w-8 ml-1" src={edit_icon} />
          </button>
        </div>
      )}
    </div>
  );
}
