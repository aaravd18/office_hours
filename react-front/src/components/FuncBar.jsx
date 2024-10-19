import React from "react";

export default function FuncBar() {
  return (
    <div className="w-full py-1 border-t-2 flex">
      <div></div> {/* for page linking laters */}
      <div className="mx-auto">
        <button className="min-w-32 px-1 mx-1 bg-blue-600 text-white rounded-sm">
          Optimize
        </button>
        <button className="min-w-32 px-1 mx-1 bg-blue-600 text-white rounded-sm">
          Study
        </button>
      </div>
    </div>
  );
}
