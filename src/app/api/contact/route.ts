import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Simple HTML sanitizer helper to prevent script injection in email body
function sanitizeInput(str: string): string {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim();
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      name: rawName,
      email: rawEmail,
      phone: rawPhone,
      countryCode: rawCountryCode,
      service: rawService,
      customService: rawCustomService,
      message: rawMessage,
      website: honeypot, // Honeypot field for bot prevention
    } = body || {};

    // 1. Honeypot check: If the hidden bot field is filled, reject
    if (honeypot && String(honeypot).trim() !== '') {
      return NextResponse.json(
        { success: false, message: 'Invalid submission' },
        { status: 400 }
      );
    }

    // 2. Server-side sanitization & normalization
    const name = sanitizeInput(rawName || '');
    const email = (rawEmail || '').trim().toLowerCase();
    const phone = sanitizeInput(rawPhone || '');
    const countryCode = sanitizeInput(rawCountryCode || '');
    const serviceChoice = sanitizeInput(rawService || '');
    const customService = sanitizeInput(rawCustomService || '');
    const message = sanitizeInput(rawMessage || '');

    const finalService =
      serviceChoice === 'Other' && customService
        ? customService
        : serviceChoice || 'Not specified';

    const fullPhone = phone
      ? `${countryCode ? countryCode + ' ' : ''}${phone}`
      : 'Not provided';

    // 3. Validation
    if (!name) {
      return NextResponse.json(
        { success: false, message: 'Name is required' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    if (!message || message.length < 3) {
      return NextResponse.json(
        { success: false, message: 'Message must be at least 3 characters long' },
        { status: 400 }
      );
    }

    if (message.length > 5000) {
      return NextResponse.json(
        { success: false, message: 'Message exceeds maximum length of 5000 characters' },
        { status: 400 }
      );
    }

    // 4. Resend API Initialization
    const apiKey = process.env.RESEND_API_KEY;
    const founderEmail = process.env.FOUNDER_EMAIL || 'rafiqsheriffs@gmail.com';

    if (!apiKey) {
      console.error('RESEND_API_KEY environment variable is not defined.');
      return NextResponse.json(
        {
          success: false,
          message: 'Server configuration error. Please try again later or email us directly.',
        },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);
    const senderFrom = 'SHERIFIQ <hello@sherifiq.in>';
    const notificationFrom = 'SHERIFIQ Website <hello@sherifiq.in>';

    // 5. Build HTML Email 1 — Visitor Confirmation Email (Using Signature Blue #5b72ff Theme & navbar-logo.svg)
    const visitorHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Thanks for contacting SHERIFIQ</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #f4f4f7; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #181538;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f4f4f7; padding: 30px 15px;">
            <tr>
              <td align="center">
                <table role="presentation" width="100%" maxWidth="600" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #ffffff; border-radius: 20px; overflow: hidden; border: 1px solid #e6e6ed; box-shadow: 0 6px 24px rgba(0,0,0,0.06);">
                  <!-- Header: Signature SHERIFIQ Blue #5b72ff with Brand Logo -->
                  <tr>
                    <td style="background-color: #5b72ff; padding: 32px 32px; text-align: left;">
                      <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="vertical-align: middle; padding-right: 14px;">
                            <img src="https://www.sherifiq.in/assets/logo/navbar-logo.svg" alt="SHERIFIQ Logo" width="28" height="42" style="display: block; border: 0; width: 28px; height: 42px;" />
                          </td>
                          <td style="vertical-align: middle;">
                            <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700; letter-spacing: 0.14em; font-family: 'Sora', sans-serif;">SHERIFIQ</h1>
                            <p style="color: rgba(255, 255, 255, 0.88); margin: 3px 0 0 0; font-size: 12px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.08em;">Digital Experiences &amp; Web Engineering</p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Body Content -->
                  <tr>
                    <td style="padding: 36px 32px;">
                      <h2 style="margin: 0 0 16px 0; color: #181538; font-size: 20px; font-weight: 600;">Hi ${name},</h2>
                      <p style="margin: 0 0 20px 0; color: #4a4a68; font-size: 15px; line-height: 1.6;">
                        Thanks for reaching out to SHERIFIQ. We've received your project enquiry and will review the details. We'll get back to you within 24 hours.
                      </p>

                      <!-- Summary Box -->
                      <div style="background-color: #f8f9ff; border: 1px solid #e0e5ff; border-radius: 14px; padding: 22px; margin: 24px 0;">
                        <p style="margin: 0 0 6px 0; font-size: 12px; text-transform: uppercase; font-weight: 700; color: #5b72ff; letter-spacing: 0.06em;">Project Type</p>
                        <p style="margin: 0 0 18px 0; font-size: 16px; font-weight: 600; color: #181538;">${finalService}</p>

                        <p style="margin: 0 0 6px 0; font-size: 12px; text-transform: uppercase; font-weight: 700; color: #5b72ff; letter-spacing: 0.06em;">Your Message</p>
                        <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #33334d; white-space: pre-wrap;">${message}</p>
                      </div>

                      <p style="margin: 24px 0 0 0; color: #4a4a68; font-size: 15px; line-height: 1.6;">
                        Best,<br>
                        <strong style="color: #181538;">SHERIFIQ</strong><br>
                        <span style="font-size: 13px; color: #666680;">Digital Experiences &amp; Web Engineering</span><br>
                        <a href="https://www.sherifiq.in/" style="color: #5b72ff; text-decoration: none; font-weight: 600;">https://www.sherifiq.in/</a>
                      </p>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="background-color: #f8f9fa; padding: 20px 32px; border-top: 1px solid #eeeeee; text-align: center; font-size: 12px; color: #888899;">
                      &copy; ${new Date().getFullYear()} SHERIFIQ. All rights reserved.
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `;

    const visitorText = `Hi ${name},

Thanks for reaching out to SHERIFIQ.

We've received your project enquiry and will review the details. We'll get back to you within 24 hours.

Project type:
${finalService}

Your message:
${message}

Best,
SHERIFIQ
Digital Experiences & Web Engineering
https://www.sherifiq.in/
`;

    // 6. Build HTML Email 2 — Founder Notification Email (Using Signature Blue #5b72ff Theme & navbar-logo.svg)
    const founderHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New SHERIFIQ Enquiry — ${name}</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #f4f4f7; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #181538;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f4f4f7; padding: 30px 15px;">
            <tr>
              <td align="center">
                <table role="presentation" width="100%" maxWidth="650" cellspacing="0" cellpadding="0" style="max-width: 650px; background-color: #ffffff; border-radius: 20px; overflow: hidden; border: 1px solid #e6e6ed; box-shadow: 0 6px 24px rgba(0,0,0,0.06);">
                  <!-- Header: Signature SHERIFIQ Blue #5b72ff with Brand Logo -->
                  <tr>
                    <td style="background-color: #5b72ff; padding: 32px 32px; text-align: left;">
                      <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="vertical-align: middle; padding-right: 14px;">
                            <img src="https://www.sherifiq.in/assets/logo/navbar-logo.svg" alt="SHERIFIQ Logo" width="28" height="42" style="display: block; border: 0; width: 28px; height: 42px;" />
                          </td>
                          <td style="vertical-align: middle;">
                            <p style="color: rgba(255, 255, 255, 0.88); margin: 0 0 2px 0; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em;">SHERIFIQ Website Enquiry</p>
                            <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 700;">New Project Enquiry from ${name}</h1>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 32px;">
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse: collapse;">
                        <tr>
                          <td style="padding: 11px 0; border-bottom: 1px solid #eeeeee; font-weight: 600; width: 140px; color: #181538; font-size: 14px;">Name:</td>
                          <td style="padding: 11px 0; border-bottom: 1px solid #eeeeee; color: #33334d; font-size: 14px; font-weight: 500;">${name}</td>
                        </tr>
                        <tr>
                          <td style="padding: 11px 0; border-bottom: 1px solid #eeeeee; font-weight: 600; color: #181538; font-size: 14px;">Email:</td>
                          <td style="padding: 11px 0; border-bottom: 1px solid #eeeeee; color: #5b72ff; font-size: 14px;"><a href="mailto:${email}" style="color: #5b72ff; text-decoration: none; font-weight: 600;">${email}</a></td>
                        </tr>
                        <tr>
                          <td style="padding: 11px 0; border-bottom: 1px solid #eeeeee; font-weight: 600; color: #181538; font-size: 14px;">Phone:</td>
                          <td style="padding: 11px 0; border-bottom: 1px solid #eeeeee; color: #33334d; font-size: 14px;">${fullPhone}</td>
                        </tr>
                        <tr>
                          <td style="padding: 11px 0; border-bottom: 1px solid #eeeeee; font-weight: 600; color: #181538; font-size: 14px;">Service Required:</td>
                          <td style="padding: 11px 0; border-bottom: 1px solid #eeeeee; color: #181538; font-weight: 600; font-size: 14px;">${finalService}</td>
                        </tr>
                        <tr>
                          <td style="padding: 11px 0; border-bottom: 1px solid #eeeeee; font-weight: 600; color: #181538; font-size: 14px;">Submitted From:</td>
                          <td style="padding: 11px 0; border-bottom: 1px solid #eeeeee; color: #33334d; font-size: 14px;"><a href="https://www.sherifiq.in/contact" style="color: #5b72ff; text-decoration: none; font-weight: 500;">https://www.sherifiq.in/contact</a></td>
                        </tr>
                      </table>

                      <div style="margin-top: 24px;">
                        <p style="margin: 0 0 8px 0; font-weight: 700; color: #181538; font-size: 14px;">Project Details / Message:</p>
                        <div style="background-color: #f8f9ff; border: 1px solid #e0e5ff; border-radius: 10px; padding: 18px; color: #1a202c; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${message}</div>
                      </div>
                    </td>
                  </tr>
                  <!-- Footer -->
                  <tr>
                    <td style="background-color: #f8f9fa; padding: 18px 32px; border-top: 1px solid #eeeeee; text-align: center; font-size: 12px; color: #888899;">
                      Reply to this email directly to respond to ${name} (${email})
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `;

    const founderText = `NEW PROJECT ENQUIRY

Name: ${name}
Email: ${email}
Phone: ${fullPhone}
Service: ${finalService}

Project Details:
${message}

Submitted from:
https://www.sherifiq.in/contact
`;

    // 7. Dispatch both emails concurrently using Promise.allSettled
    const [visitorResult, founderResult] = await Promise.allSettled([
      resend.emails.send({
        from: senderFrom,
        to: [email],
        subject: 'Thanks for contacting SHERIFIQ',
        html: visitorHtml,
        text: visitorText,
      }),
      resend.emails.send({
        from: notificationFrom,
        to: [founderEmail],
        replyTo: email,
        subject: `New SHERIFIQ Enquiry — ${name}`,
        html: founderHtml,
        text: founderText,
      }),
    ]);

    // Check dispatch statuses
    if (visitorResult.status === 'rejected') {
      console.error('Failed to send visitor confirmation email:', visitorResult.reason);
    }
    if (founderResult.status === 'rejected') {
      console.error('Failed to send founder notification email:', founderResult.reason);
    }

    // If both failed, return error response
    if (visitorResult.status === 'rejected' && founderResult.status === 'rejected') {
      return NextResponse.json(
        {
          success: false,
          message: 'Failed to deliver message emails. Please try again or email directly.',
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully',
    });
  } catch (error: any) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'An unexpected error occurred while processing your request.',
      },
      { status: 500 }
    );
  }
}
