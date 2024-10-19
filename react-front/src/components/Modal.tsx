import React from "react";

export default function Modal({ children, toggle }) {
  if (toggle) {
    document.body.style.overflowY = "hidden";
  } else {
    document.body.style.overflowY = "auto";
  }
  return (
    <>
      {toggle && (
        <div
          className="w-screen h-screen z-50 fixed top-0 left-0 items-center"
          id="modal"
        >
          <div className="-z-20 w-full h-full opacity-50 bg-black absolute top-0 left-0"></div>
          <div className="w-fit h-fit m-auto self-center opacity-100">
            {children}
          </div>
        </div>
      )}
    </>
  );
}
