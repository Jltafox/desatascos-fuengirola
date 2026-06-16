import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();
  const nombre = (data.get('nombre') as string | null)?.trim() ?? '';
  const telefono = (data.get('telefono') as string | null)?.trim() ?? '';
  const mensaje = (data.get('mensaje') as string | null)?.trim() ?? '';
  const origen = (data.get('origen') as string | null)?.trim() ?? '';

  if (!nombre || !telefono) {
    return new Response(JSON.stringify({ ok: false, error: 'Faltan campos obligatorios' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const token = import.meta.env.TELEGRAM_BOT_TOKEN;
  const chatId = import.meta.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return new Response(JSON.stringify({ ok: false, error: 'Bot no configurado' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const fecha = new Date().toLocaleString('es-ES', {
    timeZone: 'Europe/Madrid',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const text = [
    '🔔 <b>Nuevo contacto — Ecilimp</b>',
    '',
    `👤 <b>Nombre:</b> ${escapeHtml(nombre)}`,
    `📞 <b>Teléfono:</b> <a href="tel:${escapeHtml(telefono)}">${escapeHtml(telefono)}</a>`,
    mensaje ? `💬 <b>Mensaje:</b> ${escapeHtml(mensaje)}` : '',
    '',
    origen ? `🌐 <b>Página:</b> ${escapeHtml(origen)}` : '',
    `🕐 ${fecha}`,
  ]
    .filter((l) => l !== undefined)
    .join('\n');

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML', disable_web_page_preview: true }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error('Telegram error:', err);
    return new Response(JSON.stringify({ ok: false, error: 'Error enviando mensaje' }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};

function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
