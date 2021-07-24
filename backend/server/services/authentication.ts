import jwt from 'jsonwebtoken';

const SECRET = process.env['JWT_TOKEN'] || 'development';

export const sign = (payload: Record<string, unknown>): string => {
  const option = {
    expiresIn: '30d',
  };
  return jwt.sign(payload, SECRET, option);
};

export const verify = (token: string): jwt.JwtPayload | string => {
  return jwt.verify(token, SECRET);
};
