import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';

const NOTION_DATABASE_ID = 'f304ed54478b833db47e01bdf90f4692';
const GATEWAY_URL = 'https://connector-gateway.lovable.dev/notion/v1';

interface LeadPayload {
  firstName: string;
  lastName?: string;
  company: string;
  instagram: string;
  email: string;
  phone?: string;
  website?: string;
  goal: string;
  budget: string;
  message: string;
}

function isString(v: unknown): v is string {
  return typeof v === 'string';
}

function validate(body: unknown): { ok: true; data: LeadPayload } | { ok: false; error: string } {
  if (!body || typeof body !== 'object') return { ok: false, error: 'Invalid body' };
  const b = body as Record<string, unknown>;
  const required = ['firstName', 'company', 'instagram', 'email', 'goal', 'budget', 'message'];
  for (const k of required) {
    if (!isString(b[k]) || (b[k] as string).trim() === '') {
      return { ok: false, error: `Missing field: ${k}` };
    }
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(b.email as string)) {
    return { ok: false, error: 'Invalid email' };
  }
  return {
    ok: true,
    data: {
      firstName: (b.firstName as string).trim(),
      lastName: isString(b.lastName) ? (b.lastName as string).trim() : '',
      company: (b.company as string).trim(),
      instagram: (b.instagram as string).trim(),
      email: (b.email as string).trim(),
      phone: isString(b.phone) ? (b.phone as string).trim() : '',
      website: isString(b.website) ? (b.website as string).trim() : '',
      goal: (b.goal as string).trim(),
      budget: (b.budget as string).trim(),
      message: (b.message as string).trim(),
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

    const instagramUrl = d.instagram.startsWith('http')
      ? d.instagram
      : `https://instagram.com/${d.instagram.replace(/^@/, '')}`;
    const websiteUrl = d.website
      ? (d.website.startsWith('http') ? d.website : `https://${d.website}`)
      : '';

    const properties: Record<string, unknown> = {
      'Client Name': { title: [{ text: { content: fullName } }] },
      'Email': { email: d.email },
      'Company': { rich_text: [{ text: { content: d.company } }] },
      'Instagram': { url: instagramUrl },
      'Goal': { select: { name: d.goal } },
      'Budget': { select: { name: d.budget } },
      'Message': { rich_text: [{ text: { content: d.message } }] },
      'Last Contact': { date: { start: today } },
      'Process Status': { status: { name: 'Lead' } },
    };
    if (websiteUrl) properties['Website'] = { url: websiteUrl };
    if (d.phone) properties['Phone'] = { phone_number: d.phone };

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
      return new Response(JSON.stringify({ success: false, error: 'Notion request failed', details: data }), {
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
    return new Response(JSON.stringify({ success: false, error: msg }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});