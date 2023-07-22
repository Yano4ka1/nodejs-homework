const express = require('express');
const { getContactsController, getContactByIdController, postContactController, deleteContactController, putContactByIdController } = require('../../controllers/contactsController');
const { contactPostSchema, contactPutSchema } = require('../../schemas/contactSchema');

const router = express.Router();

router.get('/', getContactsController);

router.get('/:contactId', getContactByIdController);

router.post('/', contactPostSchema, postContactController)

router.delete('/:contactId', deleteContactController)

router.put('/:contactId', contactPutSchema, putContactByIdController)

module.exports = router;
