import React from "react";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";

export default function ExamPage({ className, toggle }) {
  //   const { id } = useParams();
  return (
    <div
      className={
        "w-full h-full flex flex-col absolute top-0 left-0 border-t-2 " +
        className
      }
    >
      {/* <Navbar /> */}
      <div className="w-full pt-5 px-10 text-2xl flex flex-row">
        <h1 className="grow"></h1>
        <button
          onClick={() => {
            toggle();
          }}
        >
          X
        </button>
      </div>
      <div className="mx-auto text-4xl flex flex-row">
        <h1>Exam made with </h1>
        <h1 className="ml-2 text-blue-600"> {"id"}</h1>
      </div>
      <main></main>
    </div>
  );
}
