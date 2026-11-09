// @ts-nocheck -- generated from the approved design under its JS runtime contract; not hand-written TypeScript.
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import { brand } from "@/lib/brand";
import { useNavigate } from "@/lib/navigate";
import { ApiError } from "@/lib/api";
import { login } from "@/lib/auth";

const PRODUCT = "Expense Tracker";
const SCREEN = "Sign in";
const mix = (colour, percent) => `color-mix(in srgb, ${colour} ${percent}%, transparent)`;

export default function Screen() {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const status = "";
  const [forgotHint, setForgotHint] = React.useState(false);
  const glass = {
    backgroundColor: "rgba(255,255,255,0.07)",
    border: "1px solid rgba(255,255,255,0.14)",
    borderRadius: brand.radius,
  };
  const glow = `0 20px 60px -10px ${mix(brand.primaryColor, 70)}`;

  return (
    <div
      className="relative flex min-h-screen items-center justify-center overflow-hidden text-white"
      style={{ fontFamily: brand.fontBody }}
    >
      <div
        aria-hidden
        className="absolute -left-32 top-[-120px] h-[520px] w-[520px] rounded-full blur-[120px]"
        style={{ backgroundColor: mix(brand.primaryColor, 70) }}
      />
      <div
        aria-hidden
        className="absolute bottom-[-160px] right-[-80px] h-[560px] w-[560px] rounded-full blur-[130px]"
        style={{ backgroundColor: mix(brand.accentColor, 60) }}
      />
      <p
        className="absolute left-10 top-8 text-lg font-bold"
        style={{ fontFamily: brand.fontHeading }}
      >
        {PRODUCT}
      </p>

      <main
        className="relative w-full max-w-[420px] p-10 backdrop-blur-2xl"
        style={{ ...glass, boxShadow: "0 40px 120px -20px rgba(0,0,0,0.6)" }}
      >
        <p
          className="inline-flex rounded-full px-3 py-1 text-xs font-semibold"
          style={{ backgroundColor: mix(brand.accentColor, 25), color: "#fff" }}
        >
          ● Live
        </p>
        <h1
          data-wf="b-0-0"
          className="mt-5 text-4xl font-extrabold tracking-tight"
          style={{ fontFamily: brand.fontHeading }}
        >
          Sign in to ExpenseTrack
        </h1>
        <p className="mt-2 text-sm text-white/65">Jump back in where you left off.</p>
        {status ? (
          <p
            role="status"
            className="mt-8 p-4 text-sm font-semibold"
            style={{ ...glass, boxShadow: glow }}
          >
            {status}
          </p>
        ) : (
          <form
            className="mt-8 space-y-4"
            onSubmit={async (e) => {
              e.preventDefault();
              setError("");
              try {
                await login(email, password);
                navigate("dashboard");
              } catch (err) {
                setError(
                  err instanceof ApiError && err.status === 401
                    ? "Invalid email or password"
                    : "Something went wrong. Please try again.",
                );
              }
            }}
          >
            {error ? (
              <p role="alert" className="text-sm font-semibold" style={{ color: brand.accentColor }}>
                {error}
              </p>
            ) : null}
            <label htmlFor="tech-email" className="sr-only">
              Email
            </label>
            <input
              id="tech-email"
              data-wf="i-1-0-0"
              type="email"
              required
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 w-full px-4 text-sm text-white placeholder:text-white/40 outline-none focus:ring-2"
              style={glass}
            />
            <label htmlFor="tech-password" className="sr-only">
              Password
            </label>
            <input
              id="tech-password"
              data-wf="i-1-0-1"
              type="password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 w-full px-4 text-sm text-white placeholder:text-white/40 outline-none focus:ring-2"
              style={glass}
            />
            <button
              type="submit"
              data-wf="b-2-0"
              className="h-12 w-full text-sm font-bold text-white transition-transform hover:scale-[1.02]"
              style={{
                background: `linear-gradient(90deg, ${brand.primaryColor}, ${brand.accentColor})`,
                borderRadius: brand.radius,
                boxShadow: glow,
              }}
            >
              Sign in →
            </button>
            <button
              type="button"
              data-wf="b-3-0"
              onClick={() => setForgotHint(true)}
              className="text-sm font-semibold underline underline-offset-4"
              style={{ color: brand.accentColor }}
            >
              Forgot password?
            </button>
            {forgotHint ? (
              <p role="status" className="text-sm text-white/65">
                Password reset by email isn't wired up in this prototype yet.
              </p>
            ) : null}
          </form>
        )}
      </main>
    </div>
  );
}
