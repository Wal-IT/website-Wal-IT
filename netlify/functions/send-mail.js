const sgMail = require('@sendgrid/mail');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

const body = JSON.parse(event.body);
const naam = body.naam;
const email = body.email;
const bedrijf = body.bedrijf;
const bericht = body.bericht;
console.log('Ontvangen data:', body);
const sgMail = require('@sendgrid/mail');

exports.handler = async (event) => {
  const body = JSON.parse(event.body);
  const naam = body.naam;
  const email = body.email;
  const bedrijf = body.bedrijf;
  const bericht = body.bericht;

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  try {
    await sgMail.send({
      to: 'wannes.gillis@wal-it.be',
      from: 'wannes.gillis@wal-it.be',
      subject: 'Nieuwe aanvraag via Wal-IT',
      text: `Naam: ${naam}\nE-mail: ${email}\nBedrijf: ${bedrijf}\n\nBericht:\n${bericht}`
    });

    await sgMail.send({
      to: email,
      from: 'wannes.gillis@wal-it.be',
      subject: 'Bedankt voor uw aanvraag — Wal-IT',
      text: `Beste ${naam},\n\nBedankt voor uw aanvraag bij Wal-IT! We nemen zo snel mogelijk contact met u op.\n\nUw gegevens:\nNaam: ${naam}\nE-mail: ${email}\nBedrijf: ${bedrijf}\n\nUw bericht:\n${bericht}\n\nMet vriendelijke groeten,\nWannes Gillis\nWal-IT\n+32 477 54 08 57\nwww.wal-it.be`
    });

    return { statusCode: 200, body: JSON.stringify({ success: true }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
