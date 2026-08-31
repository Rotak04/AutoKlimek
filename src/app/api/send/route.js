import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, service, message } = body;

    const data = await resend.emails.send({
      from: 'Auto Klímek <onboarding@resend.dev>', // Až si v Resendu ověříš vlastní doménu, můžeš změnit
      to: ['autoklimek@outlook.cz'], // Sem ti budou chodit poptávky
      subject: `Nová poptávka: ${service}`,
      html: `
        <h2>Nová poptávka z webu rotcode.cz</h2>
        <p><strong>Vybraná služba:</strong> ${service}</p>
        <p><strong>E-mail zákazníka:</strong> ${email}</p>
        <p><strong>Poznámka / Závada:</strong></p>
        <p>${message || 'Bez poznámky'}</p>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}