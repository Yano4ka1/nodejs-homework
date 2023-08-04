const express = require('express');
const { tryCatchWrapper, auth, upload, validation } = require('../../middlewares');
const { getCurrentUser, updateAvatar, verifyEmail, reVerification } = require("../../controllers");
const { userVerificationJoiSchema } = require('../../schemas/userSchema');

const router = express.Router();

router.get("/current", auth, tryCatchWrapper(getCurrentUser));
router.patch("/avatars", auth, upload.single("avatar"), tryCatchWrapper(updateAvatar));
router.get("/verify/:verificationToken", tryCatchWrapper(verifyEmail));
router.post("/verify", validation(userVerificationJoiSchema), tryCatchWrapper(reVerification));

module.exports = router;