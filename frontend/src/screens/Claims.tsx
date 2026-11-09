// @ts-nocheck -- generated from the approved design under its JS runtime contract; not hand-written TypeScript.
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import * as UI from "@/lib/ui";
import { Icons } from "@/lib/icons";
import { brand } from "@/lib/brand";
import { useNavigate } from "@/lib/navigate";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Button, Switch, Table, THead, TBody, TR, TH, TD, Empty } = UI;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Plus, Check, ChevronRight, Bell, Home, Clock, Edit, Filter, ArrowLeft, ArrowRight, AlertCircle, CheckCircle } = Icons;

const CLAIMS = [
  { id: 'CLM-0151', title: 'Offsite supplies — Bristol away day', date: '2026-11-08', lines: 1, total: 58.0, status: 'Draft' },
  { id: 'CLM-0150', title: 'Printer toner and stationery', date: '2026-11-07', lines: 3, total: 46.85, status: 'Submitted' },
  { id: 'CLM-0148', title: 'Lisbon client workshop', date: '2026-11-06', lines: 3, total: 842.3, status: 'Submitted' },
  { id: 'CLM-0146', title: 'Manchester supplier visit', date: '2026-11-04', lines: 2, total: 184.6, status: 'Draft', returned: 'Marcus Bell: please attach the hotel receipt for 2 Nov, then resubmit.' },
  { id: 'CLM-0144', title: 'Team lunch — Q4 planning', date: '2026-11-03', lines: 1, total: 126.4, status: 'Manager approved' },
  { id: 'CLM-0139', title: 'Standing desk and monitor arm', date: '2026-10-29', lines: 2, total: 389.98, status: 'Approved' },
  { id: 'CLM-0136', title: 'Train to Leeds — Northern roadshow', date: '2026-10-24', lines: 4, total: 231.15, status: 'Paid' },
  { id: 'CLM-0131', title: 'Conference ticket — Product Summit', date: '2026-10-17', lines: 1, total: 495.0, status: 'Paid' },
  { id: 'CLM-0129', title: 'Client dinner — Halden account', date: '2026-10-14', lines: 1, total: 168.75, status: 'Approved' },
  { id: 'CLM-0124', title: 'Taxi receipts, October', date: '2026-10-09', lines: 5, total: 97.2, status: 'Paid' },
  { id: 'CLM-0120', title: 'USB-C dock for home office', date: '2026-10-02', lines: 1, total: 74.99, status: 'Manager approved' },
  { id: 'CLM-0112', title: 'Airport transfers — Edinburgh', date: '2026-09-26', lines: 2, total: 112.4, status: 'Paid' },
];

const TABS = ['All', 'Draft', 'Submitted', 'Manager approved', 'Approved', 'Paid'];

const gbp = (n) => new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(n);
const fmtDate = (iso) =>
  new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(new Date(iso + 'T00:00:00Z'));

export default function Screen() {
  const navigate = useNavigate();
  const [active, setActive] = React.useState('All');
  const [loading, setLoading] = React.useState(true);
  const [claims] = React.useState(CLAIMS);
  const tabRefs = React.useRef([]);

  React.useEffect(() => {
    const t = setTimeout(() => setLoading(false), 650);
    return () => clearTimeout(t);
  }, []);

  const countFor = (s) => (s === 'All' ? claims.length : claims.filter((c) => c.status === s).length);
  const rows = claims
    .filter((c) => active === 'All' || c.status === active)
    .slice()
    .sort((a, b) => (a.date < b.date ? 1 : -1));
  const inReview = claims
    .filter((c) => c.status === 'Submitted' || c.status === 'Manager approved')
    .reduce((s, c) => s + c.total, 0);
  const inReviewCount = claims.filter((c) => c.status === 'Submitted' || c.status === 'Manager approved').length;

  const glow = (c, p) => `color-mix(in srgb, ${c} ${p}%, transparent)`;
  const gradient = `linear-gradient(120deg, ${brand.primaryColor}, ${brand.accentColor})`;

  const statusMeta = {
    Draft: { icon: Edit, style: { color: brand.neutralColor, border: `1px solid ${glow(brand.neutralColor, 55)}`, background: 'transparent' } },
    Submitted: { icon: Clock, style: { color: brand.primaryColor, border: `1px solid ${glow(brand.primaryColor, 60)}`, background: glow(brand.primaryColor, 10) } },
    'Manager approved': { icon: Check, style: { color: brand.accentColor, border: `1px solid ${glow(brand.accentColor, 60)}`, background: glow(brand.accentColor, 12) } },
    Approved: { icon: CheckCircle, style: { color: brand.backgroundColor, border: `1px solid ${brand.primaryColor}`, background: brand.primaryColor } },
    Paid: { icon: CheckCircle, style: { color: brand.backgroundColor, border: `1px solid ${brand.accentColor}`, background: brand.accentColor } },
  };

  const StatusPill = ({ status }) => {
    const m = statusMeta[status];
    const I = m.icon;
    return (
      <span className="inline-flex items-center gap-2 whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold" style={m.style}>
        <I className="h-3 w-3" aria-hidden="true" />
        {status}
      </span>
    );
  };

  const onTabKey = (e, i) => {
    let n = null;
    if (e.key === 'ArrowRight') n = (i + 1) % TABS.length;
    if (e.key === 'ArrowLeft') n = (i - 1 + TABS.length) % TABS.length;
    if (e.key === 'Home') n = 0;
    if (e.key === 'End') n = TABS.length - 1;
    if (n !== null) {
      e.preventDefault();
      setActive(TABS[n]);
      tabRefs.current[n] && tabRefs.current[n].focus();
    }
  };

  const open = () => navigate('claim-detail');

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        fontFamily: brand.fontBody,
        color: 'white',
        background: brand.backgroundColor,
        backgroundImage: `radial-gradient(60rem 28rem at 8% -10%, ${glow(brand.accentColor, 22)}, transparent 70%), radial-gradient(50rem 26rem at 100% 0%, ${glow(brand.primaryColor, 18)}, transparent 70%)`,
        minHeight: '100%',
      }}
    >
      <style>{`
        .mc-focus:focus-visible { outline: 2px solid ${brand.primaryColor}; outline-offset: 3px; }
        .mc-tab { transition: background .2s, color .2s, border-color .2s, box-shadow .2s; }
        .mc-tab:hover { border-color: ${glow(brand.primaryColor, 70)}; color: white; }
        .mc-cta { transition: transform .2s, box-shadow .25s; }
        .mc-cta:hover { transform: translateY(-1px); box-shadow: 0 12px 48px ${glow(brand.accentColor, 55)}; }
        .mc-cta:active { transform: translateY(0); }
        .mc-row { cursor: pointer; transition: background .2s; animation: mcIn .35s ease both; }
        .mc-row:hover, .mc-row:focus-within { background: rgba(255,255,255,.07); }
        .mc-row:hover .mc-chev, .mc-row:focus-within .mc-chev { transform: translateX(3px); color: ${brand.primaryColor}; }
        .mc-chev { transition: transform .2s, color .2s; }
        .mc-skel { animation: mcPulse 1.3s ease-in-out infinite; background: rgba(255,255,255,.09); border-radius: 8px; }
        @keyframes mcIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
        @keyframes mcPulse { 0%,100% { opacity: .45; } 50% { opacity: 1; } }
        @media (prefers-reduced-motion: reduce) {
          .mc-row, .mc-skel { animation: none; }
          .mc-tab, .mc-cta, .mc-chev, .mc-row { transition: none; }
          .mc-cta:hover { transform: none; }
        }
      `}</style>

      <div className="mx-auto w-full max-w-5xl px-4 py-8 md:px-6 md:py-12">
        {/* Row 1 */}
        <div className="grid grid-cols-12 items-end gap-4">
          <div className="col-span-12 md:col-span-8">
            <p className="mb-2 text-xs font-semibold uppercase" style={{ color: brand.neutralColor, letterSpacing: '0.14em' }}>
              Expense claims · only yours
            </p>
            <h1
              data-wf="b-0-0"
              className="font-extrabold"
              style={{ fontFamily: brand.fontHeading, fontSize: 'clamp(2.25rem, 5vw, 3.5rem)', lineHeight: 1.05, letterSpacing: '-0.02em' }}
            >
              My claims
            </h1>
            <p className="mt-3 text-base" style={{ color: brand.neutralColor, fontVariantNumeric: 'tabular-nums' }}>
              <span className="font-bold text-white">{gbp(inReview)}</span> across {inReviewCount} claims waiting on a decision.
            </p>
          </div>
          <div className="col-span-12 flex md:col-span-4 md:justify-end">
            <Button
              data-wf="b-0-1"
              onClick={() => navigate('claim-edit')}
              className="mc-cta mc-focus inline-flex items-center justify-center gap-2 font-bold"
              style={{
                background: gradient,
                color: brand.backgroundColor,
                borderRadius: brand.radius,
                padding: '14px 24px',
                minHeight: 48,
                border: 'none',
                boxShadow: `0 8px 40px ${glow(brand.accentColor, 40)}`,
              }}
            >
              <Plus className="h-5 w-5" aria-hidden="true" />
              New claim
            </Button>
          </div>
        </div>

        {/* Row 2 */}
        <div data-wf="b-1-0" className="mt-8 md:mt-12">
          <div role="tablist" aria-label="Filter by status" className="flex flex-wrap gap-2">
            {TABS.map((t, i) => {
              const on = active === t;
              return (
                <button
                  key={t}
                  ref={(el) => (tabRefs.current[i] = el)}
                  data-wf={`i-1-0-${i}`}
                  role="tab"
                  id={`mc-tab-${i}`}
                  aria-selected={on}
                  aria-controls="mc-panel"
                  tabIndex={on ? 0 : -1}
                  onClick={() => setActive(t)}
                  onKeyDown={(e) => onTabKey(e, i)}
                  className="mc-tab mc-focus inline-flex items-center gap-2 rounded-full px-4 text-sm font-semibold"
                  style={{
                    minHeight: 44,
                    background: on ? gradient : 'rgba(255,255,255,.06)',
                    color: on ? brand.backgroundColor : brand.neutralColor,
                    border: on ? '1px solid transparent' : '1px solid rgba(255,255,255,.14)',
                    boxShadow: on ? `0 6px 32px ${glow(brand.accentColor, 40)}` : 'none',
                  }}
                >
                  {t}
                  <span
                    className="rounded-full px-2 text-xs"
                    style={{
                      fontVariantNumeric: 'tabular-nums',
                      background: on ? glow(brand.backgroundColor, 18) : 'rgba(255,255,255,.08)',
                    }}
                  >
                    {loading ? '–' : countFor(t)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Row 3 */}
        <div
          data-wf="b-2-0"
          id="mc-panel"
          role="tabpanel"
          aria-labelledby={`mc-tab-${TABS.indexOf(active)}`}
          aria-busy={loading}
          className="mt-6 overflow-hidden"
          style={{
            background: 'rgba(255,255,255,.07)',
            border: '1px solid rgba(255,255,255,.14)',
            borderRadius: brand.radius,
            backdropFilter: 'blur(18px)',
            WebkitBackdropFilter: 'blur(18px)',
            boxShadow: `0 24px 80px ${glow(brand.primaryColor, 14)}`,
          }}
        >
          {claims.length === 0 && !loading ? (
            <div className="p-8">
              <Empty
                title="No claims yet"
                description="Start with one receipt. Add lines for each expense, attach receipts, and submit when it's ready for your manager."
                action={
                  <Button onClick={() => navigate('claim-edit')} className="mc-focus" style={{ background: gradient, color: brand.backgroundColor, borderRadius: brand.radius, border: 'none', padding: '12px 20px' }}>
                    Start your first claim
                  </Button>
                }
              />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table className="w-full" style={{ fontVariantNumeric: 'tabular-nums', borderCollapse: 'collapse', minWidth: 640 }}>
                <THead>
                  <TR>
                    {['Title', 'Date', 'Total (GBP)', 'Status'].map((h, i) => (
                      <TH
                        key={h}
                        data-wf={`i-2-0-${i}`}
                        scope="col"
                        className="px-5 py-4 text-xs font-semibold uppercase"
                        style={{
                          color: brand.neutralColor,
                          letterSpacing: '0.1em',
                          textAlign: i === 2 ? 'right' : 'left',
                          borderBottom: '1px solid rgba(255,255,255,.14)',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {h}
                      </TH>
                    ))}
                  </TR>
                </THead>
                <TBody>
                  {loading &&
                    [0, 1, 2, 3, 4].map((k) => (
                      <TR key={k} aria-hidden="true">
                        <TD className="px-5 py-5"><div className="mc-skel h-4" style={{ width: `${60 - k * 5}%` }} /></TD>
                        <TD className="px-5 py-5"><div className="mc-skel h-4 w-24" /></TD>
                        <TD className="px-5 py-5"><div className="mc-skel ml-auto h-4 w-16" /></TD>
                        <TD className="px-5 py-5"><div className="mc-skel h-6 w-28 rounded-full" /></TD>
                      </TR>
                    ))}
                  {!loading &&
                    rows.map((c, idx) => (
                      <TR
                        key={c.id}
                        onClick={open}
                        className="mc-row"
                        style={{ animationDelay: `${Math.min(idx, 8) * 30}ms` }}
                      >
                        <TD className="px-5 py-4" style={{ borderTop: '1px solid rgba(255,255,255,.1)', maxWidth: 380 }}>
                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); open(); }}
                            className="mc-focus rounded text-left text-base font-bold text-white"
                            style={{ background: 'none', border: 'none', padding: 0 }}
                          >
                            {c.title}
                          </button>
                          <div className="mt-1 text-xs" style={{ color: brand.neutralColor }}>
                            {c.id} · {c.lines} {c.lines === 1 ? 'line' : 'lines'}
                          </div>
                          {c.returned && (
                            <div className="mt-2 inline-flex items-start gap-2 text-xs" style={{ color: brand.accentColor }}>
                              <AlertCircle className="mt-0.5 h-3 w-3 shrink-0" aria-hidden="true" />
                              <span>Returned to you — {c.returned}</span>
                            </div>
                          )}
                        </TD>
                        <TD className="whitespace-nowrap px-5 py-4 text-sm" style={{ borderTop: '1px solid rgba(255,255,255,.1)', color: brand.neutralColor }}>
                          {fmtDate(c.date)}
                        </TD>
                        <TD className="whitespace-nowrap px-5 py-4 text-right text-lg font-bold" style={{ borderTop: '1px solid rgba(255,255,255,.1)' }}>
                          {gbp(c.total)}
                        </TD>
                        <TD className="px-5 py-4" style={{ borderTop: '1px solid rgba(255,255,255,.1)' }}>
                          <div className="flex items-center justify-between gap-3">
                            <StatusPill status={c.status} />
                            <ChevronRight className="mc-chev h-4 w-4" aria-hidden="true" style={{ color: brand.neutralColor }} />
                          </div>
                        </TD>
                      </TR>
                    ))}
                </TBody>
              </Table>
              {!loading && rows.length === 0 && (
                <div className="px-6 py-12">
                  <Empty
                    title={`Nothing in ${active} right now`}
                    description={
                      active === 'Draft'
                        ? 'Every claim you have has been submitted. Start a new one when you next spend.'
                        : `None of your claims are ${active.toLowerCase()} at the moment. Switch to All to see everything you've claimed.`
                    }
                  />
                </div>
              )}
            </div>
          )}
        </div>

        <p className="mt-4 text-xs" style={{ color: brand.neutralColor }} aria-live="polite">
          {loading ? 'Loading your claims…' : `Showing ${rows.length} of ${claims.length} claims. You only ever see claims you own.`}
        </p>
      </div>
    </div>
  );
}
