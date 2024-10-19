import React from "react";
import Navbar from "../components/Navbar";
import { useAuth } from "../contexts/AuthContext";

export default function HomePage() {
  const authVariables = useAuth();
  return (
    <div className="flex flex-col">
      <h1>
        <Navbar />
        {authVariables.currentUser != null ? (
          <div className="m-auto">Signed In</div>
        ) : (
          ""
        )}
      </h1>
    </div>
  );
}
