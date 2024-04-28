import 'dotenv/config';

const JWT = {
  SECRET: process.env.JWT_SECRET_KEY,
  EXPIRES_IN: process.env.JWT_EXPIRES_IN || '30d',
};

const DATABASE = {
  URL: process.env.DATABASE_URL,
};

export const ENVS = {
  JWT,
  DATABASE,
};
