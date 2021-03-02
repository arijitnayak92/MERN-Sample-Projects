const jwt = require('jsonwebtoken');
const {
  ACCESS_TOKEN_KEY,
} = process.env;


module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    const error = new Error('Not authenticated.');
    error.statusCode = 401;
    throw error;
  }
  const token = authHeader.split(' ')[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, ACCESS_TOKEN_KEY);
  }
  catch (err) {
    err.message='jwt token either expired or invalid. refresh the token if permitted else re-login'
    err.statusCode = 401;
    throw err;
  }

  req.userId = decodedToken.userId;
  next();
};
