// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { Resend } from "https://esm.sh/resend@2";

const resendApiKey = Deno.env.get("RESEND_API_KEY");
if (!resendApiKey) {
  console.error("RESEND_API_KEY not set");
}
const resend = new Resend(resendApiKey);

console.info("send-email function started");

Deno.serve(async (req: Request) => {
  try {
    const body = await req.json().catch(() => null);
    const record = body?.record ?? body?.new ?? body;

    if (!record || !record.email || !record.name) {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid payload: missing record, name or email" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Email to admin (you)
    await resend.emails.send({
      from: "no-reply@yourdomain.com",
      to: "ezranyamwange2@gmail.com",
      subject: `New message from ${record.name}`,
      html: `
        <h2>New Contact Form Message</h2>
        <p><strong>Name:</strong> ${record.name}</p>
        <p><strong>Email:</strong> ${record.email}</p>
        <p><strong>Phone:</strong> ${record.phone ?? ""}</p>
        <p><strong>Subject:</strong> ${record.subject ?? ""}</p>
        <p><strong>Message:</strong></p>
        <p>${record.message ?? ""}</p>
      `,
    });

    // Confirmation email to sender
    await resend.emails.send({
      from: "no-reply@yourdomain.com",
      to: record.email,
      subject: "We’ve received your message!",
      html: `
        <h2>Hi ${record.name},</h2>
        <p>Thank you for contacting Lashawn College.</p>
        <p>We’ve received your message and will get back to you as soon as possible.</p>
        <p>Best,<br/>The Lashawn Team</p>
      `,
    });

    return new Response(
      JSON.stringify({ success: true, message: "Emails sent successfully" }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in send-email function:", error);
    return new Response(
      JSON.stringify({ success: false, error: String(error) }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
});
