"use client";

import "./login.css";

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

          <form className="login-form">

            <input
              type="email"
              placeholder="Email Address"
              className="input"
            />

            <input
              type="password"
              placeholder="Password"
              className="input"
            />

            <button className="login-btn">
              Sign In
            </button>

          </form>

          <div className="divider">
            <span>or</span>
          </div>

          <button className="google-btn">
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