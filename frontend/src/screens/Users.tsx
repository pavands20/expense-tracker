// @ts-nocheck -- generated from the approved design under its JS runtime contract; not hand-written TypeScript.
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import * as UI from "@/lib/ui";
import { Icons } from "@/lib/icons";
import { brand } from "@/lib/brand";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Button, Input, Label, Select, Table, THead, TBody, TR, TH, TD, Avatar, Empty } = UI;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Check, Users } = Icons;

const SEED_USERS = [
  { id: 'u-01', full_name: 'Helena Brandt', email: 'helena.brandt@harbourlane.co.uk', role: 'Manager', manager_id: 'u-02', is_active: true },
  { id: 'u-02', full_name: 'Tomás Whitcombe', email: 'tomas.whitcombe@harbourlane.co.uk', role: 'Finance', manager_id: 'u-01', is_active: true },
  { id: 'u-03', full_name: 'Priya Raman', email: 'priya.raman@harbourlane.co.uk', role: 'Finance', manager_id: 'u-01', is_active: true },
  { id: 'u-04', full_name: 'Daniel Okafor', email: 'daniel.okafor@harbourlane.co.uk', role: 'Manager', manager_id: 'u-01', is_active: true },
  { id: 'u-05', full_name: 'Sophie Marlowe', email: 'sophie.marlowe@harbourlane.co.uk', role: 'Employee', manager_id: 'u-04', is_active: true },
  { id: 'u-06', full_name: 'Callum Reid', email: 'callum.reid@harbourlane.co.uk', role: 'Employee', manager_id: 'u-04', is_active: true },
  { id: 'u-07', full_name: 'Marcus Lindqvist', email: 'marcus.lindqvist@harbourlane.co.uk', role: 'Manager', manager_id: 'u-01', is_active: true },
  { id: 'u-08', full_name: 'Aisha Bello', email: 'aisha.bello@harbourlane.co.uk', role: 'Employee', manager_id: 'u-07', is_active: true },
  { id: 'u-09', full_name: 'Ewan Fraser', email: 'ewan.fraser@harbourlane.co.uk', role: 'Employee', manager_id: 'u-07', is_active: false },
  { id: 'u-10', full_name: 'Nadia Kowalczyk', email: 'nadia.kowalczyk@harbourlane.co.uk', role: 'Employee', manager_id: 'u-04', is_active: true },
  { id: 'u-11', full_name: 'Joel Abara', email: 'joel.abara@harbourlane.co.uk', role: 'Employee', manager_id: 'u-07', is_active: true },
];

const ROLES = ['Employee', 'Manager', 'Finance'];
const EMPTY_FORM = { full_name: '', email: '', role: 'Employee', manager_id: '', password: '' };

export default function Screen() {
  const [users, setUsers] = React.useState(SEED_USERS);
  const [loading, setLoading] = React.useState(true);
  const [form, setForm] = React.useState(EMPTY_FORM);
  const [errors, setErrors] = React.useState({});
  const [justAdded, setJustAdded] = React.useState(null);
  const [notice, setNotice] = React.useState(null);

  React.useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  const text = 'rgba(255,255,255,0.94)';
  const muted = brand.neutralColor;
  const hairline = 'rgba(255,255,255,0.14)';
  const danger = 'hsl(350 95% 72%)';
  const gradient = 'linear-gradient(120deg, ' + brand.primaryColor + ', ' + brand.accentColor + ')';

  const glass = {
    background: 'rgba(255,255,255,0.07)',
    border: '1px solid ' + hairline,
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    borderRadius: brand.radius,
  };
  const fieldStyle = {
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.22)',
    color: text,
    borderRadius: brand.radius,
    minHeight: 44,
    width: '100%',
    padding: '0 16px',
  };
  const labelStyle = { color: text, fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 };

  const byId = (id) => users.find((u) => u.id === id);
  const activeUsers = users.filter((u) => u.is_active);
  const activeCount = activeUsers.length;

  const setField = (k) => (e) => {
    const v = e.target.value;
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const focusForm = () => {
    const el = document.getElementById('user-full-name');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.focus();
    }
  };

  const submit = (e) => {
    e.preventDefault();
    const er = {};
    const name = form.full_name.trim();
    const email = form.email.trim().toLowerCase();
    if (!name) er.full_name = 'Enter the person’s full name.';
    if (!email) er.email = 'Enter a work email address.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) er.email = 'That doesn’t look like an email address. Check for a missing @ or domain.';
    else if (users.some((u) => u.email.toLowerCase() === email)) er.email = 'An account with this email already exists. Each person needs a unique email.';
    if (!form.manager_id) er.manager_id = 'Choose who this person reports to. Every account needs an assigned manager.';
    else if (byId(form.manager_id) && byId(form.manager_id).email.toLowerCase() === email) er.manager_id = 'A user can’t be their own manager.';
    if (!form.password) er.password = 'Set an initial password.';
    else if (form.password.length < 10) er.password = 'Use at least 10 characters so the password is hard to guess.';
    setErrors(er);
    if (Object.keys(er).length) {
      setNotice(null);
      const first = ['full_name', 'email', 'manager_id', 'password'].find((k) => er[k]);
      const ids = { full_name: 'user-full-name', email: 'user-email', manager_id: 'user-manager', password: 'user-password' };
      const el = document.getElementById(ids[first]);
      if (el) el.focus();
      return;
    }
    const id = 'u-' + String(users.length + 1).padStart(2, '0');
    const created = { id, full_name: name, email, role: form.role, manager_id: form.manager_id, is_active: true };
    setUsers((list) => [created, ...list]);
    setJustAdded(id);
    setNotice({ name, email, manager: byId(form.manager_id).full_name });
    setForm(EMPTY_FORM);
  };

  const roleTint = {
    Finance: 'rgba(232,121,249,0.16)',
    Manager: 'rgba(34,211,238,0.14)',
    Employee: 'rgba(255,255,255,0.08)',
  };
  const roleBorder = {
    Finance: 'rgba(232,121,249,0.5)',
    Manager: 'rgba(34,211,238,0.45)',
    Employee: 'rgba(255,255,255,0.2)',
  };

  const errText = (key) =>
    errors[key] ? (
      <p id={'err-' + key} style={{ color: danger, fontSize: 13, marginTop: 8, display: 'flex', gap: 8, alignItems: 'flex-start', lineHeight: 1.4 }}>
        <span aria-hidden="true" style={{ marginTop: 1, flexShrink: 0 }}><Icons.AlertCircle width={16} height={16} /></span>
        <span>{errors[key]}</span>
      </p>
    ) : null;

  const thStyle = { color: muted, fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', textAlign: 'left', padding: '12px 16px', whiteSpace: 'nowrap' };
  const tdStyle = { padding: '16px', color: text, fontSize: 14, verticalAlign: 'middle', borderTop: '1px solid rgba(255,255,255,0.09)' };

  return (
    <div style={{ position: 'relative', fontFamily: brand.fontBody, color: text, backgroundColor: brand.backgroundColor, minHeight: '100%', overflow: 'hidden', padding: '32px 24px 48px' }}>
      <style>{`
        .u-grid { display: grid; gap: 24px; grid-template-columns: minmax(0,1fr); position: relative; z-index: 1; max-width: 1280px; margin: 0 auto; }
        @media (min-width: 1024px) {
          .u-grid { grid-template-columns: repeat(12, minmax(0,1fr)); grid-template-rows: auto auto auto 1fr; align-items: start; }
          .u-title { grid-column: 1 / 9; grid-row: 1; }
          .u-create { grid-column: 9 / 13; grid-row: 1; justify-self: end; align-self: center; }
          .u-table { grid-column: 1 / 9; grid-row: 2 / 5; }
          .u-form { grid-column: 9 / 13; grid-row: 2; }
          .u-save { grid-column: 9 / 13; grid-row: 3; }
        }
        .u-focus:focus-visible, .u-grid input:focus-visible, .u-grid select:focus-visible, .u-grid button:focus-visible {
          outline: 2px solid ${brand.accentColor}; outline-offset: 2px;
        }
        .u-grid input::placeholder { color: ${brand.neutralColor}; opacity: 0.75; }
        .u-grid select option { color: #111; }
        .u-grid input:hover, .u-grid select:hover { border-color: rgba(255,255,255,0.4) !important; }
        .u-primary { transition: transform .15s ease, box-shadow .2s ease, filter .2s ease; }
        .u-primary:hover { transform: translateY(-1px); filter: brightness(1.06); }
        .u-primary:active { transform: translateY(0); filter: brightness(0.95); }
        @keyframes u-row-in { from { opacity: 0; transform: translateY(-8px); background: rgba(232,121,249,0.3); } to { opacity: 1; transform: none; background: rgba(232,121,249,0.08); } }
        @keyframes u-fade-up { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
        @keyframes u-pulse { 0%,100% { opacity: .35; } 50% { opacity: .7; } }
        .u-row-new { animation: u-row-in .6s ease both; background: rgba(232,121,249,0.08); }
        .u-notice { animation: u-fade-up .3s ease both; }
        .u-skel { animation: u-pulse 1.3s ease-in-out infinite; }
        .u-tr:hover td { background: rgba(255,255,255,0.04); }
        @media (prefers-reduced-motion: reduce) {
          .u-row-new, .u-notice, .u-skel { animation: none !important; }
          .u-primary { transition: none !important; }
          .u-primary:hover { transform: none; }
        }
      `}</style>

      <div aria-hidden="true" style={{ position: 'absolute', top: -160, left: -120, width: 520, height: 520, borderRadius: '50%', background: brand.primaryColor, opacity: 0.16, filter: 'blur(120px)', pointerEvents: 'none' }} />
      <div aria-hidden="true" style={{ position: 'absolute', top: 120, right: -160, width: 560, height: 560, borderRadius: '50%', background: brand.accentColor, opacity: 0.16, filter: 'blur(140px)', pointerEvents: 'none' }} />

      <div className="u-grid">
        <div className="u-title" data-wf="b-0-0">
          <h1 style={{ fontSize: 40, fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em', margin: 0 }}>Users</h1>
          <p style={{ color: muted, fontSize: 16, lineHeight: 1.5, marginTop: 8, maxWidth: 560 }}>
            Create accounts for the team and choose who each person reports to. There is no self sign-up, so nobody gets in until you add them here.
          </p>
        </div>

        <div className="u-create">
          <Button
            type="button"
            data-wf="b-0-1"
            onClick={focusForm}
            className="u-primary"
            style={{ background: gradient, color: brand.backgroundColor, fontWeight: 700, borderRadius: brand.radius, minHeight: 44, padding: '0 24px', border: 'none', display: 'inline-flex', alignItems: 'center', gap: 8, boxShadow: '0 0 48px rgba(34,211,238,0.35)' }}
          >
            <Icons.Plus width={18} height={18} aria-hidden="true" />
            Create user
          </Button>
        </div>

        <section className="u-table" data-wf="b-1-0" aria-labelledby="users-table-heading" style={{ ...glass, overflow: 'hidden' }}>
          <div style={{ padding: '24px 24px 16px', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
            <h2 id="users-table-heading" style={{ fontSize: 24, fontWeight: 800, margin: 0 }}>Users</h2>
            <p style={{ color: muted, fontSize: 13, margin: 0, fontVariantNumeric: 'tabular-nums' }}>
              {users.length} accounts · {activeCount} active
            </p>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <Table style={{ width: '100%', borderCollapse: 'collapse', fontVariantNumeric: 'tabular-nums', minWidth: 680 }}>
              <THead>
                <TR>
                  <TH scope="col" data-wf="i-1-0-0" style={thStyle}>Name</TH>
                  <TH scope="col" data-wf="i-1-0-1" style={thStyle}>Email</TH>
                  <TH scope="col" data-wf="i-1-0-2" style={thStyle}>Role</TH>
                  <TH scope="col" data-wf="i-1-0-3" style={thStyle}>Manager</TH>
                  <TH scope="col" data-wf="i-1-0-4" style={thStyle}>Status</TH>
                </TR>
              </THead>
              <TBody>
                {loading &&
                  [0, 1, 2, 3, 4].map((i) => (
                    <TR key={'s' + i} aria-hidden="true">
                      {[0, 1, 2, 3, 4].map((c) => (
                        <TD key={c} style={tdStyle}>
                          <div className="u-skel" style={{ height: 14, width: c === 1 ? 180 : 90, borderRadius: 8, background: 'rgba(255,255,255,0.18)' }} />
                        </TD>
                      ))}
                    </TR>
                  ))}
                {!loading &&
                  users.map((u) => {
                    const mgr = byId(u.manager_id);
                    return (
                      <TR key={u.id} className={'u-tr' + (u.id === justAdded ? ' u-row-new' : '')}>
                        <TD style={tdStyle}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 12, opacity: u.is_active ? 1 : 0.7 }}>
                            <Avatar name={u.full_name} />
                            <span style={{ fontWeight: 600 }}>{u.full_name}</span>
                          </div>
                        </TD>
                        <TD style={{ ...tdStyle, color: muted, opacity: u.is_active ? 1 : 0.8 }}>{u.email}</TD>
                        <TD style={tdStyle}>
                          <span style={{ display: 'inline-block', padding: '4px 12px', borderRadius: 999, fontSize: 12, fontWeight: 600, background: roleTint[u.role], border: '1px solid ' + roleBorder[u.role] }}>{u.role}</span>
                        </TD>
                        <TD style={{ ...tdStyle, whiteSpace: 'nowrap' }}>{mgr ? mgr.full_name : '—'}</TD>
                        <TD style={tdStyle}>
                          {u.is_active ? (
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 600, color: brand.primaryColor }}>
                              <Icons.CheckCircle width={16} height={16} aria-hidden="true" /> Active
                            </span>
                          ) : (
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 600, color: muted }}>
                              <Icons.X width={16} height={16} aria-hidden="true" /> Deactivated
                            </span>
                          )}
                        </TD>
                      </TR>
                    );
                  })}
              </TBody>
            </Table>
          </div>
          {!loading && users.length === 0 && (
            <Empty title="No accounts yet" description="Create the first account with the form on the right. Each person needs a role and an assigned manager." />
          )}
        </section>

        <form id="new-user-form" className="u-form" data-wf="b-1-1" onSubmit={submit} noValidate aria-labelledby="new-account-heading" style={{ ...glass, padding: 24, position: 'relative' }}>
          <h2 id="new-account-heading" style={{ fontSize: 24, fontWeight: 800, margin: 0 }}>New account</h2>
          <p style={{ color: muted, fontSize: 14, lineHeight: 1.5, marginTop: 8, marginBottom: 24 }}>
            The person signs in with this email and the initial password you set.
          </p>

          {notice && (
            <div role="status" className="u-notice" style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: 16, marginBottom: 24, borderRadius: brand.radius, border: '1px solid ' + brand.primaryColor, background: 'rgba(34,211,238,0.1)' }}>
              <span aria-hidden="true" style={{ color: brand.primaryColor, flexShrink: 0, marginTop: 2 }}><Icons.CheckCircle width={20} height={20} /></span>
              <div style={{ fontSize: 14, lineHeight: 1.5 }}>
                <strong>{notice.name} can now sign in.</strong>
                <div style={{ color: muted }}>{notice.email} reports to {notice.manager}. Pass the initial password on to them directly.</div>
              </div>
            </div>
          )}

          <div style={{ display: 'grid', gap: 24 }}>
            <div>
              <Label htmlFor="user-full-name" style={labelStyle}>Full name</Label>
              <Input id="user-full-name" data-wf="i-1-1-0" name="full_name" autoComplete="off" placeholder="e.g. Rhiannon Pugh" value={form.full_name} onChange={setField('full_name')} aria-invalid={errors.full_name ? 'true' : undefined} aria-describedby={errors.full_name ? 'err-full_name' : undefined} style={{ ...fieldStyle, borderColor: errors.full_name ? danger : fieldStyle.border }} />
              {errText('full_name')}
            </div>

            <div>
              <Label htmlFor="user-email" style={labelStyle}>Email</Label>
              <Input id="user-email" data-wf="i-1-1-1" name="email" type="email" autoComplete="off" placeholder="name@harbourlane.co.uk" value={form.email} onChange={setField('email')} aria-invalid={errors.email ? 'true' : undefined} aria-describedby={errors.email ? 'err-email' : undefined} style={fieldStyle} />
              {errText('email')}
            </div>

            <div>
              <Label htmlFor="user-role" style={labelStyle}>Role</Label>
              <Select id="user-role" data-wf="i-1-1-2" name="role" value={form.role} onChange={setField('role')} style={fieldStyle}>
                {ROLES.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </Select>
            </div>

            <div>
              <Label htmlFor="user-manager" style={labelStyle}>Assigned manager</Label>
              <Select id="user-manager" data-wf="i-1-1-3" name="manager_id" value={form.manager_id} onChange={setField('manager_id')} aria-invalid={errors.manager_id ? 'true' : undefined} aria-describedby={errors.manager_id ? 'err-manager_id' : 'help-manager'} style={fieldStyle}>
                <option value="">Choose a manager</option>
                {activeUsers.map((u) => (
                  <option key={u.id} value={u.id}>{u.full_name} ({u.role})</option>
                ))}
              </Select>
              {errors.manager_id ? errText('manager_id') : (
                <p id="help-manager" style={{ color: muted, fontSize: 13, marginTop: 8, lineHeight: 1.4 }}>Their claims go to this person for first approval. Managers and Finance users need one too.</p>
              )}
            </div>

            <div>
              <Label htmlFor="user-password" style={labelStyle}>Initial password</Label>
              <Input id="user-password" data-wf="i-1-1-4" name="password" type="password" autoComplete="new-password" placeholder="At least 10 characters" value={form.password} onChange={setField('password')} aria-invalid={errors.password ? 'true' : undefined} aria-describedby={errors.password ? 'err-password' : 'help-password'} style={fieldStyle} />
              {errors.password ? errText('password') : (
                <p id="help-password" style={{ color: muted, fontSize: 13, marginTop: 8, lineHeight: 1.4 }}>Stored only as a salted hash and never shown again. They can reset it by email.</p>
              )}
            </div>
          </div>
        </form>

        <div className="u-save">
          <Button
            type="submit"
            form="new-user-form"
            data-wf="b-2-0"
            className="u-primary"
            style={{ background: gradient, color: brand.backgroundColor, fontWeight: 700, fontSize: 16, borderRadius: brand.radius, minHeight: 48, width: '100%', border: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 0 64px rgba(232,121,249,0.4)' }}
          >
            <Icons.Check width={18} height={18} aria-hidden="true" />
            Save user
          </Button>
        </div>
      </div>
    </div>
  );
}
