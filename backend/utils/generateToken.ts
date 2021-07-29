import jwt from 'jsonwebtoken';

const generateToken = (id: string | number) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as jwt.Secret, {
    expiresIn: '30d',
  });
};

export default generateToken;
