const express = require('express');
const { tryCatchWrapper, auth, upload } = require('../../middlewares');
const { getCurrentUser, updateAvatar } = require("../../controllers");

const router = express.Router();

router.get("/current", auth, tryCatchWrapper(getCurrentUser));
router.patch("/avatars", auth, upload.single("avatar"), tryCatchWrapper(updateAvatar));

module.exports = router;