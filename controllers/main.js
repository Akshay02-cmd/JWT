const JWT = require("jsonwebtoken");
const { BadRequestError, UnathenticatedError } = require("../errors");

const login = async (req, res) => {
  const { username, password } = req.body;
  //for validation we can use
  //Mongoose validation
  //joi
  //check in controller

  if (!username || !password) {
    throw new BadRequestError("please provide username and password");
  }

  const id = new Date().getDate();
  const token = JWT.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.status(200).json({ msg: `user created `, token: token });
};

const dashboard = async (req, res) => {
  try {
    // req.user should be set by the authentication middleware for protected routes
    console.log(req.user);
    const luckynumber = Math.floor(Math.random() * 100);
    res.status(200).json({
      msg: `hello, ${req.user.username}`,
      secret: `here is your authorized data and your lucky number is ${luckynumber}`,
    });
  } catch (error) {
    throw new UnathenticatedError("not authorized to access this route");
  }
};

module.exports = {
  login,
  dashboard,
};
