import 'dotenv/config';

const JWT = {
  SECRET: process.env.JWT_SECRET_KEY,
  EXPIRES_IN: process.env.JWT_EXPIRES_IN || '30d',
};

const SENTRY_DNS = process.env.SENTRY_DNS;

const DATABASE = {
  URL: process.env.DATABASE_URL,
};

const SENDGRID = {
  CONFIRM_ACCOUNT_TEMPLATE_ID: process.env.SENDGRID_CONFIRM_ACCOUNT_TEMPLATE_ID,
  API_KEY: process.env.SENDGRID_API_KEY,
  FROM_EMAIL: process.env.SENDGRID_FROM_EMAIL,
  WELCOME_SUBJECT: process.env.SENDGRID_WELCOME_SUBJECT,
};

const APP_URL = process.env.APP_URL;
const APP_PORT = process.env.APP_PORT;

export const ENVS = {
  JWT,
  DATABASE,
  SENTRY_DNS,
  SENDGRID,
  APP_URL,
  APP_PORT,
};
