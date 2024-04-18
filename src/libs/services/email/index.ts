import { nodemailerClient } from '@/libs/utils/nodemailer'

export const sendEmail = async (to: string, subject: string, text: string) => {
  await new Promise((resolve, reject) => {
    nodemailerClient.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject,
      text
    })
      .then(resolve)
      .catch(reject)
  })
}


export const generateEmailVerificationToken = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export const generateEmailVerificationLink = (token: string) => {
  return `${process.env.NEXT_PUBLIC_URL}/verify-email/${token}`
}

export const generatePasswordResetLink = (token: string) => {
  return `${process.env.NEXT_PUBLIC_URL}/forget/reset/${token}`
}
