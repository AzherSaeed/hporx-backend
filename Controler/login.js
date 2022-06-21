const registeration = require("../Model/loginModel");
const bcrypt = require("bcryptjs");

exports.authQuery = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    //check the validation of email and password
    // const { error } = signInValidation(email, password)
    // if (error) return res.status(400).send(error.details[0].message);

    // checking if the user exist or not
    const user = await registeration.findOne({ email: email });
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "Email or password is incorrect" });
    //mathc the password correct or not
    const matchPass = await bcrypt.compare(password, user.password);
    if (!matchPass) return res.status(400).send("Password is incorrect");
    // const token = jwt.sign({ _id: user._id }, process.env.SECRET_TOKEN)

    return res.status(200).json({
      success: true,
      message: "You are successfully login",
    });

    //create and assign token
    // res.sendStatus(200).json({ message: 'ok' });
  } catch (err) {
    console.log(err);
  }
};
