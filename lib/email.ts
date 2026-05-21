import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const FROM = process.env.RESEND_FROM || 'Teleiosis Mandate <noreply@teleiosis.org>'
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'info@teleiosis.org'
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://teleiosis.org'

// ─── Shared layout ──────────────────────────────────────────────────────────

function layout(content: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Teleiosis Mandate</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f8;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f8;padding:40px 16px;">
    <tr><td align="center">
      <table width="100%" style="max-width:580px;background:#ffffff;border-radius:2px;overflow:hidden;">

        <!-- Header -->
        <tr>
          <td style="background:#2c0e68;padding:32px 40px;text-align:center;">
            <p style="margin:0;font-family:Georgia,serif;font-weight:700;font-size:22px;color:#ffffff;letter-spacing:0.25em;">TELEIOSIS</p>
            <p style="margin:4px 0 0;font-size:10px;color:#d4af37;letter-spacing:0.3em;font-family:Arial,sans-serif;text-transform:uppercase;">Mandate</p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:40px 40px 32px;">
            ${content}
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f8f7ff;padding:24px 40px;text-align:center;border-top:1px solid #e8e8f0;">
            <p style="margin:0 0 8px;font-size:11px;color:#9090a8;font-family:Arial,sans-serif;">
              Teleiosis Mandate · Lusaka, Zambia
            </p>
            <p style="margin:0;font-size:11px;color:#9090a8;font-family:Arial,sans-serif;">
              <a href="${SITE_URL}" style="color:#4a0e68;text-decoration:none;">teleiosis.org</a>
              &nbsp;·&nbsp;
              <a href="mailto:info@teleiosis.org" style="color:#4a0e68;text-decoration:none;">info@teleiosis.org</a>
            </p>
            <p style="margin:12px 0 0;font-size:10px;color:#b0b0c0;font-family:Georgia,serif;font-style:italic;">"That Which Is Perfect Is Come"</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`
}

function heading(text: string) {
  return `<h1 style="margin:0 0 20px;font-family:Georgia,serif;font-size:24px;font-weight:700;color:#2c0e68;line-height:1.3;">${text}</h1>`
}

function para(text: string) {
  return `<p style="margin:0 0 16px;font-size:15px;color:#444466;line-height:1.7;font-family:Arial,sans-serif;">${text}</p>`
}

function divider() {
  return `<hr style="border:none;border-top:1px solid #e8e8f0;margin:24px 0;" />`
}

function dataRow(label: string, value: string) {
  return `<tr>
    <td style="padding:8px 0;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#9090a8;font-family:Arial,sans-serif;width:130px;vertical-align:top;">${label}</td>
    <td style="padding:8px 0;font-size:14px;color:#2c0e68;font-family:Arial,sans-serif;font-weight:600;">${value}</td>
  </tr>`
}

function goldButton(text: string, href: string) {
  return `<a href="${href}" style="display:inline-block;margin-top:8px;padding:14px 32px;background:#d4af37;color:#2c0e68;font-size:13px;font-weight:700;font-family:Arial,sans-serif;text-decoration:none;letter-spacing:0.05em;border-radius:2px;">${text}</a>`
}

function adminBadge(label: string) {
  return `<p style="display:inline-block;margin:0 0 24px;padding:6px 14px;background:#4a0e68;color:#d4af37;font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;font-family:Arial,sans-serif;">${label}</p>`
}

// ─── 1. Payment / Partnership confirmed → user ───────────────────────────────

export async function sendPaymentConfirmation({
  to, name, amount, reference, type, eventTitle, message,
}: {
  to: string; name: string; amount: number; reference: string
  type: string; eventTitle?: string; message?: string
}) {
  const typeLabel = type === 'partnership' ? 'Partnership Gift' : type === 'event' ? 'Event Registration' : type === 'store' ? 'Store Purchase' : 'Payment'
  const body = layout(`
    ${heading(`Thank You, ${name.split(' ')[0]}!`)}
    ${para(`Your ${typeLabel.toLowerCase()} has been received and confirmed. We are grateful for your support of the Teleiosis Mandate.`)}
    ${divider()}
    <table cellpadding="0" cellspacing="0" width="100%">
      ${dataRow('Amount', `ZMW ${Number(amount).toLocaleString('en-ZM', { minimumFractionDigits: 2 })}`)}
      ${dataRow('Reference', reference)}
      ${dataRow('Type', typeLabel)}
      ${eventTitle ? dataRow('Event', eventTitle) : ''}
      ${dataRow('Date', new Date().toLocaleDateString('en-ZM', { day: 'numeric', month: 'long', year: 'numeric' }))}
    </table>
    ${message ? `${divider()}${para(`<em>"${message}"</em>`)}` : ''}
    ${divider()}
    ${para('Your giving is sowing into the Kingdom of God and supporting a movement devoted to training believers into Christian perfection and Kingdom authority.')}
    <p style="margin:24px 0 0;font-size:13px;color:#9090a8;font-family:Arial,sans-serif;">
      If you have any questions, reply to this email or contact us at
      <a href="mailto:info@teleiosis.org" style="color:#4a0e68;">info@teleiosis.org</a>.
    </p>
  `)

  return resend.emails.send({
    from: FROM,
    to,
    subject: `Thank you for your ${typeLabel.toLowerCase()} — Teleiosis Mandate`,
    html: body,
  })
}

// ─── 2. Payment / Partnership notification → admin ───────────────────────────

export async function sendAdminPaymentNotification({
  name, email, amount, reference, type, eventTitle, productTitle, message,
}: {
  name: string; email: string; amount: number; reference: string
  type: string; eventTitle?: string; productTitle?: string; message?: string
}) {
  const typeLabel = type === 'partnership' ? 'Partnership Gift' : type === 'event' ? 'Event Registration' : type === 'store' ? 'Store Purchase' : 'Payment'
  const body = layout(`
    ${adminBadge(`New ${typeLabel}`)}
    ${heading(`${typeLabel} Received`)}
    ${para(`A new ${typeLabel.toLowerCase()} has been confirmed on the Teleiosis platform.`)}
    ${divider()}
    <table cellpadding="0" cellspacing="0" width="100%">
      ${dataRow('Name', name || '—')}
      ${dataRow('Email', email)}
      ${dataRow('Amount', `ZMW ${Number(amount).toLocaleString('en-ZM', { minimumFractionDigits: 2 })}`)}
      ${dataRow('Reference', reference)}
      ${dataRow('Type', typeLabel)}
      ${eventTitle ? dataRow('Event', eventTitle) : ''}
      ${productTitle ? dataRow('Product', productTitle) : ''}
      ${dataRow('Date', new Date().toLocaleString('en-ZM', { dateStyle: 'long', timeStyle: 'short' }))}
    </table>
    ${message ? `${divider()}${para(`<strong>Message from donor:</strong><br/><em>"${message}"</em>`)}` : ''}
    ${divider()}
    ${goldButton('View in Dashboard', `${SITE_URL}/admin/payments`)}
  `)

  return resend.emails.send({
    from: FROM,
    to: ADMIN_EMAIL,
    subject: `[Teleiosis] New ${typeLabel} — ZMW ${amount} from ${name || email}`,
    html: body,
  })
}

// ─── 3. Contact form confirmation → user ────────────────────────────────────

export async function sendContactConfirmation({
  to, name, subject, message,
}: {
  to: string; name: string; subject: string; message: string
}) {
  const body = layout(`
    ${heading(`We Received Your Message, ${name.split(' ')[0]}!`)}
    ${para(`Thank you for reaching out to the Teleiosis Mandate. Our team will get back to you as soon as possible, usually within 1–2 business days.`)}
    ${divider()}
    <p style="margin:0 0 8px;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#9090a8;font-family:Arial,sans-serif;">Your message</p>
    <blockquote style="margin:0 0 20px;padding:16px 20px;background:#f8f7ff;border-left:3px solid #d4af37;font-size:14px;color:#444466;font-family:Arial,sans-serif;line-height:1.7;">
      <strong style="display:block;margin-bottom:6px;color:#2c0e68;">${subject}</strong>
      ${message.replace(/\n/g, '<br/>')}
    </blockquote>
    ${divider()}
    ${para('While you wait, you are welcome to explore our teachings library or check upcoming events.')}
    ${goldButton('Explore Teachings', `${SITE_URL}/teachings`)}
  `)

  return resend.emails.send({
    from: FROM,
    to,
    subject: `We received your message — Teleiosis Mandate`,
    html: body,
  })
}

// ─── 4. Contact form notification → admin ────────────────────────────────────

export async function sendAdminContactNotification({
  name, email, subject, message,
}: {
  name: string; email: string; subject: string; message: string
}) {
  const body = layout(`
    ${adminBadge('New Contact Message')}
    ${heading('New Contact Form Submission')}
    ${divider()}
    <table cellpadding="0" cellspacing="0" width="100%">
      ${dataRow('From', name)}
      ${dataRow('Email', `<a href="mailto:${email}" style="color:#4a0e68;">${email}</a>`)}
      ${dataRow('Subject', subject)}
      ${dataRow('Date', new Date().toLocaleString('en-ZM', { dateStyle: 'long', timeStyle: 'short' }))}
    </table>
    ${divider()}
    <p style="margin:0 0 8px;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#9090a8;font-family:Arial,sans-serif;">Message</p>
    <blockquote style="margin:0;padding:16px 20px;background:#f8f7ff;border-left:3px solid #d4af37;font-size:14px;color:#444466;font-family:Arial,sans-serif;line-height:1.7;">
      ${message.replace(/\n/g, '<br/>')}
    </blockquote>
    ${divider()}
    ${goldButton('Reply to ' + name.split(' ')[0], `mailto:${email}`)}
  `)

  return resend.emails.send({
    from: FROM,
    to: ADMIN_EMAIL,
    replyTo: email,
    subject: `[Teleiosis] New message from ${name} — ${subject}`,
    html: body,
  })
}

// ─── 5. Newsletter welcome → user ────────────────────────────────────────────

export async function sendNewsletterWelcome({ to, email }: { to?: string; email: string }) {
  const body = layout(`
    ${heading("You're In!")}
    ${para('Thank you for subscribing to the Teleiosis Mandate newsletter. You will be among the first to know about upcoming events, new teachings, and word from the teacher.')}
    ${divider()}
    <p style="margin:0 0 16px;font-size:13px;color:#9090a8;font-family:Arial,sans-serif;line-height:1.7;">
      <strong style="display:block;margin-bottom:8px;color:#2c0e68;font-size:14px;">What to expect:</strong>
      · Upcoming events and conferences<br/>
      · New teaching series and audio releases<br/>
      · Devotional quotes and excerpts from the teacher<br/>
      · Ministry updates from Lusaka and beyond
    </p>
    ${divider()}
    ${para('In the meantime, explore the audio teaching library and get started on your journey into Christian perfection.')}
    ${goldButton('Explore Teachings', `${SITE_URL}/teachings`)}
  `)

  return resend.emails.send({
    from: FROM,
    to: email,
    subject: `Welcome to the Teleiosis Mandate newsletter`,
    html: body,
  })
}

// ─── 6. Newsletter signup notification → admin ───────────────────────────────

export async function sendAdminNewsletterNotification({ email }: { email: string }) {
  const body = layout(`
    ${adminBadge('Newsletter Signup')}
    ${heading('New Newsletter Subscriber')}
    ${divider()}
    <table cellpadding="0" cellspacing="0" width="100%">
      ${dataRow('Email', email)}
      ${dataRow('Date', new Date().toLocaleString('en-ZM', { dateStyle: 'long', timeStyle: 'short' }))}
    </table>
  `)

  return resend.emails.send({
    from: FROM,
    to: ADMIN_EMAIL,
    subject: `[Teleiosis] New newsletter subscriber — ${email}`,
    html: body,
  })
}

// ─── 7. Event registration confirmation → user ──────────────────────────────

export type EventDetails = {
  id: string; title: string; date: string
  time_start?: string | null; time_end?: string | null
  location?: string | null; speaker?: string | null; type?: string | null
}

export async function sendEventRegistrationConfirmation({
  to, name, amount, reference, event,
}: {
  to: string; name: string; amount: number; reference: string; event: EventDetails
}) {
  const eventDate = new Date(event.date).toLocaleDateString('en-ZM', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
  const timeStr = event.time_start && event.time_end
    ? `${event.time_start} – ${event.time_end}`
    : event.time_start ?? null

  const body = layout(`
    ${heading(`You're Registered, ${name.split(' ')[0]}!`)}
    ${para(`Your registration for <strong style="color:#2c0e68;">${event.title}</strong> has been confirmed. We look forward to seeing you there.`)}
    ${divider()}
    <table cellpadding="0" cellspacing="0" width="100%">
      ${dataRow('Event', event.title)}
      ${dataRow('Date', eventDate)}
      ${timeStr ? dataRow('Time', timeStr) : ''}
      ${event.location ? dataRow('Venue', event.location) : ''}
      ${event.speaker ? dataRow('Speaker', event.speaker) : ''}
      ${event.type ? dataRow('Format', event.type) : ''}
      ${dataRow('Amount Paid', `ZMW ${Number(amount).toLocaleString('en-ZM', { minimumFractionDigits: 2 })}`)}
      ${dataRow('Reference', reference)}
    </table>
    ${divider()}
    ${para('Please save this email as your confirmation. We will send you a reminder closer to the event date.')}
    ${goldButton('View Event Details', `${SITE_URL}/events/${event.id}`)}
  `)

  return resend.emails.send({
    from: FROM,
    to,
    subject: `You're registered: ${event.title} — Teleiosis Mandate`,
    html: body,
  })
}

// ─── 8. Event reminder → registrant (sent ~24h before) ──────────────────────

export async function sendEventReminder({
  to, name, event,
}: {
  to: string; name: string; event: EventDetails
}) {
  const eventDate = new Date(event.date).toLocaleDateString('en-ZM', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
  const timeStr = event.time_start && event.time_end
    ? `${event.time_start} – ${event.time_end}`
    : event.time_start ?? null

  const body = layout(`
    <p style="margin:0 0 16px;display:inline-block;padding:6px 14px;background:#d4af37;color:#2c0e68;font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;font-family:Arial,sans-serif;">Tomorrow</p>
    ${heading(`See You Tomorrow, ${name.split(' ')[0]}!`)}
    ${para(`This is a reminder that <strong style="color:#2c0e68;">${event.title}</strong> is happening tomorrow. We are looking forward to seeing you.`)}
    ${divider()}
    <table cellpadding="0" cellspacing="0" width="100%">
      ${dataRow('Event', event.title)}
      ${dataRow('Date', eventDate)}
      ${timeStr ? dataRow('Time', timeStr) : ''}
      ${event.location ? dataRow('Venue', event.location) : ''}
      ${event.speaker ? dataRow('Speaker', event.speaker) : ''}
      ${event.type ? dataRow('Format', event.type) : ''}
    </table>
    ${divider()}
    ${para('Please come prepared with an open heart and expectation. God is going to move!')}
    ${goldButton('View Event Details', `${SITE_URL}/events/${event.id}`)}
  `)

  return resend.emails.send({
    from: FROM,
    to,
    subject: `Reminder: ${event.title} is tomorrow — Teleiosis Mandate`,
    html: body,
  })
}

// ─── 9. Store purchase confirmation → user ───────────────────────────────────

export async function sendStorePurchaseConfirmation({
  to, name, amount, reference, productName,
}: {
  to: string; name: string; amount: number; reference: string; productName: string
}) {
  const body = layout(`
    ${heading(`Order Confirmed, ${name.split(' ')[0]}!`)}
    ${para(`Thank you for your purchase. Your order has been received and confirmed.`)}
    ${divider()}
    <table cellpadding="0" cellspacing="0" width="100%">
      ${dataRow('Item', productName)}
      ${dataRow('Amount', `ZMW ${Number(amount).toLocaleString('en-ZM', { minimumFractionDigits: 2 })}`)}
      ${dataRow('Reference', reference)}
      ${dataRow('Date', new Date().toLocaleDateString('en-ZM', { day: 'numeric', month: 'long', year: 'numeric' }))}
    </table>
    ${divider()}
    ${para('If you have any questions about your order, please reply to this email or contact us directly.')}
    <p style="margin:0;font-size:13px;color:#9090a8;font-family:Arial,sans-serif;">
      <a href="mailto:info@teleiosis.org" style="color:#4a0e68;">info@teleiosis.org</a>
    </p>
  `)

  return resend.emails.send({
    from: FROM,
    to,
    subject: `Order confirmed: ${productName} — Teleiosis Mandate`,
    html: body,
  })
}
