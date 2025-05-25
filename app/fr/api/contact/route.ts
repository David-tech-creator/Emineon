import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { name, email, company, message } = await req.json();

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Champs requis manquants.' }, { status: 400 });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Format d\'email invalide.' }, { status: 400 });
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Formulaire de Contact Emineon <noreply@emineon.com>',
      to: ['david.v@emineon.com'],
      subject: `Nouvelle soumission de formulaire de contact de ${name}`,
      replyTo: email,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Nouvelle soumission de formulaire de contact</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #0A2F5A 0%, #C75B12 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Nouvelle soumission de formulaire de contact</h1>
            <p style="color: #f0f0f0; margin: 10px 0 0 0;">Depuis votre site web Emineon</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e9ecef;">
            <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h2 style="color: #0A2F5A; margin-top: 0; border-bottom: 2px solid #C75B12; padding-bottom: 10px;">Détails du contact</h2>
              
              <div style="margin: 20px 0;">
                <strong style="color: #0A2F5A;">Nom :</strong>
                <span style="margin-left: 10px;">${name}</span>
              </div>
              
              <div style="margin: 20px 0;">
                <strong style="color: #0A2F5A;">Email :</strong>
                <a href="mailto:${email}" style="color: #C75B12; text-decoration: none; margin-left: 10px;">${email}</a>
              </div>
              
              <div style="margin: 20px 0;">
                <strong style="color: #0A2F5A;">Entreprise :</strong>
                <span style="margin-left: 10px;">${company || 'Non fourni'}</span>
              </div>
              
              <div style="margin: 20px 0;">
                <strong style="color: #0A2F5A;">Message :</strong>
                <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin-top: 10px; border-left: 4px solid #C75B12;">
                  ${message.replace(/\n/g, '<br/>')}
                </div>
              </div>
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6;">
              <p style="color: #6c757d; font-size: 14px; margin: 0;">
                Cet email a été envoyé depuis le formulaire de contact sur 
                <a href="https://emineon.com/fr" style="color: #C75B12; text-decoration: none;">emineon.com</a>
              </p>
              <p style="color: #6c757d; font-size: 12px; margin: 10px 0 0 0;">
                Reçu le ${new Date().toLocaleString('fr-FR', { 
                  timeZone: 'Europe/Zurich',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  timeZoneName: 'short'
                })}
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: 'Échec de l\'envoi de l\'email.' }, { status: 500 });
    }

    console.log('Email sent successfully:', data);
    return NextResponse.json({ success: true, messageId: data?.id });

  } catch (err) {
    console.error('Contact form error:', err);
    return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 });
  }
} 