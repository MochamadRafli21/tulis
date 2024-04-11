import { nodemailerClient } from '@/libs/utils/nodemailer'

export const sendEmail = async (to: string, subject: string, text: string) => {
  await nodemailerClient.sendMail({
    from: process.env.SMTP_USER,
    to,
    subject,
    text
  })
}


export const generateEmailVerificationToken = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export const generateEmailVerificationLink = (token: string) => {
  return `${process.env.CLIENT_URL}/verify-email/${token}`
}
