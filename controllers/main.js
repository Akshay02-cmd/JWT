const customeAPIError = require("../errors/custom-error");

const login = async (req, res) => {
  const { username, password } = req.body;
  //for validation we can use
  //Mongoose validation
  //joi
  //check in controller
  
  if (!username || !password) {
    throw new customeAPIError("please provide username and password", 400);
  }
  console.log(username, typeof password);
  res.send("Fake login/Register/signup Route");
};

const dashboard = async (req, res) => {
  const luckynumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `hello, John Doe`,
    secret: `here is your authorized data and your lucky number is ${luckynumber}`,
  });
};

module.exports = {
  login,
  dashboard,
};
