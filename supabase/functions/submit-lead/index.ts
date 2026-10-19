import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';

const NOTION_DATABASE_ID = 'f304ed54478b833db47e01bdf90f4692';
const GATEWAY_URL = 'https://connector-gateway.lovable.dev/notion/v1';

interface LeadPayload {
  firstName: string;
  lastName?: string;
  email: string;
  phone: string;
  message?: string;
}

function isString(v: unknown): v is string {
  return typeof v === 'string';
}

function validate(body: unknown): { ok: true; data: LeadPayload } | { ok: false; error: string } {
  if (!body || typeof body !== 'object') return { ok: false, error: 'Invalid body' };
  const b = body as Record<string, unknown>;
  const required = ['firstName', 'email', 'phone'];
  for (const k of required) {
    if (!isString(b[k]) || (b[k] as string).trim() === '') {
      return { ok: false, error: `Missing field: ${k}` };
    }
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(b.email as string)) {
    return { ok: false, error: 'Invalid email' };
  }
  const MAX_LENGTHS: Record<string, number> = {
    firstName: 100, lastName: 100,
    email: 254, phone: 30, message: 2000,
  };
  for (const [field, max] of Object.entries(MAX_LENGTHS)) {
    if (isString(b[field]) && (b[field] as string).length > max) {
      return { ok: false, error: `Field too long: ${field}` };
    }
  }
  return {
    ok: true,
    data: {
      firstName: (b.firstName as string).trim(),
      lastName: isString(b.lastName) ? (b.lastName as string).trim() : '',
      email: (b.email as string).trim(),
      phone: (b.phone as string).trim(),
      message: isString(b.message) ? (b.message as string).trim() : '',
    },
  };
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    const NOTION_API_KEY = Deno.env.get('NOTION_API_KEY');
    if (!LOVABLE_API_KEY) throw new Error('LOVABLE_API_KEY is not configured');
    if (!NOTION_API_KEY) throw new Error('NOTION_API_KEY is not configured');

    const json = await req.json().catch(() => null);
    const parsed = validate(json);
    if (!parsed.ok) {
      return new Response(JSON.stringify({ success: false, error: parsed.error }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    const d = parsed.data;

    const fullName = `${d.firstName}${d.lastName ? ' ' + d.lastName : ''}`.trim();
    const today = new Date().toISOString().slice(0, 10);

    const properties: Record<string, unknown> = {
      'Client Name': { title: [{ text: { content: fullName } }] },
      'Email': { email: d.email },
      'Phone': { phone_number: d.phone },
      'Last Contact': { date: { start: today } },
      'Process Status': { status: { name: 'Lead' } },
    };
    if (d.message) {
      properties['Message'] = { rich_text: [{ text: { content: d.message } }] };
    }

    const res = await fetch(`${GATEWAY_URL}/pages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'X-Connection-Api-Key': NOTION_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        parent: { database_id: NOTION_DATABASE_ID },
        properties,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      console.error('Notion error', res.status, data);
      return new Response(JSON.stringify({ success: false, error: 'Submission failed, please try again' }), {
        status: 502,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true, id: data.id }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Unknown error';
    console.error('submit-lead error', msg);
    return new Response(JSON.stringify({ success: false, error: 'Submission failed, please try again' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
