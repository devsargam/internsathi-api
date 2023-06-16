import jwt from 'jsonwebtoken';

export const jwtAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  // Guard clause
  if (!token) {
    res.status(401).json({ error: 'Unauthorized' });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if (err) {
      res.json({ error: err.message });
    } else {
      console.log(decodedToken);
      next();
    }
  });
};
