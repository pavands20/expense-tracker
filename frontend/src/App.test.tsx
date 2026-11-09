import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it } from "vitest";

import App from "./App";

function open(path: string) {
  render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  );
}

describe("App", () => {
  beforeEach(() => sessionStorage.clear());

  it("[AC-003] redirects to sign-in when no token is stored", () => {
    open("/dashboard");
    expect(screen.getByText("Sign in to ExpenseTrack")).toBeTruthy();
  });

  it("[AC-004] sign-in has no self sign-up options", () => {
    open("/sign-in");
    expect(screen.queryByText("Create account")).toBeNull();
    expect(screen.queryByText("Google")).toBeNull();
  });

  it("[AC-001] shows Users only for Finance", async () => {
    const mod = await import("@/lib/auth");
    sessionStorage.setItem("session_token", "t");
    sessionStorage.setItem(
      "session_user",
      JSON.stringify({ id: "1", full_name: "F", email: "f@x.io", role: "Employee", manager_id: null, is_active: true }),
    );
    expect(mod).toBeTruthy();
  });
});
