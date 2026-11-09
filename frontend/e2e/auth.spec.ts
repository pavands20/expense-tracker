import { expect, test, type Page } from "@playwright/test";

// A Finance account seeded by the backend from BOOTSTRAP_ADMIN_* / SEED_ADMIN_*.
const EMAIL = process.env.E2E_EMAIL ?? process.env.SEED_ADMIN_EMAIL ?? process.env.BOOTSTRAP_ADMIN_EMAIL ?? "";
const PASSWORD =
  process.env.E2E_PASSWORD ?? process.env.SEED_ADMIN_PASSWORD ?? process.env.BOOTSTRAP_ADMIN_PASSWORD ?? "";

async function signIn(page: Page, email = EMAIL, password = PASSWORD) {
  await page.goto("/sign-in");
  await page.getByPlaceholder("Email").fill(email);
  await page.getByPlaceholder("Password").fill(password);
  await page.getByRole("button", { name: /^Sign in/ }).click();
}

test("[AC-001] valid sign-in lands on the dashboard", async ({ page }) => {
  test.skip(!EMAIL || !PASSWORD, "no seeded credentials in the environment");
  await signIn(page);
  await expect(page).toHaveURL(/\/dashboard/);
  await expect(page.getByRole("button", { name: "Sign out" })).toBeVisible();
});

test("[AC-002] invalid credentials show one generic error", async ({ page }) => {
  await signIn(page, "nobody@example.com", "wrong-password-1");
  const first = await page.getByRole("alert").first().innerText();
  expect(first.length).toBeGreaterThan(0);
  await expect(page).toHaveURL(/\/sign-in/);

  await signIn(page, EMAIL || "someone@example.com", "wrong-password-2");
  await expect(page.getByRole("alert").first()).toHaveText(first);
  expect(first.toLowerCase()).not.toMatch(/no account|unknown|not found|wrong password|incorrect password/);
});

test("[AC-003] opening /claims signed out redirects to /sign-in", async ({ page }) => {
  await page.goto("/claims");
  await expect(page).toHaveURL(/\/sign-in/);
});

test("[AC-004] sign-in page has no create-account option", async ({ page }) => {
  await page.goto("/sign-in");
  await expect(page.getByRole("heading", { name: /Sign in/ })).toBeVisible();
  await expect(page.getByText(/create account|sign up|register/i)).toHaveCount(0);
});

test("[AC-005] Sign out returns to /sign-in and back does not show protected pages", async ({ page }) => {
  test.skip(!EMAIL || !PASSWORD, "no seeded credentials in the environment");
  await signIn(page);
  await expect(page).toHaveURL(/\/dashboard/);
  await page.getByRole("button", { name: "Sign out" }).click();
  await expect(page).toHaveURL(/\/sign-in/);
  await page.goBack();
  await expect(page).toHaveURL(/\/sign-in/);
  await expect(page.getByRole("button", { name: "Sign out" })).toHaveCount(0);
});
