import React, { useState } from "react";
import Auth from "../components/Auth";
import Error from "../components/Error";
import { useAuth } from "../contexts/AuthContext";
import { auth } from "../config/firebase";

export default function SignUpPage() {
  const [error, setError] = useState();
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
            try {
              await authValues.signUp(email, password);
            } catch (err) {
              console.error(err);
              setError("Failed to sign up.");
            }
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
