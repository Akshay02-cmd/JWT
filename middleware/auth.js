const JWT = require("jsonwebtoken");
const CustomAPIError = require("../errors/custom-error");

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new CustomAPIError("no token provided", 401);
  }
  const token = authHeader.split(" ")[1];

  try {
    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    // destructure from the decoded token (not req.decoded)
    const { id, username } = decoded;
    req.user = { id, username };
    return next();
  } catch (error) {
    throw new CustomAPIError("not authorized to access the route", 401);
  }

};

module.exports = authenticationMiddleware;
