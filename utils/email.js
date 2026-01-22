const nodemailer = require('nodemailer');
const pug = require('pug');
const { convert } = require('html-to-text');
const { Resend } = require('resend');

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstname = user.name.split(' ')[0];
    this.url = url;
    this.from = `Ahmed Hassan <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      return new Resend(process.env.RESEND_API_KEY);
    }

    // Dev Transport
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT || 2525,
      secure: false,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async send(template, subject) {
    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
      firstName: this.firstname,
      url: this.url,
      subject,
    });

    if (process.env.NODE_ENV === 'production') {
      // ✅ Resend expects only from, to, subject, html
      await this.newTransport().emails.send({
        from: this.from,
        to: this.to,
        subject,
        html,
      });
    } else {
      const mailOptions = {
        from: this.from,
        to: this.to,
        subject,
        html,
        text: convert(html),
      };
      await this.newTransport().sendMail(mailOptions);
    }
  }

  async sendWelcome() {
    await this.send('welcome', 'Welcome to the Natours family!');
  }

  async sendPasswordReset() {
    await this.send(
      'passwordReset',
      'Your Password Reset Token (valid only 5 minutes)',
    );
  }

  async sendConfirmEmail() {
    await this.send('confirmEmail', 'Confirm your email address');
  }
};
