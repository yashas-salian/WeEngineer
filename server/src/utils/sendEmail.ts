import Nodemailer from "nodemailer"
import { MailtrapTransport } from "mailtrap"
import { Context } from "hono";

const sendEmail = (c : Context) => {
    const TOKEN = c.env.MAILTRAP_API_TOKEN;
    
    const transport = Nodemailer.createTransport(
      MailtrapTransport({
        token: TOKEN,
        testInboxId: 3941665,
      })
    );
    
    const sender = {
      address: "yashassalian69@gmail.com.com",
      name: "Mailtrap Test",
    };
    const recipients = [
      "yashassalian40@gmail.com",
    ];
    
    transport
      .sendMail({
        from: sender,
        to: recipients,
        subject: "You are awesome!",
        text: "Congrats for sending test email with Mailtrap!",
        category: "Integration Test",
        sandbox: true
      })
      .then(console.log, console.error);
}