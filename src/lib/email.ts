import "server-only";

import { Resend } from "resend";
import type { Booking } from "@/lib/booking-types";
import { siteConfig } from "@/lib/config";

export function isEmailConfigured() {
  return Boolean(
    process.env.RESEND_API_KEY && process.env.BOOKING_NOTIFY_EMAIL
  );
}

function formatEventDate(date: string) {
  return new Intl.DateTimeFormat("es-CL", {
    dateStyle: "full",
  }).format(new Date(`${date}T12:00:00`));
}

function formatCreatedAt(date: string) {
  return new Intl.DateTimeFormat("es-CL", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
}

function buildAdminUrl() {
  const base = process.env.SITE_URL?.replace(/\/$/, "") ?? "http://localhost:3000";
  return `${base}/admin`;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildBookingEmailHtml(booking: Booking) {
  const rows = [
    ["Nombre", escapeHtml(booking.name)],
    ["Email", escapeHtml(booking.email)],
    ["Teléfono", escapeHtml(booking.phone)],
    ["Tipo de evento", escapeHtml(booking.eventType)],
    ["Fecha del evento", escapeHtml(formatEventDate(booking.eventDate))],
    ["Lugar", escapeHtml(booking.location)],
    ...(booking.guests
      ? [["Invitados", escapeHtml(booking.guests)] as const]
      : []),
    ["Recibida", escapeHtml(formatCreatedAt(booking.createdAt))],
  ];

  const details = rows
    .map(
      ([label, value]) =>
        `<tr>
          <td style="padding:8px 12px 8px 0;color:#a1a1aa;font-size:14px;vertical-align:top;white-space:nowrap;">${label}</td>
          <td style="padding:8px 0;color:#f4f4f5;font-size:14px;">${value}</td>
        </tr>`
    )
    .join("");

  const messageBlock = booking.message
    ? `<div style="margin-top:20px;padding:16px;background:#18181b;border-radius:12px;border:1px solid #27272a;">
        <p style="margin:0 0 8px;color:#a1a1aa;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;">Mensaje del cliente</p>
        <p style="margin:0;color:#e4e4e7;font-size:14px;line-height:1.6;white-space:pre-wrap;">${escapeHtml(booking.message)}</p>
      </div>`
    : "";

  return `
    <div style="font-family:Arial,sans-serif;background:#09090b;color:#f4f4f5;padding:32px 16px;">
      <div style="max-width:560px;margin:0 auto;background:#111827;border:1px solid #27272a;border-radius:16px;padding:28px;">
        <p style="margin:0 0 8px;color:#a855f7;font-size:12px;font-weight:bold;letter-spacing:0.12em;text-transform:uppercase;">
          Nueva solicitud de reserva
        </p>
        <h1 style="margin:0 0 8px;font-size:24px;line-height:1.2;color:#ffffff;">
          ${siteConfig.brand}
        </h1>
        <p style="margin:0 0 24px;color:#a1a1aa;font-size:14px;">
          Llegó una nueva solicitud desde tu press kit.
        </p>

        <table style="width:100%;border-collapse:collapse;">
          ${details}
        </table>

        ${messageBlock}

        <a href="${buildAdminUrl()}" style="display:inline-block;margin-top:24px;padding:12px 20px;background:#16a34a;color:#ffffff;text-decoration:none;border-radius:999px;font-size:14px;font-weight:bold;">
          Ver en panel admin
        </a>
      </div>
    </div>
  `;
}

function buildBookingEmailText(booking: Booking) {
  const lines = [
    `Nueva solicitud de reserva — ${siteConfig.brand}`,
    "",
    `Nombre: ${booking.name}`,
    `Email: ${booking.email}`,
    `Teléfono: ${booking.phone}`,
    `Tipo de evento: ${booking.eventType}`,
    `Fecha del evento: ${formatEventDate(booking.eventDate)}`,
    `Lugar: ${booking.location}`,
  ];

  if (booking.guests) lines.push(`Invitados: ${booking.guests}`);
  if (booking.message) {
    lines.push("", "Mensaje:", booking.message);
  }

  lines.push("", `Panel admin: ${buildAdminUrl()}`);

  return lines.join("\n");
}

export async function sendNewBookingNotification(booking: Booking) {
  if (!isEmailConfigured()) {
    return { sent: false as const, reason: "not_configured" as const };
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const to = process.env.BOOKING_NOTIFY_EMAIL!;
  const from =
    process.env.BOOKING_FROM_EMAIL ?? "Diversión DJ <onboarding@resend.dev>";

  const subject = `Nueva reserva: ${booking.eventType} — ${booking.name}`;

  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: booking.email,
    subject,
    html: buildBookingEmailHtml(booking),
    text: buildBookingEmailText(booking),
  });

  if (error) {
    console.error("[email] Error al enviar notificación:", error);
    return { sent: false as const, reason: "send_failed" as const };
  }

  return { sent: true as const };
}
