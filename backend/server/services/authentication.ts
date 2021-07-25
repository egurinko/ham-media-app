import jwt from 'jsonwebtoken';

const SECRET = process.env['JWT_TOKEN'] || 'development';

interface SignPayload {
  email: string;
}

interface Decoded extends jwt.JwtPayload, SignPayload {}

export const sign = (payload: SignPayload): string => {
  const option = {
    expiresIn: '30d',
  };
  return jwt.sign(payload, SECRET, option);
};

export const verify = (token: string): Decoded => {
  return jwt.verify(token, SECRET) as Decoded;
};
