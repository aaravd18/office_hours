import React from "react";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";

export default function ExamPage() {
  const { id } = useParams();
  return (
    <div className="w-screen h-screen flex flex-col">
      <Navbar />
      <div className="mx-auto text-4xl flex flex-row">
        <h1>Exam made with </h1>
        <h1 className="ml-2 text-blue-600"> {id}</h1>
      </div>
      <main></main>
    </div>
  );
}
