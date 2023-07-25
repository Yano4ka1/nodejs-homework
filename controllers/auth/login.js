const { User } = require("../../db/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const passCompare = bcrypt.compareSync(password, user.password);   // check password
    
    if (!user || !passCompare) { 
        return res.status(401).json({
            message: "Email or password is wrong"
        })
    }

    const payload = {
        id: user._id
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
    await User.findByIdAndUpdate(user._id, { token });
    res.status(200).json({
        status: "Ok",
        token,
        user: {
          email,
          user: user.subscription,
        },
    })

}

module.exports = {
    login
};