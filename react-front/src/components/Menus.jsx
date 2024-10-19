import React, { useState } from "react";

export function CreateNote() {
  return (
    <div className="w-72 aspect-square bg-gray-200 rounded-lg flex flex-col">
      <h2 className="text-xl mx-auto my-2">Creating a New Note</h2>
      <input placeholder="Name" className="w-5/6 mx-auto" />
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
        <button
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
          className="w-auto px-1"
          onChange={(e) => {
            setNewName(e.target.value);
          }}
        />
        <button
          className="ml-1 px-2 bg-blue-500 text-white"
          onClick={() => {
            renameFunction();
          }}
        >
          rename
        </button>
      </div>
      <button
        className="w-fit mx-auto my-3 px-2 bg-red-500 text-white"
        onClick={() => {
          deleteFunction();
        }}
      >
        delete
      </button>
    </div>
  );
}
