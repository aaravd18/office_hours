import React, { useState } from "react";
import Auth from "../components/Auth";
import Error from "../components/Error";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../config/firebase";
import { collection, doc, setDoc } from "firebase/firestore";

export default function SignUpPage() {
  const [error, setError] = useState();
  const navigate = useNavigate();
  const authValues = useAuth();
  const alt = (
    <div className="flex flex-row">
      <h3>Already have an account?</h3>{" "}
      <a className="text-blue-500 ml-1" href="/login">
        Log In
      </a>
    </div>
  );
  return (
    <div className="w-screen h-screen flex">
      <div className="w-fit h-fit m-auto flex flex-col items-center">
        {error ? (
          <Error
            closeFunction={() => {
              setError();
            }}
          >
            {error}
          </Error>
        ) : (
          ""
        )}
        <Auth
          handSubmit={async (email, password) => {
            console.log("signing up now");
            try {
              await authValues.signUp(email, password);
              const docRef = await doc(db, auth.currentUser.email, "notes");
              console.log("referencing path to notes doc");
              console.log(docRef);
              console.log("creating notes doc with field: all_names");
              setDoc(docRef, { all_names: "" });
            } catch (err) {
              console.error(err);
              setError("Failed to sign up.");
              return;
            }
            navigate("/");
          }}
          handleError={() => {}}
          alt={alt}
        >
          Sign Up
        </Auth>
      </div>
    </div>
  );
}
