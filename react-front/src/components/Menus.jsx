import React from "react";

export function CreateNote() {
  return (
    <div className="w-72 aspect-square bg-gray-200 rounded-lg flex flex-col">
      <h2 className="text-xl mx-auto my-2">Creating a New Card</h2>
      <input placeholder="Name" className="w-5/6 mx-auto" />
      <div className=" grid"></div>
    </div>
  );
}
