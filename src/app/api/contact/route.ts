import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const PROJECT_TYPES = [
  "Branding",
  "Web design",
  "Web development",
  "Social media",
  "Other",
];

type Payload = {
  name?: unknown;
  email?: unknown;
  projectType?: unknown;
  budget?: unknown;
  timeline?: unknown;
  message?: unknown;
  company?: unknown; // honeypot — real people never see this field
};

const asText = (value: unknown, max: number) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

// Deliberately permissive: rejecting unusual-but-valid addresses loses leads.
const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export async function POST(request: Request) {
  let body: Payload;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // A bot filled the hidden field. Look successful so it stops retrying.
  if (asText(body.company, 100)) {
    return NextResponse.json({ ok: true });
  }

  const name = asText(body.name, 120);
  const email = asText(body.email, 200);
  const projectType = asText(body.projectType, 60);
  const budget = asText(body.budget, 120);
  const timeline = asText(body.timeline, 120);
  const message = asText(body.message, 5000);

  const errors: Record<string, string> = {};
  if (!name) errors.name = "Please tell us your name.";
  if (!email) errors.email = "Please add an email address.";
  else if (!isEmail(email)) errors.email = "That email doesn't look right.";
  if (!projectType) errors.projectType = "Please pick a project type.";
  else if (!PROJECT_TYPES.includes(projectType))
    errors.projectType = "Please pick a project type.";
  if (!message) errors.message = "Please tell us about the project.";

  if (Object.keys(errors).length) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    console.error(
      "Contact form is not configured. Missing:",
      [
        !apiKey && "RESEND_API_KEY",
        !to && "CONTACT_TO_EMAIL",
        !from && "CONTACT_FROM_EMAIL",
      ]
        .filter(Boolean)
        .join(", ")
    );
    return NextResponse.json(
      { error: "We couldn't send that right now. Please email us directly." },
      { status: 500 }
    );
  }

  const rows: [string, string][] = [
    ["Name", name],
    ["Email", email],
    ["Project type", projectType],
    ["Budget", budget || "—"],
    ["Timeline", timeline || "—"],
  ];

  const html = `
    <div style="font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:#1b1b1b;line-height:1.5">
      <h2 style="margin:0 0 24px">New project enquiry</h2>
      <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-bottom:24px">
        ${rows
          .map(
            ([label, value]) => `
          <tr>
            <td style="padding:6px 24px 6px 0;color:#6e6e6e;vertical-align:top">${label}</td>
            <td style="padding:6px 0"><strong>${escapeHtml(value)}</strong></td>
          </tr>`
          )
          .join("")}
      </table>
      <p style="margin:0 0 8px;color:#6e6e6e">Project details</p>
      <p style="margin:0;white-space:pre-wrap">${escapeHtml(message)}</p>
    </div>
  `;

  const text = [
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    "Project details:",
    message,
  ].join("\n");

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: email,
      subject: `New project enquiry — ${name} (${projectType})`,
      html,
      text,
    });

    if (error) {
      console.error("Resend rejected the contact email:", error);
      return NextResponse.json(
        { error: "We couldn't send that right now. Please email us directly." },
        { status: 502 }
      );
    }
  } catch (err) {
    console.error("Failed to send the contact email:", err);
    return NextResponse.json(
      { error: "We couldn't send that right now. Please email us directly." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
