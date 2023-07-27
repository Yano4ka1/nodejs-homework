const path = require("path");
const fs = require("fs/promises");
const { User } = require("../../db/userModel");
const Jimp = require('jimp');

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");
const { PORT = 3000} = process.env;

const updateAvatar = async (req, res) => {
    const { path: tempUpload, originalname } = req.file;
    const { _id: id } = req.user;
    const imageName = `${id}_${originalname}`;
    try {
        const resultUpload = path.join(avatarsDir, imageName);
        await fs.rename(tempUpload, resultUpload);

        const avatarURL = `http://localhost:${PORT}/avatars/${imageName}`;
        await User.findByIdAndUpdate(id, {avatarURL});

        Jimp.read(resultUpload, (error, image) => {
            if (error) throw error;
            image.resize(250, 250).write(resultUpload);
          });

        res.json({ avatarURL });
    } catch (error) {
        await fs.unlink(tempUpload);
        throw error;
    }

}

module.exports = {
    updateAvatar
};