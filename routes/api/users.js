const express = require('express');
const { tryCatchWrapper } = require('../../middlewares/tryCatchWrapper');
const { auth } = require('../../middlewares/auth');
const { getCurrentUser } = require("../../controllers");

const router = express.Router();

router.get("/current", auth, tryCatchWrapper(getCurrentUser));

module.exports = router;