// @ts-nocheck -- generated from the approved design under its JS runtime contract; not hand-written TypeScript.
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import * as UI from "@/lib/ui";
import { Icons } from "@/lib/icons";
import { brand } from "@/lib/brand";
import { useNavigate } from "@/lib/navigate";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Button, Input, Label, Select, Badge, Table, THead, TBody, TR, TH, TD } = UI;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Edit } = Icons;

const CATEGORIES = ["Travel", "Meals", "Equipment", "Other"];

const INITIAL_LINES = [
  {
    id: 1,
    date: "2026-11-03",
    category: "Travel",
    amount: "68.40",
    description: "Return train, Manchester Piccadilly for Northgate client visit",
  },
  {
    id: 2,
    date: "2026-11-04",
    category: "Meals",
    amount: "42.90",
    description: "Working lunch with Northgate procurement team (3 people)",
  },
  {
    id: 3,
    date: "2026-11-05",
    category: "Travel",
    amount: "31.00",
    description: "Taxi from Euston to office after late train",
  },
];

const AMOUNT_RE = /^\d+(\.\d{1,2})?$/;

function toCents(v) {
  const n = parseFloat(String(v).trim());
  if (!AMOUNT_RE.test(String(v).trim()) || !isFinite(n) || n <= 0) return 0;
  return Math.round(n * 100);
}

function money(cents) {
  return (
    "£" +
    (cents / 100).toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  );
}

function validateLine(l) {
  const e = {};
  if (!l.date) e.date = "Pick the date you spent it";
  if (!l.category) e.category = "Choose a category";
  const a = String(l.amount).trim();
  if (!a) e.amount = "Enter an amount";
  else if (!/^-?\d*\.?\d+$|^-?\d+\.$/.test(a)) e.amount = "Numbers only, like 12.50";
  else if (parseFloat(a) <= 0) e.amount = "Must be more than £0.00";
  else if (!AMOUNT_RE.test(a)) e.amount = "Two decimal places at most";
  if (!l.description.trim()) e.description = "Say what it was for";
  return e;
}

export default function Screen() {
  const navigate = useNavigate();
  const [title, setTitle] = React.useState("Northgate client visit – November");
  const [lines, setLines] = React.useState(INITIAL_LINES);
  const [attempted, setAttempted] = React.useState(false);
  const [announce, setAnnounce] = React.useState("");
  const [focusId, setFocusId] = React.useState(null);
  const nextId = React.useRef(4);

  const totalCents = lines.reduce((s, l) => s + toCents(l.amount), 0);

  const lineErrors = lines.map(validateLine);
  const titleError = title.trim() ? "" : "Give the claim a title, like “Leeds offsite – Oct”";
  const errorCount =
    (titleError ? 1 : 0) + lineErrors.reduce((s, e) => s + Object.keys(e).length, 0);
  const noLines = lines.length === 0;

  React.useEffect(() => {
    if (focusId != null) {
      const el = document.getElementById("line-date-" + focusId);
      if (el) el.focus();
      setFocusId(null);
    }
  }, [focusId]);

  const updateLine = (id, field, value) =>
    setLines((ls) => ls.map((l) => (l.id === id ? { ...l, [field]: value } : l)));

  const addLine = () => {
    const id = nextId.current++;
    setLines((ls) => [
      ...ls,
      { id, date: "2026-11-09", category: "", amount: "", description: "" },
    ]);
    setFocusId(id);
    setAnnounce("Line added. " + (lines.length + 1) + " lines in this claim.");
  };

  const removeLine = (id, index) => {
    setLines((ls) => ls.filter((l) => l.id !== id));
    setAnnounce(
      "Line " +
        (index + 1) +
        " removed. Total is now " +
        money(totalCents - toCents(lines[index].amount)) +
        ".",
    );
  };

  const saveDraft = () => {
    setAttempted(true);
    if (errorCount === 0 && !noLines) navigate("claim-detail");
    else if (noLines && !titleError) navigate("claim-detail");
  };

  const submitClaim = () => {
    setAttempted(true);
    if (errorCount === 0 && !noLines) navigate("claim-detail");
  };

  const white = "white";
  const muted = brand.neutralColor;
  const gradient = "linear-gradient(135deg, " + brand.primaryColor + ", " + brand.accentColor + ")";
  const hair = "color-mix(in srgb, white 14%, transparent)";
  const glass = {
    backgroundColor: "color-mix(in srgb, white 7%, transparent)",
    border: "1px solid " + hair,
    backdropFilter: "blur(18px)",
    WebkitBackdropFilter: "blur(18px)",
    borderRadius: brand.radius,
  };
  const fieldStyle = (hasErr) => ({
    backgroundColor: "color-mix(in srgb, white 6%, transparent)",
    color: white,
    border:
      "1px solid " + (hasErr ? brand.accentColor : "color-mix(in srgb, white 20%, transparent)"),
    borderRadius: brand.radius,
    minHeight: 44,
    width: "100%",
    padding: "0 12px",
    fontFamily: brand.fontBody,
    fontSize: 15,
    colorScheme: "dark",
  });
  const btnBase = {
    minHeight: 52,
    borderRadius: brand.radius,
    fontFamily: brand.fontBody,
    fontWeight: 700,
    fontSize: 15,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: "0 24px",
    cursor: "pointer",
    width: "100%",
  };

  const FieldError = ({ id, children }) => (
    <p
      id={id}
      className="flex items-start gap-1 mt-1"
      style={{ color: brand.accentColor, fontSize: 13, lineHeight: 1.4 }}
    >
      <Icons.AlertCircle aria-hidden="true" className="w-4 h-4 shrink-0" style={{ marginTop: 1 }} />
      <span>{children}</span>
    </p>
  );

  const showSummary = attempted && (errorCount > 0 || noLines);

  return (
    <div
      className="ce-root"
      style={{
        fontFamily: brand.fontBody,
        color: white,
        backgroundColor: brand.backgroundColor,
        backgroundImage:
          "radial-gradient(60rem 30rem at 85% -10%, color-mix(in srgb, " +
          brand.accentColor +
          " 28%, transparent), transparent 70%), radial-gradient(50rem 28rem at 0% 10%, color-mix(in srgb, " +
          brand.primaryColor +
          " 20%, transparent), transparent 70%)",
        minHeight: "100%",
        padding: "32px 16px 64px",
      }}
    >
      <style>{`
        .ce-root *:focus-visible { outline: 2px solid ${brand.primaryColor}; outline-offset: 2px; }
        .ce-root input::placeholder { color: ${brand.neutralColor}; opacity: .8; }
        .ce-root option { background-color: ${brand.backgroundColor}; color: white; }
        .ce-btn { transition: transform .15s ease, filter .15s ease, box-shadow .2s ease; }
        .ce-btn:hover { filter: brightness(1.12); }
        .ce-btn:active { transform: translateY(1px); }
        .ce-row { animation: ce-row-in .28s ease both; }
        .ce-pop { display: inline-block; animation: ce-pop .35s ease both; }
        .ce-panel { animation: ce-row-in .22s ease both; }
        .ce-remove:hover { background-color: color-mix(in srgb, ${brand.accentColor} 18%, transparent); }
        @keyframes ce-row-in { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: none; } }
        @keyframes ce-pop { 0% { transform: scale(1); } 40% { transform: scale(1.05); } 100% { transform: scale(1); } }
        @media (prefers-reduced-motion: reduce) {
          .ce-row, .ce-pop, .ce-panel { animation: none; }
          .ce-btn { transition: none; }
        }
      `}</style>

      <div className="mx-auto w-full" style={{ maxWidth: 1040 }}>
        {/* Row 1 */}
        <div
          data-wf="b-0-0"
          className="flex flex-wrap items-end justify-between gap-4"
          style={{ marginBottom: 32 }}
        >
          <div>
            <p
              style={{
                color: muted,
                fontSize: 13,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                fontWeight: 600,
              }}
            >
              Claim CLM-0412
            </p>
            <h1
              style={{
                fontFamily: brand.fontHeading,
                fontSize: 40,
                fontWeight: 800,
                lineHeight: 1.1,
                marginTop: 4,
              }}
            >
              Edit claim
            </h1>
            <p style={{ color: muted, fontSize: 15, marginTop: 8, maxWidth: 560, lineHeight: 1.5 }}>
              Drafts stay editable. Once you submit, the claim and its lines are locked and go to
              your manager.
            </p>
          </div>
          <Badge
            style={{
              ...glass,
              borderRadius: 999,
              color: brand.primaryColor,
              padding: "6px 14px",
              fontSize: 13,
              fontWeight: 700,
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <Icons.Edit aria-hidden="true" className="w-4 h-4" />
            Status: Draft
          </Badge>
        </div>

        {/* Row 2 */}
        <div data-wf="b-1-0" style={{ ...glass, padding: 24, marginBottom: 24 }}>
          <Label
            htmlFor="claim-title"
            style={{
              color: white,
              fontWeight: 700,
              fontSize: 15,
              display: "block",
              marginBottom: 8,
            }}
          >
            Claim title
          </Label>
          <Input
            id="claim-title"
            value={title}
            maxLength={120}
            onChange={(e) => setTitle(e.target.value)}
            aria-invalid={attempted && !!titleError}
            aria-describedby={attempted && titleError ? "title-err" : "title-help"}
            style={{
              ...fieldStyle(attempted && !!titleError),
              minHeight: 52,
              fontSize: 18,
              fontWeight: 600,
            }}
          />
          {attempted && titleError ? (
            <FieldError id="title-err">{titleError}</FieldError>
          ) : (
            <p id="title-help" style={{ color: muted, fontSize: 13, marginTop: 8 }}>
              Approvers see this first, so make it recognisable.
            </p>
          )}
        </div>

        {/* Row 3 */}
        <div data-wf="b-2-0" style={{ ...glass, marginBottom: 24, overflow: "hidden" }}>
          <div className="flex items-center justify-between" style={{ padding: "20px 24px 12px" }}>
            <h2 style={{ fontSize: 20, fontWeight: 700 }}>Claim lines</h2>
            <span style={{ color: muted, fontSize: 13, fontVariantNumeric: "tabular-nums" }}>
              {lines.length} {lines.length === 1 ? "line" : "lines"}
            </span>
          </div>
          <div style={{ overflowX: "auto" }}>
            <Table
              style={{
                minWidth: 820,
                width: "100%",
                borderCollapse: "collapse",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              <THead>
                <TR style={{ borderTop: "1px solid " + hair, borderBottom: "1px solid " + hair }}>
                  {[
                    ["i-2-0-0", "Date", 160],
                    ["i-2-0-1", "Category", 170],
                    ["i-2-0-2", "Amount (GBP)", 160],
                    ["i-2-0-3", "Description", null],
                  ].map(([id, label, w]) => (
                    <TH
                      key={id}
                      data-wf={id}
                      scope="col"
                      style={{
                        textAlign: "left",
                        padding: "12px 8px 12px 24px",
                        color: muted,
                        fontSize: 12,
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        width: w || "auto",
                      }}
                    >
                      {label}
                    </TH>
                  ))}
                  <TH
                    scope="col"
                    style={{
                      textAlign: "right",
                      padding: "12px 24px 12px 8px",
                      color: muted,
                      fontSize: 12,
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      width: 120,
                    }}
                  >
                    Remove
                  </TH>
                </TR>
              </THead>
              <TBody>
                {lines.map((l, i) => {
                  const err = attempted ? lineErrors[i] : {};
                  const n = i + 1;
                  return (
                    <TR
                      key={l.id}
                      className="ce-row"
                      style={{
                        borderBottom: "1px solid color-mix(in srgb, white 10%, transparent)",
                        verticalAlign: "top",
                      }}
                    >
                      <TD style={{ padding: "16px 8px 16px 24px" }}>
                        <input
                          id={"line-date-" + l.id}
                          type="date"
                          aria-label={"Date, line " + n}
                          value={l.date}
                          onChange={(e) => updateLine(l.id, "date", e.target.value)}
                          aria-invalid={!!err.date}
                          aria-describedby={err.date ? "err-date-" + l.id : undefined}
                          style={fieldStyle(!!err.date)}
                        />
                        {err.date && <FieldError id={"err-date-" + l.id}>{err.date}</FieldError>}
                      </TD>
                      <TD style={{ padding: "16px 8px" }}>
                        <Select
                          aria-label={"Category, line " + n}
                          value={l.category}
                          onChange={(e) => updateLine(l.id, "category", e.target.value)}
                          aria-invalid={!!err.category}
                          aria-describedby={err.category ? "err-cat-" + l.id : undefined}
                          style={fieldStyle(!!err.category)}
                        >
                          <option value="">Choose…</option>
                          {CATEGORIES.map((c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          ))}
                        </Select>
                        {err.category && (
                          <FieldError id={"err-cat-" + l.id}>{err.category}</FieldError>
                        )}
                      </TD>
                      <TD style={{ padding: "16px 8px" }}>
                        <div style={{ position: "relative" }}>
                          <span
                            aria-hidden="true"
                            style={{
                              position: "absolute",
                              left: 12,
                              top: 0,
                              height: 44,
                              display: "flex",
                              alignItems: "center",
                              color: muted,
                              fontWeight: 600,
                            }}
                          >
                            £
                          </span>
                          <input
                            type="text"
                            inputMode="decimal"
                            aria-label={"Amount in GBP, line " + n}
                            placeholder="0.00"
                            value={l.amount}
                            onChange={(e) => updateLine(l.id, "amount", e.target.value)}
                            aria-invalid={!!err.amount}
                            aria-describedby={err.amount ? "err-amt-" + l.id : undefined}
                            style={{
                              ...fieldStyle(!!err.amount),
                              paddingLeft: 28,
                              textAlign: "right",
                              fontVariantNumeric: "tabular-nums",
                              fontWeight: 600,
                            }}
                          />
                        </div>
                        {err.amount && <FieldError id={"err-amt-" + l.id}>{err.amount}</FieldError>}
                      </TD>
                      <TD style={{ padding: "16px 8px" }}>
                        <input
                          type="text"
                          aria-label={"Description, line " + n}
                          placeholder="What was this for?"
                          value={l.description}
                          onChange={(e) => updateLine(l.id, "description", e.target.value)}
                          aria-invalid={!!err.description}
                          aria-describedby={err.description ? "err-desc-" + l.id : undefined}
                          style={fieldStyle(!!err.description)}
                        />
                        {err.description && (
                          <FieldError id={"err-desc-" + l.id}>{err.description}</FieldError>
                        )}
                      </TD>
                      <TD style={{ padding: "16px 24px 16px 8px", textAlign: "right" }}>
                        <Button
                          data-wf="i-2-0-4"
                          type="button"
                          className="ce-btn ce-remove"
                          onClick={() => removeLine(l.id, i)}
                          aria-label={
                            "Remove line " +
                            n +
                            (l.description ? ": " + l.description.slice(0, 40) : "")
                          }
                          style={{
                            minHeight: 44,
                            padding: "0 12px",
                            borderRadius: brand.radius,
                            border: "1px solid " + hair,
                            backgroundColor: "transparent",
                            color: white,
                            fontSize: 14,
                            fontWeight: 600,
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 6,
                            cursor: "pointer",
                          }}
                        >
                          <Icons.Trash aria-hidden="true" className="w-4 h-4" />
                          Remove
                        </Button>
                      </TD>
                    </TR>
                  );
                })}
              </TBody>
            </Table>
          </div>
          {noLines && (
            <div className="ce-panel" style={{ padding: "40px 24px", textAlign: "center" }}>
              <p style={{ fontSize: 18, fontWeight: 700 }}>No lines yet</p>
              <p style={{ color: muted, fontSize: 15, marginTop: 8, lineHeight: 1.5 }}>
                Add one line for each thing you paid for: the date, a category, the amount in pounds
                and what it was.
              </p>
            </div>
          )}
        </div>

        {/* Row 4 */}
        <div
          className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
          style={{ marginBottom: 32 }}
        >
          <Button
            data-wf="b-3-0"
            type="button"
            className="ce-btn md:col-span-4"
            onClick={addLine}
            style={{
              ...btnBase,
              backgroundColor: "color-mix(in srgb, " + brand.primaryColor + " 14%, transparent)",
              color: brand.primaryColor,
              border: "1px solid " + brand.primaryColor,
            }}
          >
            <Icons.Plus aria-hidden="true" className="w-5 h-5" />
            Add line
          </Button>
          <div
            data-wf="b-3-1"
            className="md:col-span-8 md:text-right"
            aria-live="polite"
            style={{ fontVariantNumeric: "tabular-nums" }}
          >
            <span style={{ color: muted, fontSize: 16, fontWeight: 600, marginRight: 12 }}>
              Total:
            </span>
            <span
              key={totalCents}
              className="ce-pop"
              style={{
                fontSize: 48,
                fontWeight: 800,
                lineHeight: 1,
                backgroundImage: gradient,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                WebkitTextFillColor: "transparent",
                filter:
                  "drop-shadow(0 0 24px color-mix(in srgb, " +
                  brand.accentColor +
                  " 55%, transparent))",
              }}
            >
              {money(totalCents)}
            </span>
          </div>
        </div>

        <p className="sr-only" role="status" aria-live="polite">
          {announce}
        </p>

        {/* Validation summary */}
        {showSummary && (
          <div
            role="alert"
            className="ce-panel flex items-start gap-3"
            style={{ ...glass, borderColor: brand.accentColor, padding: 16, marginBottom: 16 }}
          >
            <Icons.AlertCircle
              aria-hidden="true"
              className="w-5 h-5 shrink-0"
              style={{ color: brand.accentColor, marginTop: 2 }}
            />
            <p style={{ fontSize: 15, lineHeight: 1.5 }}>
              {noLines
                ? "This claim has no lines yet. Add at least one line before you submit it."
                : errorCount +
                  (errorCount === 1 ? " field needs" : " fields need") +
                  " fixing before this claim can be saved. Your entries are still here."}
            </p>
          </div>
        )}

        {/* Row 5 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Button
            data-wf="b-4-0"
            type="button"
            className="ce-btn"
            onClick={() => navigate("claims")}
            style={{
              ...btnBase,
              backgroundColor: "transparent",
              color: brand.accentColor,
              border: "1px solid " + brand.accentColor,
            }}
          >
            <Icons.Trash aria-hidden="true" className="w-4 h-4" />
            Delete draft
          </Button>
          <Button
            data-wf="b-4-1"
            type="button"
            className="ce-btn"
            onClick={saveDraft}
            style={{
              ...btnBase,
              ...glass,
              borderRadius: brand.radius,
              minHeight: 52,
              color: white,
            }}
          >
            Save draft
          </Button>
          <Button
            data-wf="b-4-2"
            type="button"
            className="ce-btn"
            onClick={submitClaim}
            style={{
              ...btnBase,
              backgroundImage: gradient,
              backgroundColor: brand.primaryColor,
              color: brand.backgroundColor,
              border: "1px solid transparent",
              boxShadow:
                "0 12px 48px color-mix(in srgb, " + brand.accentColor + " 45%, transparent)",
            }}
          >
            Submit claim
            <Icons.ArrowRight aria-hidden="true" className="w-4 h-4" />
          </Button>
        </div>
        <p style={{ color: muted, fontSize: 13, marginTop: 16, lineHeight: 1.5 }}>
          Submitting locks the claim and sends it to your manager for approval. Over-limit lines
          don’t block submission.
        </p>
      </div>
    </div>
  );
}
