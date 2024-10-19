import React from "react";

export default function FuncBar() {
  return (
    <div className="w-full py-1 border-t-2 flex">
      <div></div> {/* for page linking laters */}
      <div className="mx-auto">
        <button className="transition ease-in-out delay-50 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-cyan-400 duration-300 my-auto px-2 rounded-md bg-blue-500 text-white mx-auto drop-shadow-lg">
          Optimize
        </button>
        <button className="transition ease-in-out delay-50 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-cyan-400 duration-300 my-auto px-2 rounded-md bg-blue-500 text-white mx-auto ml-2 drop-shadow-lg">
          Study
        </button>
      </div>
    </div>
  );
}
