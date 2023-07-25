const { User } = require("../../db/userModel");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
    const { password, email, subscription } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        return res.status(409).json({
            message: `User with email ${email} already exist`,
        });
    }
  
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    await User.create({ password: hashPassword, email, subscription });
    res.status(201).json({
        message: "Created user",
        user: {
            email,
            subscription,
        },
    })
};

module.exports = {register};