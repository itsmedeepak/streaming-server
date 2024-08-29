import jwt from 'jsonwebtoken';

const Authenticate = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);

  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
    req.user = decoded.user;

    next();
  } catch (err) {
    console.error("Token validation error:", err.message);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

export default Authenticate;
