import nodemailer from "nodemailer";
// import "dotenv/config";

class Nodemailer {
  host: string;
  port: string;
  userName: string;
  password: string;
  mail_from: string;

  constructor() {
    this.host = process.env.MAIL_HOST;
    this.port = process.env.MAIL_PORT;
    this.userName = process.env.MAIL_USERNAME;
    this.password = process.env.MAIL_PASSWORD;
    this.mail_from = process.env.MAIL_FROM_ADDRESS;
  }

  createTransport = () => {
    return nodemailer.createTransport({
      host: this.host,
      port: Number(this.port),
      secure: false,
      auth: {
        user: this.userName,
        pass: this.password,
      },
    });
  };

  sendMail = async (mail_to: string, subject: string, template: string) => {
    const sentMessage = await this.createTransport().sendMail({
      from: this.mail_from,
      to: mail_to,
      subject: subject,
      html: template,
    });
    return sentMessage;
  };
}

export default new Nodemailer();
