import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { name, email, company, companySize } = await req.json();

    // Validation
    if (!name || !email || !company || !companySize) {
      return NextResponse.json({ error: 'Champs requis manquants.' }, { status: 400 });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Format d\'email invalide.' }, { status: 400 });
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Demande de Démo Emineon <demo@emineon.com>',
      to: ['david.v@emineon.com'],
      subject: `Nouvelle demande de démo de ${name} chez ${company}`,
      replyTo: email,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Nouvelle demande de démo</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #0A2F5A 0%, #C75B12 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Nouvelle demande de démo</h1>
            <p style="color: #f0f0f0; margin: 10px 0 0 0;">Depuis votre page produit Emineon</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e9ecef;">
            <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h2 style="color: #0A2F5A; margin-top: 0; border-bottom: 2px solid #C75B12; padding-bottom: 10px;">Détails de la demande de démo</h2>
              
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
                <span style="margin-left: 10px;">${company}</span>
              </div>
              
              <div style="margin: 20px 0;">
                <strong style="color: #0A2F5A;">Taille de l'entreprise :</strong>
                <span style="margin-left: 10px; background: #e3f2fd; color: #0A2F5A; padding: 4px 8px; border-radius: 4px; font-size: 14px;">${companySize}</span>
              </div>
            </div>
            
            <div style="background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 8px; padding: 20px; margin-top: 20px;">
              <h3 style="color: #856404; margin: 0 0 10px 0; font-size: 16px;">📅 Prochaines étapes</h3>
              <p style="color: #856404; margin: 0; font-size: 14px;">
                Suivez ce prospect pour planifier une démo personnalisée. Considérez la taille de leur entreprise (${companySize}) lors de la préparation du contenu de la démo.
              </p>
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6;">
              <p style="color: #6c757d; font-size: 14px; margin: 0;">
                Cet email a été envoyé depuis le formulaire de demande de démo sur 
                <a href="https://emineon.com/fr/product" style="color: #C75B12; text-decoration: none;">emineon.com/fr/product</a>
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

    console.log('Demo request email sent successfully:', data);
    return NextResponse.json({ success: true, messageId: data?.id });

  } catch (err) {
    console.error('Demo form error:', err);
    return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 });
  }
} 