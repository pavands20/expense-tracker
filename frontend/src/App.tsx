import { NavLink, Navigate, Outlet, Route, Routes } from "react-router-dom";

import { Icons } from "@/lib/icons";
import SignIn from "@/screens/SignIn";
import Dashboard from "@/screens/Dashboard";
import Claims from "@/screens/Claims";
import ClaimEdit from "@/screens/ClaimEdit";
import ClaimDetail from "@/screens/ClaimDetail";
import Users from "@/screens/Users";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    "flex items-center gap-2 rounded-[var(--brand-radius)] px-3 py-2 text-sm font-medium transition-colors",
    isActive ? "bg-[var(--brand-hover)] text-[var(--brand-fg)]" : "text-[var(--brand-fg-muted)]",
  ].join(" ");

// The app's menu, drawn around every screen except the ones routed outside it below.
function AppShellLayout() {
  return (
    <div className="flex min-h-screen">
      <aside
        className="w-56 shrink-0 border-r p-4"
        style={{
          backgroundColor: "var(--brand-surface)",
          borderColor: "var(--brand-border)",
        }}
      >
        <p
          className="mb-4 px-3 text-sm font-semibold"
          style={{ fontFamily: "var(--brand-font-heading)" }}
        >
          {"ExpenseTrack"}
        </p>
        <nav aria-label="App menu" className="flex flex-col gap-1">
          <NavLink to="/dashboard" className={navLinkClass}>
            <Icons.Home size={16} />
            {"Dashboard"}
          </NavLink>
          <NavLink to="/claims" className={navLinkClass}>
            <Icons.Menu size={16} />
            {"My claims"}
          </NavLink>
          <NavLink to="/users" className={navLinkClass}>
            <Icons.User size={16} />
            {"Users"}
          </NavLink>
        </nav>
      </aside>
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<AppShellLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/claims" element={<Claims />} />
        <Route path="/claim-edit" element={<ClaimEdit />} />
        <Route path="/claim-detail" element={<ClaimDetail />} />
        <Route path="/users" element={<Users />} />
      </Route>
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="*" element={<Navigate to="/sign-in" replace />} />
    </Routes>
  );
}
