// @ts-nocheck -- generated from the approved design under its JS runtime contract; not hand-written TypeScript.
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import * as UI from "@/lib/ui";
import { Icons } from "@/lib/icons";
import { brand } from "@/lib/brand";
import { useNavigate } from "@/lib/navigate";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Button, Table, THead, TBody, TR, TH, TD, Empty } = UI;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Check, X, FileText, Clock, Edit, AlertCircle, CheckCircle } = Icons;

const VIEWER = {
  id: "u-104",
  full_name: "Priya Nair",
  role: "Employee",
  manager: "Dana Whitcombe",
};

const CLAIM = {
  id: "CLM-0412",
  owner_id: "u-104",
  owner_name: "Priya Nair",
  title: "Client visit – London",
  status: "Draft",
  created_at: "2026-10-26",
  lines: [
    {
      id: "l-1",
      line_date: "2026-10-27",
      category: "Travel",
      limit: 150,
      amount: 68.5,
      description: "Train, Leeds – London King's Cross, return",
      receipt_filename: null,
      receipt_size: null,
    },
    {
      id: "l-2",
      line_date: "2026-10-27",
      category: "Meals",
      limit: 35,
      amount: 41.8,
      description: "Client lunch with Harlow & Finch, Soho",
      receipt_filename: "lunch-soho-27oct.jpg",
      receipt_size: "0.8 MB",
    },
    {
      id: "l-3",
      line_date: "2026-10-28",
      category: "Travel",
      limit: 150,
      amount: 32.0,
      description: "Taxi, King's Cross – client office",
      receipt_filename: "taxi-28oct.pdf",
      receipt_size: "0.2 MB",
    },
  ],
  decisions: [
    {
      id: "d-1",
      step: "Manager",
      decision: "rejected",
      actor_name: "Dana Whitcombe",
      comment: "Please add the train receipt.",
      created_at: "2026-11-03",
    },
  ],
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function fmtDate(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return d + " " + MONTHS[m - 1] + " " + y;
}
const gbp = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" });

function validateForSubmit(lines) {
  if (lines.length === 0)
    return "This claim has no lines yet. Add at least one line in the editor before submitting.";
  const bad = lines.find((l) => !(l.amount > 0) || !l.description || !l.line_date || !l.category);
  if (bad) return "One of your lines is incomplete. Open the editor and fix it, then submit again.";
  return null;
}

export default function Screen() {
  const navigate = useNavigate();
  const [status, setStatus] = React.useState(CLAIM.status);
  const [phase, setPhase] = React.useState("idle");
  const [error, setError] = React.useState(null);
  const [history, setHistory] = React.useState(CLAIM.decisions);
  const [submittedOn, setSubmittedOn] = React.useState(null);
  const timer = React.useRef(null);

  React.useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const lines = CLAIM.lines;
  const total = lines.reduce((s, l) => s + l.amount, 0);
  const isDraft = status === "Draft";
  const submitting = phase === "submitting";
  const overCount = lines.filter((l) => l.limit != null && l.amount > l.limit).length;

  const glass = {
    backgroundColor: "rgba(255,255,255,0.07)",
    border: "1px solid rgba(255,255,255,0.14)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    borderRadius: brand.radius,
  };
  const textMain = "rgba(255,255,255,0.94)";
  const gradient = "linear-gradient(120deg, " + brand.primaryColor + ", " + brand.accentColor + ")";

  function handleSubmit() {
    if (!isDraft || submitting) return;
    const problem = validateForSubmit(lines);
    if (problem) {
      setError(problem);
      setPhase("idle");
      return;
    }
    setError(null);
    setPhase("submitting");
    timer.current = setTimeout(() => {
      setStatus("Submitted");
      setSubmittedOn("2026-11-09");
      setPhase("submitted");
    }, 800);
  }

  // Permission-denied: an Employee may only open their own claims (US-008)
  if (VIEWER.role === "Employee" && CLAIM.owner_id !== VIEWER.id) {
    return (
      <div className="px-4 py-8 md:px-8" style={{ color: textMain, fontFamily: brand.fontBody }}>
        <div style={{ ...glass, padding: 32 }}>
          <Empty
            title="This claim isn't yours to open"
            description="Employees can only see their own claims. If you think you should have access, ask your manager or Finance to check your role."
            action={<Button onClick={() => navigate("claims")}>Back to My claims</Button>}
          />
        </div>
      </div>
    );
  }

  const statusLabel = status;

  return (
    <div
      className="cd-root px-4 py-8 md:px-8 md:py-12"
      style={{
        minHeight: "100%",
        color: textMain,
        fontFamily: brand.fontBody,
        backgroundColor: brand.backgroundColor,
        backgroundImage:
          "radial-gradient(700px 420px at 12% -5%, " +
          brand.primaryColor +
          "26, transparent 70%), radial-gradient(640px 420px at 95% 8%, " +
          brand.accentColor +
          "2e, transparent 70%)",
      }}
    >
      <style>{`
        .cd-root .cd-focus:focus-visible { outline: 2px solid ${brand.primaryColor}; outline-offset: 3px; }
        .cd-root .cd-btn { transition: transform .18s ease, box-shadow .25s ease, background-color .2s ease, opacity .2s ease; min-height: 48px; }
        .cd-root .cd-btn:not(:disabled):hover { transform: translateY(-1px); }
        .cd-root .cd-btn:not(:disabled):active { transform: translateY(0); }
        .cd-root .cd-btn:disabled { cursor: not-allowed; opacity: .55; }
        .cd-root .cd-primary:not(:disabled):hover { box-shadow: 0 0 56px ${brand.accentColor}80; }
        .cd-root .cd-ghost:not(:disabled):hover { background-color: rgba(255,255,255,0.14); }
        .cd-root .cd-row:hover td { background-color: rgba(255,255,255,0.04); }
        @keyframes cd-enter { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
        @keyframes cd-spin { to { transform: rotate(360deg); } }
        .cd-root .cd-enter { animation: cd-enter .4s ease both; }
        .cd-root .cd-spin { animation: cd-spin .8s linear infinite; }
        @media (prefers-reduced-motion: reduce) {
          .cd-root .cd-enter, .cd-root .cd-spin { animation: none; }
          .cd-root .cd-btn { transition: none; }
        }
      `}</style>

      <div className="mx-auto" style={{ maxWidth: 1040 }}>
        <div className="grid grid-cols-12 gap-x-6 gap-y-8">
          {/* Row 1 */}
          <div data-wf="b-0-0" className="col-span-12 md:col-span-8">
            <p
              style={{
                color: brand.neutralColor,
                fontSize: 13,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              {CLAIM.id} · Created {fmtDate(CLAIM.created_at)} · {CLAIM.owner_name}
            </p>
            <h1
              style={{
                fontFamily: brand.fontHeading,
                fontSize: 40,
                lineHeight: 1.1,
                fontWeight: 800,
                letterSpacing: "-0.02em",
              }}
            >
              {CLAIM.title}
            </h1>
          </div>
          <div
            data-wf="b-0-1"
            className="col-span-12 md:col-span-4 flex md:justify-end items-start"
          >
            <p className="flex items-center gap-3" style={{ fontSize: 16 }}>
              <span style={{ color: brand.neutralColor }}>Status:</span>
              <span
                className="inline-flex items-center gap-2"
                style={{
                  padding: "8px 16px",
                  borderRadius: 999,
                  fontWeight: 700,
                  fontSize: 14,
                  transition: "all .3s ease",
                  color: isDraft ? textMain : brand.backgroundColor,
                  background: isDraft ? "rgba(255,255,255,0.1)" : gradient,
                  border: "1px solid " + (isDraft ? "rgba(255,255,255,0.28)" : "transparent"),
                  boxShadow: isDraft ? "none" : "0 0 40px " + brand.primaryColor + "66",
                }}
              >
                {isDraft ? (
                  <Edit className="w-4 h-4" aria-hidden="true" />
                ) : (
                  <Clock className="w-4 h-4" aria-hidden="true" />
                )}
                {statusLabel}
              </span>
            </p>
          </div>

          {/* Live announcements + banners */}
          <div className="col-span-12" style={{ marginTop: -8 }} aria-live="polite">
            {phase === "submitted" && (
              <div
                className="cd-enter flex items-start gap-3"
                style={{ ...glass, padding: 16, borderColor: brand.primaryColor }}
              >
                <CheckCircle
                  className="w-5 h-5 shrink-0"
                  style={{ color: brand.primaryColor, marginTop: 2 }}
                  aria-hidden="true"
                />
                <p style={{ fontSize: 15, lineHeight: 1.5 }}>
                  <strong>Submitted on {fmtDate(submittedOn)}.</strong> It's now waiting for{" "}
                  {VIEWER.manager} to review. The claim and its receipts are read-only.
                </p>
              </div>
            )}
            {error && (
              <div
                role="alert"
                className="cd-enter flex items-start gap-3"
                style={{ ...glass, padding: 16, borderColor: brand.accentColor }}
              >
                <AlertCircle
                  className="w-5 h-5 shrink-0"
                  style={{ color: brand.accentColor, marginTop: 2 }}
                  aria-hidden="true"
                />
                <p style={{ fontSize: 15, lineHeight: 1.5 }}>
                  <strong>Not submitted.</strong> {error}
                </p>
              </div>
            )}
            {isDraft &&
              !error &&
              phase === "idle" &&
              history.some((h) => h.decision === "rejected") && (
                <div className="flex items-start gap-3" style={{ ...glass, padding: 16 }}>
                  <AlertCircle
                    className="w-5 h-5 shrink-0"
                    style={{ color: brand.accentColor, marginTop: 2 }}
                    aria-hidden="true"
                  />
                  <p style={{ fontSize: 15, lineHeight: 1.5 }}>
                    Sent back to you as a draft. Fix what {history[history.length - 1].actor_name}{" "}
                    asked for, then submit again — it will start at manager approval.
                  </p>
                </div>
              )}
          </div>

          {/* Row 2 */}
          <section
            data-wf="b-1-0"
            className="col-span-12"
            aria-labelledby="lines-h"
            style={{ ...glass, padding: 24 }}
          >
            <div
              className="flex items-baseline justify-between gap-4 flex-wrap"
              style={{ marginBottom: 16 }}
            >
              <h2 id="lines-h" style={{ fontSize: 24, fontWeight: 700 }}>
                Lines
              </h2>
              <p style={{ color: brand.neutralColor, fontSize: 13 }}>
                {lines.length} {lines.length === 1 ? "line" : "lines"}
                {overCount > 0 ? " · " + overCount + " over category limit" : ""}
              </p>
            </div>
            {lines.length === 0 ? (
              <Empty
                title="No lines on this claim yet"
                description="A claim needs at least one line before it can be submitted. Open the editor to add your first expense."
                action={<Button onClick={() => navigate("claim-edit")}>Add a line</Button>}
              />
            ) : (
              <div className="overflow-x-auto">
                <Table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  <THead>
                    <TR>
                      {[
                        ["i-1-0-0", "Date", "left"],
                        ["i-1-0-1", "Category", "left"],
                        ["i-1-0-2", "Description", "left"],
                        ["i-1-0-3", "Amount (GBP)", "right"],
                      ].map(([id, label, align]) => (
                        <TH
                          key={id}
                          data-wf={id}
                          scope="col"
                          style={{
                            textAlign: align,
                            padding: "8px 16px 12px",
                            fontSize: 12,
                            fontWeight: 600,
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            color: brand.neutralColor,
                            borderBottom: "1px solid rgba(255,255,255,0.14)",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {label}
                        </TH>
                      ))}
                    </TR>
                  </THead>
                  <TBody>
                    {lines.map((l) => {
                      const over = l.limit != null && l.amount > l.limit;
                      const cell = {
                        padding: "16px",
                        verticalAlign: "top",
                        borderBottom: "1px solid rgba(255,255,255,0.1)",
                        fontSize: 15,
                        lineHeight: 1.5,
                      };
                      return (
                        <TR key={l.id} className="cd-row">
                          <TD
                            style={{
                              ...cell,
                              whiteSpace: "nowrap",
                              fontVariantNumeric: "tabular-nums",
                            }}
                          >
                            {fmtDate(l.line_date)}
                          </TD>
                          <TD style={cell}>
                            <span>{l.category}</span>
                            {over && (
                              <span
                                className="flex items-center gap-1"
                                style={{
                                  marginTop: 8,
                                  width: "fit-content",
                                  padding: "4px 12px",
                                  borderRadius: 999,
                                  fontSize: 12,
                                  fontWeight: 700,
                                  color: brand.backgroundColor,
                                  backgroundColor: brand.accentColor,
                                  whiteSpace: "nowrap",
                                }}
                              >
                                <AlertCircle className="w-3 h-3" aria-hidden="true" />
                                Over {gbp.format(l.limit)} limit
                              </span>
                            )}
                          </TD>
                          <TD style={cell}>
                            <span>{l.description}</span>
                            <span
                              className="flex items-center gap-2"
                              style={{
                                marginTop: 4,
                                fontSize: 13,
                                color: l.receipt_filename ? brand.neutralColor : brand.accentColor,
                              }}
                            >
                              {l.receipt_filename ? (
                                <>
                                  <FileText className="w-4 h-4" aria-hidden="true" />
                                  Receipt: {l.receipt_filename} ({l.receipt_size})
                                </>
                              ) : (
                                <>
                                  <AlertCircle className="w-4 h-4" aria-hidden="true" />
                                  No receipt attached
                                </>
                              )}
                            </span>
                          </TD>
                          <TD
                            style={{
                              ...cell,
                              textAlign: "right",
                              whiteSpace: "nowrap",
                              fontWeight: 600,
                              fontVariantNumeric: "tabular-nums",
                            }}
                          >
                            {gbp.format(l.amount)}
                            {over && (
                              <span
                                style={{
                                  display: "block",
                                  fontSize: 12,
                                  fontWeight: 400,
                                  color: brand.neutralColor,
                                }}
                              >
                                +{gbp.format(l.amount - l.limit)} over
                              </span>
                            )}
                          </TD>
                        </TR>
                      );
                    })}
                  </TBody>
                </Table>
              </div>
            )}
          </section>

          {/* Row 3 */}
          <div
            data-wf="b-2-0"
            className="col-span-12 flex items-baseline justify-between gap-4 flex-wrap"
            style={{ padding: "0 8px" }}
          >
            <p style={{ fontSize: 14, color: brand.neutralColor, maxWidth: 420 }}>
              Over-limit lines are flagged for your approver. They don't block submission.
            </p>
            <p style={{ fontVariantNumeric: "tabular-nums" }}>
              <span
                style={{
                  fontSize: 18,
                  fontWeight: 600,
                  color: brand.neutralColor,
                  marginRight: 16,
                }}
              >
                Total:
              </span>
              <span
                style={{
                  fontSize: 56,
                  fontWeight: 800,
                  lineHeight: 1,
                  letterSpacing: "-0.03em",
                  textShadow: "0 0 48px " + brand.primaryColor + "88",
                }}
              >
                {gbp.format(total)}
              </span>
            </p>
          </div>

          {/* Row 4 */}
          <section
            data-wf="b-3-0"
            className="col-span-12"
            aria-labelledby="hist-h"
            style={{ ...glass, padding: 24 }}
          >
            <h2 id="hist-h" style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>
              Decision history
            </h2>
            {history.length === 0 ? (
              <p style={{ color: brand.neutralColor, fontSize: 15 }}>
                No decisions yet. Approvers' decisions and comments will appear here.
              </p>
            ) : (
              <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                {history.map((h, idx) => (
                  <li
                    key={h.id}
                    data-wf={idx === 0 ? "i-3-0-0" : undefined}
                    className="cd-enter flex gap-4"
                    style={{
                      padding: "16px 0",
                      borderTop: idx === 0 ? "none" : "1px solid rgba(255,255,255,0.12)",
                    }}
                  >
                    <span
                      className="flex items-center justify-center shrink-0"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 999,
                        backgroundColor: brand.accentColor + "26",
                        border: "1px solid " + brand.accentColor,
                      }}
                    >
                      {h.decision === "rejected" ? (
                        <X
                          className="w-5 h-5"
                          style={{ color: brand.accentColor }}
                          aria-hidden="true"
                        />
                      ) : (
                        <Check
                          className="w-5 h-5"
                          style={{ color: brand.primaryColor }}
                          aria-hidden="true"
                        />
                      )}
                    </span>
                    <div>
                      <p style={{ fontSize: 16, fontWeight: 700 }}>
                        {h.step} {h.decision}{" "}
                        <span style={{ color: brand.neutralColor, fontWeight: 400 }}>
                          – {fmtDate(h.created_at)}
                        </span>
                      </p>
                      <p style={{ fontSize: 15, lineHeight: 1.5, marginTop: 4 }}>“{h.comment}”</p>
                      <p style={{ fontSize: 13, color: brand.neutralColor, marginTop: 4 }}>
                        {h.actor_name}, {h.step.toLowerCase()} approval
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* Row 5 */}
          <div data-wf="b-4-0" className="col-span-12 md:col-span-6 flex items-center gap-3">
            <span
              className="flex items-center justify-center shrink-0"
              style={{
                width: 40,
                height: 40,
                borderRadius: 999,
                backgroundColor: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.14)",
              }}
            >
              <Clock
                className="w-5 h-5"
                style={{ color: isDraft ? brand.neutralColor : brand.primaryColor }}
                aria-hidden="true"
              />
            </span>
            <p
              style={{
                fontSize: 15,
                lineHeight: 1.5,
                color: isDraft ? brand.neutralColor : textMain,
                fontWeight: isDraft ? 400 : 600,
              }}
            >
              Submitted claims are locked and cannot be edited.
            </p>
          </div>
          <div className="col-span-12 md:col-span-3">
            <Button
              data-wf="b-4-1"
              type="button"
              className="cd-btn cd-ghost cd-focus w-full flex items-center justify-center gap-2"
              disabled={!isDraft || submitting}
              onClick={() => navigate("claim-edit")}
              style={{
                borderRadius: brand.radius,
                border: "1px solid rgba(255,255,255,0.28)",
                backgroundColor: "rgba(255,255,255,0.07)",
                color: textMain,
                fontWeight: 600,
                fontSize: 15,
                padding: "12px 16px",
              }}
            >
              <Edit className="w-4 h-4" aria-hidden="true" />
              Edit draft
            </Button>
          </div>
          <div className="col-span-12 md:col-span-3">
            <Button
              data-wf="b-4-2"
              type="button"
              className="cd-btn cd-primary cd-focus w-full flex items-center justify-center gap-2"
              disabled={!isDraft || submitting}
              onClick={handleSubmit}
              style={{
                borderRadius: brand.radius,
                border: "1px solid transparent",
                background: gradient,
                color: brand.backgroundColor,
                fontWeight: 800,
                fontSize: 15,
                padding: "12px 16px",
                boxShadow: "0 0 48px " + brand.accentColor + "55",
              }}
            >
              {submitting ? (
                <svg
                  className="cd-spin"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  aria-hidden="true"
                >
                  <path d="M12 3a9 9 0 1 0 9 9" strokeLinecap="round" />
                </svg>
              ) : (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M22 2 11 13" />
                  <path d="M22 2 15 22l-4-9-9-4 20-7Z" />
                </svg>
              )}
              {submitting ? "Submitting…" : phase === "submitted" ? "Submitted" : "Submit claim"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
