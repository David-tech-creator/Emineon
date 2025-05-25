interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  message: string;
  type?: 'general' | 'talent' | 'hiring' | 'partnership';
  language?: 'en' | 'fr';
}

export function generateContactEmailHTML(data: ContactFormData): string {
  const { name, email, company, message, type = 'general', language = 'en' } = data;
  
  const isEnglish = language === 'en';
  
  const labels = {
    title: isEnglish ? 'New Contact Form Submission' : 'Nouvelle soumission de formulaire de contact',
    subtitle: isEnglish ? 'From your Emineon website' : 'Depuis votre site web Emineon',
    contactDetails: isEnglish ? 'Contact Details' : 'Détails du contact',
    name: isEnglish ? 'Name:' : 'Nom :',
    email: isEnglish ? 'Email:' : 'Email :',
    company: isEnglish ? 'Company:' : 'Entreprise :',
    message: isEnglish ? 'Message:' : 'Message :',
    inquiryType: isEnglish ? 'Inquiry Type:' : 'Type de demande :',
    notProvided: isEnglish ? 'Not provided' : 'Non fourni',
    footer: isEnglish 
      ? 'This email was sent from the contact form on' 
      : 'Cet email a été envoyé depuis le formulaire de contact sur',
    received: isEnglish ? 'Received on' : 'Reçu le'
  };

  const typeLabels = {
    general: isEnglish ? 'General Inquiry' : 'Demande générale',
    talent: isEnglish ? 'Talent/Career Inquiry' : 'Demande de talent/carrière',
    hiring: isEnglish ? 'Hiring/Recruitment' : 'Recrutement',
    partnership: isEnglish ? 'Partnership Inquiry' : 'Demande de partenariat'
  };

  const websiteUrl = isEnglish ? 'https://emineon.com' : 'https://emineon.com/fr';
  const locale = isEnglish ? 'en-US' : 'fr-FR';

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${labels.title}</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #0A2F5A 0%, #C75B12 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 24px;">${labels.title}</h1>
        <p style="color: #f0f0f0; margin: 10px 0 0 0;">${labels.subtitle}</p>
      </div>
      
      <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e9ecef;">
        <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <h2 style="color: #0A2F5A; margin-top: 0; border-bottom: 2px solid #C75B12; padding-bottom: 10px;">${labels.contactDetails}</h2>
          
          <div style="margin: 20px 0;">
            <strong style="color: #0A2F5A;">${labels.name}</strong>
            <span style="margin-left: 10px;">${name}</span>
          </div>
          
          <div style="margin: 20px 0;">
            <strong style="color: #0A2F5A;">${labels.email}</strong>
            <a href="mailto:${email}" style="color: #C75B12; text-decoration: none; margin-left: 10px;">${email}</a>
          </div>
          
          <div style="margin: 20px 0;">
            <strong style="color: #0A2F5A;">${labels.company}</strong>
            <span style="margin-left: 10px;">${company || labels.notProvided}</span>
          </div>

          <div style="margin: 20px 0;">
            <strong style="color: #0A2F5A;">${labels.inquiryType}</strong>
            <span style="margin-left: 10px; background: #e3f2fd; color: #0A2F5A; padding: 4px 8px; border-radius: 4px; font-size: 14px;">${typeLabels[type]}</span>
          </div>
          
          <div style="margin: 20px 0;">
            <strong style="color: #0A2F5A;">${labels.message}</strong>
            <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin-top: 10px; border-left: 4px solid #C75B12;">
              ${message.replace(/\n/g, '<br/>')}
            </div>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6;">
          <p style="color: #6c757d; font-size: 14px; margin: 0;">
            ${labels.footer} 
            <a href="${websiteUrl}" style="color: #C75B12; text-decoration: none;">emineon.com</a>
          </p>
          <p style="color: #6c757d; font-size: 12px; margin: 10px 0 0 0;">
            ${labels.received} ${new Date().toLocaleString(locale, { 
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
  `;
}

export function generateSubject(data: ContactFormData): string {
  const { name, type = 'general', language = 'en' } = data;
  
  const isEnglish = language === 'en';
  
  const typePrefix = {
    general: isEnglish ? '' : '',
    talent: isEnglish ? '[TALENT] ' : '[TALENT] ',
    hiring: isEnglish ? '[HIRING] ' : '[RECRUTEMENT] ',
    partnership: isEnglish ? '[PARTNERSHIP] ' : '[PARTENARIAT] '
  };

  const baseSubject = isEnglish 
    ? `New Contact Form Submission from ${name}`
    : `Nouvelle soumission de formulaire de contact de ${name}`;

  return `${typePrefix[type]}${baseSubject}`;
} 