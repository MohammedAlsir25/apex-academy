export type EmailProviderChoice = 'auto' | 'resend' | 'postmark';
export type ResolvedEmailProvider = 'resend' | 'postmark' | 'preview';

export interface EmailSendPayload {
  to: string;
  subject: string;
  html: string;
  text: string;
  tag?: string;
}

export interface EmailSendOutcome {
  provider: ResolvedEmailProvider;
  status: 'sent' | 'simulated' | 'failed';
  externalMessageId: string | null;
  errorDetail: string | null;
}

export function getEmailProviderConfigStatus() {
  const resendKey = process.env.RESEND_API_KEY?.trim() ?? '';
  const postmarkToken = process.env.POSTMARK_SERVER_TOKEN?.trim() ?? '';
  const configuredDefault = (process.env.EMAIL_PROVIDER?.trim().toLowerCase() ?? '') as
    | 'resend'
    | 'postmark'
    | '';
  const fromAddress =
    process.env.EMAIL_FROM_ADDRESS?.trim() || 'Apex Academy <onboarding@resend.dev>';

  const resendConfigured = resendKey.length > 5;
  const postmarkConfigured = postmarkToken.length > 5;

  let activeProvider: ResolvedEmailProvider = 'preview';
  if (configuredDefault === 'resend' && resendConfigured) {
    activeProvider = 'resend';
  } else if (configuredDefault === 'postmark' && postmarkConfigured) {
    activeProvider = 'postmark';
  } else if (resendConfigured) {
    activeProvider = 'resend';
  } else if (postmarkConfigured) {
    activeProvider = 'postmark';
  }

  return {
    resendConfigured,
    postmarkConfigured,
    activeProvider,
    fromAddress,
    webhookSecretConfigured: (process.env.NOTIFICATION_WEBHOOK_SECRET?.trim().length ?? 0) >= 8,
  };
}

function resolveTargetProvider(preferred: EmailProviderChoice): ResolvedEmailProvider {
  const cfg = getEmailProviderConfigStatus();
  if (preferred === 'resend') {
    return cfg.resendConfigured ? 'resend' : 'preview';
  }
  if (preferred === 'postmark') {
    return cfg.postmarkConfigured ? 'postmark' : 'preview';
  }
  return cfg.activeProvider;
}

export async function dispatchTransactionalEmail(
  payload: EmailSendPayload,
  providerChoice: EmailProviderChoice = 'auto'
): Promise<EmailSendOutcome> {
  const cfg = getEmailProviderConfigStatus();
  const target = resolveTargetProvider(providerChoice);

  if (target === 'preview') {
    return {
      provider: 'preview',
      status: 'simulated',
      externalMessageId: `sim_${Date.now().toString(36)}`,
      errorDetail: null,
    };
  }

  if (target === 'resend') {
    const apiKey = process.env.RESEND_API_KEY?.trim() ?? '';
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          from: cfg.fromAddress,
          to: [payload.to],
          subject: payload.subject,
          html: payload.html,
          text: payload.text,
          tags: payload.tag ? [{ name: 'event', value: payload.tag }] : undefined,
        }),
      });

      const data = (await res.json().catch(() => ({}))) as { id?: string; message?: string };
      if (!res.ok) {
        return {
          provider: 'resend',
          status: 'failed',
          externalMessageId: null,
          errorDetail: data.message || `Resend returned HTTP ${res.status}`,
        };
      }

      return {
        provider: 'resend',
        status: 'sent',
        externalMessageId: data.id ?? null,
        errorDetail: null,
      };
    } catch (err) {
      return {
        provider: 'resend',
        status: 'failed',
        externalMessageId: null,
        errorDetail: err instanceof Error ? err.message : 'Resend request error',
      };
    }
  }

  // target === 'postmark'
  const serverToken = process.env.POSTMARK_SERVER_TOKEN?.trim() ?? '';
  try {
    const res = await fetch('https://api.postmarkapp.com/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-Postmark-Server-Token': serverToken,
      },
      body: JSON.stringify({
        From: cfg.fromAddress,
        To: payload.to,
        Subject: payload.subject,
        HtmlBody: payload.html,
        TextBody: payload.text,
        Tag: payload.tag ?? 'apex-notification',
        MessageStream: 'outbound',
      }),
    });

    const data = (await res.json().catch(() => ({}))) as { MessageID?: string; Message?: string };
    if (!res.ok) {
      return {
        provider: 'postmark',
        status: 'failed',
        externalMessageId: null,
        errorDetail: data.Message || `Postmark returned HTTP ${res.status}`,
      };
    }

    return {
      provider: 'postmark',
      status: 'sent',
      externalMessageId: data.MessageID ?? null,
      errorDetail: null,
    };
  } catch (err) {
    return {
      provider: 'postmark',
      status: 'failed',
      externalMessageId: null,
      errorDetail: err instanceof Error ? err.message : 'Postmark request error',
    };
  }
}
