const sgMail = require('@sendgrid/mail');

exports.handler = async (event) => {
  const body = JSON.parse(event.body);
  const naam = body.naam;
  const email = body.email;
  const bedrijf = body.bedrijf;
  const bericht = body.bericht;
  const lang = body.lang || 'nl';

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const subjects = {
    nl: 'Nieuwe aanvraag via Wal-IT',
    en: 'New request via Wal-IT',
    it: 'Nuova richiesta tramite Wal-IT'
  };

  const labels = {
    nl: { naam: 'Naam', email: 'E-mail', bedrijf: 'Bedrijf', bericht: 'Bericht' },
    en: { naam: 'Name', email: 'Email', bedrijf: 'Company', bericht: 'Message' },
    it: { naam: 'Nome', email: 'Email', bedrijf: 'Azienda', bericht: 'Messaggio' }
  };
  const l = labels[lang] || labels.nl;

  const confirmSubjects = {
    nl: 'Bedankt voor uw aanvraag — Wal-IT',
    en: 'Thank you for your request — Wal-IT',
    it: 'Grazie per la sua richiesta — Wal-IT'
  };

  const confirmTexts = {
    nl: `Beste ${naam}\n\nBedankt voor uw aanvraag bij Wal-IT! We nemen zo snel mogelijk contact met u op.\n\nUw gegevens:\nNaam: ${naam}\nE-mail: ${email}\nBedrijf: ${bedrijf}\n\nUw bericht:\n${bericht}\n\nMet vriendelijke groeten\nWannes Gillis\nWal-IT\n+32 477 54 08 57\nwww.wal-it.be`,
    en: `Dear ${naam}\n\nThank you for your request at Wal-IT! We will contact you as soon as possible.\n\nYour details:\nName: ${naam}\nEmail: ${email}\nCompany: ${bedrijf}\n\nYour message:\n${bericht}\n\nKind regards\nWannes Gillis\nWal-IT\n+32 477 54 08 57\nwww.wal-it.be`,
    it: `Gentile ${naam}\n\nGrazie per la sua richiesta a Wal-IT! La contatteremo il prima possibile.\n\nI suoi dati:\nNome: ${naam}\nEmail: ${email}\nAzienda: ${bedrijf}\n\nIl suo messaggio:\n${bericht}\n\nCordiali saluti\nWannes Gillis\nWal-IT\n+32 477 54 08 57\nwww.wal-it.be`
  };

  try {
    await sgMail.send({
      to: 'wannes.gillis@wal-it.be',
      from: 'wannes.gillis@wal-it.be',
      subject: subjects[lang],
      text: `${l.naam}: ${naam}\n${l.email}: ${email}\n${l.bedrijf}: ${bedrijf}\n\n${l.bericht}:\n${bericht}`
    });

    await sgMail.send({
      to: email,
      from: 'wannes.gillis@wal-it.be',
      subject: confirmSubjects[lang],
      text: confirmTexts[lang]
    });

    return { statusCode: 200, body: JSON.stringify({ success: true }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
