"use server"

import { createTransport } from 'nodemailer'

export const nodemailerClient = async () => createTransport({
  service: process.env.SMTP_HOST,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
})
