"use client";

import "./login.css";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="login-container">

      <div className="login-box">

        <div className="login-left">
          <h1>Travel.io</h1>
          <p>Plan smarter journeys around the world</p>
        </div>

        <div className="login-right">

          <h2>Sign in</h2>

          <div className="divider">
            <span>or</span>
          </div>

          <button
            className="google-btn"
            onClick={() => signIn("google", { callbackUrl: "/google" })}
          >
            <img
              src="https://developers.google.com/identity/images/g-logo.png"
              alt="google"
              className="google-icon"
            />
            Continue with Google
          </button>

        </div>

      </div>

    </div>
  );
}