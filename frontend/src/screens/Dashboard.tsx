// @ts-nocheck -- generated from the approved design under its JS runtime contract; not hand-written TypeScript.
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import * as UI from "@/lib/ui";
import { Icons } from "@/lib/icons";
import { brand } from "@/lib/brand";
import { useNavigate } from "@/lib/navigate";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Select, Empty } = UI;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Users, Package, Clock, Edit, CheckCircle } = Icons;

const STATUSES = [
  { key: 'draft', label: 'Draft', count: 2, total: 84.5, icon: 'Edit', note: 'Still editable' },
  { key: 'submitted', label: 'Submitted', count: 1, total: 120.0, icon: 'Clock', note: 'With your manager', wf: 'i-1-0-1' },
  { key: 'manager-approved', label: 'Manager approved', count: 1, total: 56.2, icon: 'Users', note: 'With Finance', wf: 'i-1-0-2' },
  { key: 'approved', label: 'Approved', count: 3, total: 310.75, icon: 'CheckCircle', note: 'Awaiting payment', wf: 'i-1-0-3' },
  { key: 'paid', label: 'Paid', count: 8, total: 1245.3, icon: 'Package', note: 'Reimbursed', wf: 'i-1-0-4' },
];
STATUSES[0].wf = 'i-1-0-0';

const gbp = (n) =>
  new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(n);

export default function Screen() {
  const navigate = useNavigate();
  const rows = STATUSES;
  const claimCount = rows.reduce((a, s) => a + s.count, 0);
  const grandTotal = rows.reduce((a, s) => a + s.total, 0);
  const hasClaims = claimCount > 0;

  const white = 'rgba(255,255,255,0.96)';
  const glass = {
    backgroundColor: 'rgba(255,255,255,0.07)',
    border: '1px solid rgba(255,255,255,0.14)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    borderRadius: brand.radius,
  };
  const gradient = `linear-gradient(90deg, ${brand.primaryColor}, ${brand.accentColor})`;

  return (
    <div
      className="np-root relative w-full min-h-full"
      style={{
        backgroundColor: brand.backgroundColor,
        color: white,
        fontFamily: brand.fontBody,
        overflow: 'hidden',
      }}
    >
      <style>{`
        .np-root *:focus-visible { outline: 2px solid ${brand.primaryColor}; outline-offset: 3px; }
        .np-card { transition: transform .25s ease, box-shadow .25s ease, background-color .25s ease, border-color .25s ease; }
        .np-card:hover { transform: translateY(-3px); background-color: rgba(255,255,255,0.1); border-color: rgba(255,255,255,0.28); box-shadow: 0 24px 80px -12px ${brand.primaryColor}55; }
        .np-card:active { transform: translateY(0); }
        .np-card:hover .np-chev { transform: translateX(3px); color: ${brand.primaryColor}; }
        .np-chev { transition: transform .25s ease, color .25s ease; }
        .np-cta { transition: transform .2s ease, box-shadow .2s ease, filter .2s ease; box-shadow: 0 10px 50px -8px ${brand.accentColor}99; }
        .np-cta:hover { transform: translateY(-2px); filter: brightness(1.08); box-shadow: 0 16px 60px -8px ${brand.accentColor}cc; }
        .np-cta:active { transform: translateY(0); }
        .np-link:hover { color: ${white}; }
        @keyframes np-rise { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes np-grow { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        .np-rise { animation: np-rise .5s ease both; }
        .np-bar { transform-origin: left; animation: np-grow .8s .2s ease both; }
        @media (prefers-reduced-motion: reduce) {
          .np-card, .np-cta, .np-chev { transition: none; }
          .np-card:hover, .np-cta:hover { transform: none; }
          .np-rise, .np-bar { animation: none; }
        }
      `}</style>

      {/* glows */}
      <div
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{ top: -160, right: -120, width: 560, height: 560, borderRadius: '50%', background: `radial-gradient(circle, ${brand.accentColor}40, transparent 65%)`, filter: 'blur(40px)' }}
      />
      <div
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{ bottom: -200, left: -160, width: 640, height: 640, borderRadius: '50%', background: `radial-gradient(circle, ${brand.primaryColor}33, transparent 65%)`, filter: 'blur(48px)' }}
      />

      <div className="relative mx-auto w-full" style={{ maxWidth: 1200, padding: '48px 24px' }}>
        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-12 items-end" style={{ gap: 24, marginBottom: 48 }}>
          <div data-wf="b-0-0" className="md:col-span-8">
            <p style={{ color: brand.neutralColor, fontSize: 13, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600, margin: 0 }}>
              Your expenses · 9 Nov 2026
            </p>
            <h1
              style={{
                fontFamily: brand.fontHeading,
                fontSize: 'clamp(36px, 5vw, 40px)',
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                margin: '8px 0 0',
              }}
            >
              Dashboard
            </h1>
            <p style={{ color: brand.neutralColor, fontSize: 16, lineHeight: 1.5, margin: '12px 0 0' }} style-tabular="">
              <span style={{ fontVariantNumeric: 'tabular-nums' }}>
                {hasClaims
                  ? `${claimCount} claims worth ${gbp(grandTotal)} across every status.`
                  : 'Nothing claimed yet. Every status sits at zero.'}
              </span>
            </p>
          </div>
          <div className="md:col-span-4 flex md:justify-end">
            <button
              type="button"
              data-wf="b-0-1"
              className="np-cta inline-flex items-center justify-center"
              onClick={() => navigate('claim-edit')}
              style={{
                background: gradient,
                color: brand.backgroundColor,
                border: 'none',
                borderRadius: brand.radius,
                padding: '0 24px',
                minHeight: 52,
                gap: 8,
                fontSize: 16,
                fontWeight: 800,
                cursor: 'pointer',
                fontFamily: brand.fontBody,
              }}
            >
              <Icons.Plus className="w-5 h-5" aria-hidden="true" />
              New claim
            </button>
          </div>
        </div>

        {/* Row 2 */}
        <section data-wf="b-1-0" aria-labelledby="np-status-h" style={{ marginBottom: 48 }}>
          <div className="flex items-baseline justify-between flex-wrap" style={{ gap: 8, marginBottom: 24 }}>
            <h2 id="np-status-h" style={{ fontFamily: brand.fontHeading, fontSize: 24, fontWeight: 800, margin: 0, letterSpacing: '-0.01em' }}>
              My claims by status
            </h2>
            <p style={{ color: brand.neutralColor, fontSize: 13, margin: 0 }}>
              Draft to Paid, left to right. Select a status to open My claims.
            </p>
          </div>

          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5" style={{ gap: 16, listStyle: 'none', padding: 0, margin: 0 }}>
            {rows.map((s, i) => {
              const Icon = Icons[s.icon];
              const share = grandTotal > 0 ? Math.max(4, Math.round((s.total / grandTotal) * 100)) : 0;
              const label = `${s.label}: ${s.count} ${s.count === 1 ? 'claim' : 'claims'}, ${gbp(s.total)}. View in My claims.`;
              return (
                <li key={s.key} className="np-rise" style={{ animationDelay: `${i * 70}ms` }}>
                  <button
                    type="button"
                    data-wf={s.wf}
                    aria-label={label}
                    className="np-card w-full text-left flex flex-col"
                    onClick={() => navigate('claims')}
                    style={{
                      ...glass,
                      color: white,
                      padding: 24,
                      minHeight: 224,
                      cursor: 'pointer',
                      fontFamily: brand.fontBody,
                      gap: 0,
                    }}
                  >
                    <span className="flex items-center justify-between" style={{ marginBottom: 24 }}>
                      <span
                        className="inline-flex items-center justify-center"
                        style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: `${brand.primaryColor}26`, color: brand.primaryColor }}
                      >
                        <Icon className="w-5 h-5" aria-hidden="true" />
                      </span>
                      <span style={{ color: brand.neutralColor, fontSize: 12, fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>
                        Step {i + 1} of 5
                      </span>
                    </span>

                    <span style={{ fontSize: 18, fontWeight: 700, lineHeight: 1.3 }}>{s.label}</span>
                    <span style={{ color: brand.neutralColor, fontSize: 13, marginTop: 4 }}>{s.note}</span>

                    <span
                      style={{
                        fontSize: 32,
                        fontWeight: 800,
                        letterSpacing: '-0.02em',
                        lineHeight: 1.1,
                        marginTop: 'auto',
                        paddingTop: 24,
                        fontVariantNumeric: 'tabular-nums',
                      }}
                    >
                      {gbp(s.total)}
                    </span>
                    <span className="flex items-center justify-between" style={{ marginTop: 8 }}>
                      <span style={{ color: brand.neutralColor, fontSize: 14, fontVariantNumeric: 'tabular-nums' }}>
                        {s.count} {s.count === 1 ? 'claim' : 'claims'}
                      </span>
                      <Icons.ChevronRight className="np-chev w-5 h-5" aria-hidden="true" style={{ color: brand.neutralColor }} />
                    </span>
                    <span
                      aria-hidden="true"
                      style={{ display: 'block', height: 4, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.1)', marginTop: 16, overflow: 'hidden' }}
                    >
                      <span className="np-bar" style={{ display: 'block', height: '100%', width: `${share}%`, background: gradient, borderRadius: 4 }} />
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </section>

        {/* Row 3 */}
        <div data-wf="b-2-0" aria-live="polite">
          {hasClaims ? (
            <div
              className="flex items-start"
              style={{ ...glass, padding: 24, gap: 16 }}
            >
              <Icons.CheckCircle className="w-5 h-5 flex-none" aria-hidden="true" style={{ color: brand.primaryColor, marginTop: 2 }} />
              <p style={{ margin: 0, color: brand.neutralColor, fontSize: 14, lineHeight: 1.6, maxWidth: 640 }}>
                <span style={{ color: white, fontWeight: 700 }}>You have claims in motion.</span>{' '}
                A submitted claim goes to your manager, then to Finance, and is marked Paid once reimbursed. A rejected claim comes back to Draft with the approver’s comment.
              </p>
            </div>
          ) : (
            <div className="np-rise" style={{ ...glass, padding: '48px 24px', textAlign: 'center' }}>
              <Empty
                title="No claims yet."
                description="Create your first claim to get started."
                action={
                  <button
                    type="button"
                    className="np-cta inline-flex items-center justify-center"
                    onClick={() => navigate('claim-edit')}
                    style={{ background: gradient, color: brand.backgroundColor, border: 'none', borderRadius: brand.radius, padding: '0 24px', minHeight: 48, gap: 8, fontSize: 16, fontWeight: 800, cursor: 'pointer', fontFamily: brand.fontBody }}
                  >
                    <Icons.Plus className="w-5 h-5" aria-hidden="true" />
                    Start a claim
                  </button>
                }
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
