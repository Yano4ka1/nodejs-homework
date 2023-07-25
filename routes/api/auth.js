const express = require('express');
const { register, login, logout } = require('../../controllers');
const { auth } = require('../../middlewares/auth');

const { tryCatchWrapper } = require('../../middlewares/tryCatchWrapper');
const { validation } = require('../../middlewares/validation');
const { joiRegSchema, joiLogSchema } = require('../../schemas/userSchema');

const router = express.Router();

router.post("/signup", validation(joiRegSchema), tryCatchWrapper(register));
router.post("/login", validation(joiLogSchema), tryCatchWrapper(login));
router.get("/logout", auth, tryCatchWrapper(logout));

module.exports = router;