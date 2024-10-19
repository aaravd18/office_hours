import React, { useState, useEffect } from "react";

export default function Error({ children, closeFunction }) {
  return (
    <div className="w-fit h-max mx-auto mb-3 px-4 py-2 rounded-md bg-red-500 outline outline-red-300 text-white flex flex-row flex-nowrap">
      <h2>{children}</h2>
      <button
        className="ml-2"
        onClick={() => {
          closeFunction();
        }}
      >
        X
      </button>
    </div>
  );
}
