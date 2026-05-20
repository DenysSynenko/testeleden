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
  timeline: string;
  message: string;
}

function isString(v: unknown): v is string {
  return typeof v === 'string';
}

function validate(body: unknown): { ok: true; data: LeadPayload } | { ok: false; error: string } {
  if (!body || typeof body !== 'object') return { ok: false, error: 'Invalid body' };
  const b = body as Record<string, unknown>;
  const required = ['firstName', 'company', 'instagram', 'email', 'goal', 'budget', 'timeline', 'message'];
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
      timeline: (b.timeline as string).trim(),
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

    const addressLines = [
      `Company: ${d.company}`,
      `Instagram: ${d.instagram}`,
      d.website ? `Website: ${d.website}` : null,
      `Goal: ${d.goal} · Budget: ${d.budget} · Timeline: ${d.timeline}`,
      '',
      `Message: ${d.message}`,
    ].filter(Boolean).join('\n');

    const properties: Record<string, unknown> = {
      'Client Name': { title: [{ text: { content: fullName } }] },
      'Email': { email: d.email },
      'Address': { rich_text: [{ text: { content: addressLines } }] },
      'Last Contact': { date: { start: today } },
      'Process Status': { status: { name: 'Lead' } },
    };
    if (d.phone) {
      properties['Phone'] = { phone_number: d.phone };
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