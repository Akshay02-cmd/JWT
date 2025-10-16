const JWT = require("jsonwebtoken");
const {UnathenticatedError} = require('../errors')

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnathenticatedError("no token provided");
  }
  const token = authHeader.split(" ")[1];

  try {
    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    // destructure from the decoded token (not req.decoded)
    const { id, username } = decoded;
    req.user = { id, username };
    return next();
  } catch (error) {
    throw new UnathenticatedError("not authorized to access the route");
  }
};

module.exports = authenticationMiddleware;
