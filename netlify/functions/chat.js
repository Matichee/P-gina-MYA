const SYSTEM_PROMPT = `Sos el asistente de MyA Tecnoservice, servicio técnico de celulares y computadoras.

REGLAS:
- Respondé siempre en 2-3 oraciones máximo. Directo al punto.
- Nada de rodeos. Si no sabés el precio exacto, decí que varía y que manden descripción o foto para presupuesto gratis.
- Usá español rioplatense (vos).
- No uses emojis.

DATOS:
- Servicios: pantallas, baterías, conectores, formateo, virus, mantenimiento, hardware
- Marcas celulares: Samsung, iPhone, Motorola, Xiaomi y más
- Garantía: sí, en todas las reparaciones
- Presupuesto: gratis y sin compromiso
- Tiempos: mayoría en el día o 24hs
- Contacto: WhatsApp o Instagram @tecnoservice_mya
- Si preguntan precio: varía según el equipo, pediles que describan el problema para dar presupuesto`;

export default async (request) => {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const { messages } = await request.json();

    const geminiContents = messages.map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }));

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents: geminiContents,
          generationConfig: { maxOutputTokens: 300, temperature: 0.7 }
        })
      }
    );

    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text
      || 'No pude procesar la consulta. Escribinos por WhatsApp o Instagram.';

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error interno' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const config = { path: '/.netlify/functions/chat' };
