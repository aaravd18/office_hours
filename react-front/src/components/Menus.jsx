import React, { useState } from "react";

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
  return (
    <div className="w-72 aspect-square bg-gray-200 rounded-lg flex flex-col">
      <div className="px-5 flex flex-row">
        <h2 className="text-xl mx-auto my-2 grow">Edit Menu</h2>
        <button className="transition ease-in-out delay-25 bg-gray-500 hover:-translate-y-1 hover:scale-80 hover:bg-rose-500 duration-200 my-auto px-3 rounded-md text-white shadow-lg"
          onClick={() => {
            closeFunction();
          }}
        >
          x
        </button>
      </div>
      <h1 className="mx-auto my-3 text-2xl">{note}</h1>
      <div className="w-fit mx-auto my-3 flex flex-row">
        <input
          placeholder="Name"
          className="w-auto px-1 rounded-md mr-3"
          onChange={(e) => {
            setNewName(e.target.value);
          }}
        />
        <button
          className="w-fit transition ease-in-out delay-25 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-lime-500 duration-200 my-auto px-1 rounded-md text-white shadow-lg"
          onClick={() => {
            renameFunction();
          }}
        >
          rename
        </button>
      </div>
      <button
        className="w-fit mx-auto transition ease-in-out delay-25 bg-gray-500 hover:-translate-y-1 hover:scale-90 hover:bg-rose-500 duration-200 my-70 px-1 rounded-md text-white shadow-lg"
        onClick={() => {
          deleteFunction();
        }}
      >
        delete
      </button>
    </div>
  );
}
