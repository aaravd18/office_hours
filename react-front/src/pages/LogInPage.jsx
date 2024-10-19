import React, { useState } from "react";
import Auth from "../components/Auth";
import Error from "../components/Error";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function LogInPage() {
  const [error, setError] = useState();
  const navigate = useNavigate();
  const authValues = useAuth();
  const alt = (
    <div className="flex flex-row">
      <h3>Don't have an account?</h3>
      <a className="text-blue-500 ml-1" href="/signup">
        Sign Up
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
              await authValues.logIn(email, password);
            } catch (err) {
              console.error(err);
              setError("Failed to sign in.");
              return;
            }
            navigate("/");
          }}
          handleError={() => {}}
          alt={alt}
        >
          Log In
        </Auth>
      </div>
    </div>
  );
}
