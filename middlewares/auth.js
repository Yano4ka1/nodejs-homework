const jwt = require("jsonwebtoken");
const { User } = require("../db/userModel");
const { SECRET_KEY } = process.env;

const auth = async (req, res, next) => {
    try {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");
    
        if (bearer !== "Bearer") {
            return res.status(401).json({ message: "Not authorized" });
        }
        const { id } = jwt.verify(token, SECRET_KEY);
        const user = await User.findById(id);
        console.log(user);
        if (!user || !user.token) {
            return res.status(401).json({ message: "Not authorized" });
        }
        req.user = user;
        next();

    } catch (error) {
        if(error.message === "Invalid signature" ||
        error.message === "jwt expired"){
            return res.status(401).json({ message: "Not authorized" });
        }
        next(error);
    }
}

module.exports = { auth };