import jwt from 'jsonwebtoken';

const SECRET = process.env['JWT_TOKEN'] || 'development';

interface SignPayload {
  email: string;
}

interface Decoded extends jwt.JwtPayload, SignPayload {}

export const sign = (payload: SignPayload): string => {
  return jwt.sign(payload, SECRET, { expiresIn: '30d' });
};

export const verify = (token: string): Decoded => {
  return jwt.verify(token, SECRET) as Decoded;
};
