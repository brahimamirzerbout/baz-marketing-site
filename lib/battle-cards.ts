import { getCompetitor } from "@/content/competitors";
import { getDb, audit, id } from "@/lib/db";

export interface BattleCardRequest {
  email: string;
  competitor: string;
  name: string;
  company: string;
}

export interface BattleCardResult {
  ok: boolean;
  message: string;
  leadId?: string;
}

function buildBattleCardHtml(competitorSlug: string, recipientName: string): string {
  const competitor = getCompetitor(competitorSlug);
  const displayName = competitor ? competitor.name : competitorSlug;

  const strengths = competitor
    ? competitor.comparison.slice(0, 3).map((c) => c.keyDifferentiator)
    : [
        "Senior-only team with no translation layer between strategy and execution.",
        "Cross-industry pattern recognition that only a senior agency accumulates.",
        "Revenue outcomes first, platform second. No tool-only engagements.",
      ];

  const limits = competitor ? competitor.limits.slice(0, 3) : [
    "Senior attention diluted across many accounts.",
    "Account-manager layer slows decisions.",
    "Quality varies by who is staffed that week.",
  ];

  const pricingNote = competitor
    ? `${competitor.pricing.model}: ${competitor.pricing.range}. ${competitor.pricing.note}`
    : "Pricing varies. Request a custom quote.";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>BAZventures Battle Card — ${displayName}</title>
</head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#e5e5e5;-webkit-font-smoothing:antialiased;">

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#0a0a0a;padding:40px 0;">
    <tr>
      <td align="center" style="padding:0 16px;">

        <!-- Card container -->
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="background:#141414;border:1px solid #262626;border-radius:0;max-width:600px;width:100%;">

          <!-- Header / Logo wordmark -->
          <tr>
            <td style="padding:32px 40px 28px;border-bottom:1px solid #262626;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="width:32px;height:32px;background:#e5e5e5;border-radius:0;text-align:center;vertical-align:middle;font-weight:700;font-size:14px;color:#0a0a0a;line-height:32px;letter-spacing:0.05em;">B</td>
                  <td style="padding-left:10px;font-size:20px;font-weight:600;color:#f5f5f5;letter-spacing:-0.01em;line-height:32px;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">BAZventures</td>
                </tr>
              </table>
              <p style="margin:8px 0 0;font-size:11px;text-transform:uppercase;letter-spacing:0.15em;color:#737373;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">Battle Card — Confidential</p>
            </td>
          </tr>

          <!-- Title -->
          <tr>
            <td style="padding:28px 40px 8px;">
              <p style="margin:0;font-size:11px;text-transform:uppercase;letter-spacing:0.12em;color:#a3a3a3;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">Prepared for</p>
              <p style="margin:4px 0 0;font-size:22px;font-weight:600;color:#f5f5f5;line-height:1.3;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">${recipientName}</p>
            </td>
          </tr>

          <!-- Competitor banner -->
          <tr>
            <td style="padding:8px 40px 24px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#1a1a1a;border:1px solid #262626;">
                <tr>
                  <td style="padding:20px 24px;">
                    <p style="margin:0;font-size:10px;text-transform:uppercase;letter-spacing:0.15em;color:#737373;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">Competitor evaluated</p>
                    <p style="margin:6px 0 0;font-size:18px;font-weight:600;color:#f5f5f5;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">${displayName}</p>
                    ${competitor ? `<p style="margin:6px 0 0;font-size:13px;color:#a3a3a3;line-height:1.5;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">${competitor.tagline}</p>` : ''}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Pricing comparison -->
          <tr>
            <td style="padding:0 40px 24px;">
              <p style="margin:0 0 10px;font-size:10px;text-transform:uppercase;letter-spacing:0.15em;color:#737373;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">Pricing comparison</p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #262626;">
                <tr>
                  <td style="padding:14px 18px;border-bottom:1px solid #262626;background:#141414;">
                    <p style="margin:0;font-size:13px;font-weight:600;color:#f5f5f5;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">${displayName}</p>
                  </td>
                  <td style="padding:14px 18px;border-bottom:1px solid #262626;background:#1a1a1a;text-align:right;">
                    <p style="margin:0;font-size:13px;font-weight:600;color:#a3a3a3;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">BAZventures</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:14px 18px;border-bottom:1px solid #262626;background:#141414;">
                    <p style="margin:0;font-size:13px;color:#e5e5e5;line-height:1.5;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">${pricingNote}</p>
                  </td>
                  <td style="padding:14px 18px;border-bottom:1px solid #262626;background:#1a1a1a;text-align:right;">
                    <p style="margin:0;font-size:13px;color:#e5e5e5;line-height:1.5;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">Custom engagement scope</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:14px 18px;background:#141414;">
                    <p style="margin:0;font-size:13px;color:#e5e5e5;line-height:1.5;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">${competitor?.pricing.note || 'Varies by contract terms.'}</p>
                  </td>
                  <td style="padding:14px 18px;background:#1a1a1a;text-align:right;">
                    <p style="margin:0;font-size:13px;color:#e5e5e5;line-height:1.5;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">Outcome-aligned, no unused retainer hours</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Competitor limits -->
          <tr>
            <td style="padding:0 40px 24px;">
              <p style="margin:0 0 10px;font-size:10px;text-transform:uppercase;letter-spacing:0.15em;color:#737373;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">Top 3 limits of ${displayName}</p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                ${limits.map((limit, i) => `
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #1f1f1f;${i === limits.length - 1 ? 'border-bottom:none;' : ''}">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="padding-right:12px;vertical-align:top;">
                          <span style="display:inline-block;width:20px;height:20px;background:#262626;color:#a3a3a3;text-align:center;line-height:20px;font-size:11px;font-weight:600;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">${i + 1}</span>
                        </td>
                        <td style="font-size:13px;color:#d4d4d4;line-height:1.5;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">${limit}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                `).join('')}
              </table>
            </td>
          </tr>

          <!-- BAZventures strengths -->
          <tr>
            <td style="padding:0 40px 28px;">
              <p style="margin:0 0 10px;font-size:10px;text-transform:uppercase;letter-spacing:0.15em;color:#737373;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">Why BAZventures wins</p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                ${strengths.map((strength, i) => `
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #1f1f1f;${i === strengths.length - 1 ? 'border-bottom:none;' : ''}">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="padding-right:12px;vertical-align:top;">
                          <span style="display:inline-block;width:20px;height:20px;background:#f5f5f5;color:#0a0a0a;text-align:center;line-height:20px;font-size:11px;font-weight:700;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">✓</span>
                        </td>
                        <td style="font-size:13px;color:#d4d4d4;line-height:1.5;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">${strength}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                `).join('')}
              </table>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:0 40px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr><td style="border-top:1px solid #262626;"></td></tr>
              </table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding:28px 40px 32px;text-align:center;">
              <p style="margin:0 0 16px;font-size:14px;color:#a3a3a3;line-height:1.5;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">This breakdown only scratches the surface.<br/>Let&apos;s discuss what this means for your engagement.</p>
              <a href="https://bazventures.com/book" style="display:inline-block;padding:14px 32px;background:#f5f5f5;color:#0a0a0a;text-decoration:none;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">Book a strategy call</a>
              <p style="margin:12px 0 0;font-size:11px;color:#525252;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">No commitment required — 30 minutes with a senior partner.</p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 40px;border-top:1px solid #262626;background:#0f0f0f;">
              <p style="margin:0;font-size:11px;color:#525252;text-align:center;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">BAZventures — brazierbourohibrahim@gmail.com</p>
              <p style="margin:4px 0 0;font-size:10px;color:#404040;text-align:center;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">This battle card is confidential and intended solely for the recipient.</p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>`;
}

export async function generateBattleCardHtml(competitorSlug: string, recipientName: string): Promise<string> {
  return buildBattleCardHtml(competitorSlug, recipientName);
}

export async function sendBattleCard(
  email: string,
  competitor: string,
  htmlBuffer: Buffer,
): Promise<void> {
  if (process.env.NODE_ENV !== "production") {
    console.log("[battle-cards][dev] Would send battle card:", {
      to: email,
      competitor,
      contentLength: htmlBuffer.length,
      preview: htmlBuffer.toString().slice(0, 200),
    });
    return;
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey) {
    console.warn("[battle-cards] RESEND_API_KEY not set — skipping email delivery.");
    return;
  }

  const from = process.env.BATTLE_CARD_FROM || "BAZventures <partners@bazventures.com>";
  const competitorData = getCompetitor(competitor);
  const subject = competitorData
    ? `Your BAZventures Battle Card: ${competitorData.name}`
    : "Your BAZventures Battle Card";

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from,
        to: email,
        subject,
        html: htmlBuffer.toString("utf-8"),
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("[battle-cards] Resend delivery failed:", response.status, errText);
    } else {
      console.log("[battle-cards] Resend delivery success for:", email);
    }
  } catch (err) {
    console.error("[battle-cards] Resend delivery error:", err);
  }
}

export async function createBattleCardLead(data: BattleCardRequest): Promise<string> {
  const db = getDb();
  const leadId = id("l");
  const { email, competitor, name, company } = data;

  db.prepare(
    `INSERT INTO leads (id, name, email, company, message, source, service)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
  ).run(
    leadId,
    name,
    email,
    company,
    `Battle card request for competitor: ${competitor}`,
    "battle_card",
    "strategy-consulting",
  );

  audit(null, "battle_card.lead.create", leadId, { competitor, email });
  return leadId;
}
