import { Resend } from "resend"
import { Context } from 'hono';

export const sendEmail = async (c: Context) => {
  const resend = new Resend(c.env.RESEND_API_KEY)
  const {data , error} = await resend .emails.send({
    from : "onboarding@resend.dev",
    to : "yashassalian40@gmail.com",
    subject: "Welcome to our app!",
    html: `<p>Hello, welcome to our service!</p>`,
  })
  if (error) console.log(error)
  return c.json({
    resend : data 
  })
};
