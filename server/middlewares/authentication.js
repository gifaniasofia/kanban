const { verifyToken } = require('../helpers/jwt');

const authentication = (req, res, next) => {
  try {
    const access_token = req.headers.access_token;
    const decoded = verifyToken(access_token, process.env.SECRET_JWT);

    req.decoded = decoded;

    next();
  } catch (err) {
    next({ name: 'Error401', status: 401, msg: 'Invalid access token' });
  }
}

module.exports = authentication;