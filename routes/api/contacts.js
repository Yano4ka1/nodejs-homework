const express = require('express');
const { getAllContacts, getContactById, addContact, deleteContact, updateContact, updateStatusContact } = require('../../controllers');
const { tryCatchWrapper } = require('../../middlewares/tryCatchWrapper');
const { contactPostSchema, contactsPatchSchema } = require('../../schemas/contactSchema');

const router = express.Router();

router.get('/', tryCatchWrapper(getAllContacts));

router.get('/:contactId', tryCatchWrapper(getContactById));

router.post('/', contactPostSchema, tryCatchWrapper(addContact))

router.delete('/:contactId', tryCatchWrapper(deleteContact))

router.put('/:contactId', contactPostSchema, tryCatchWrapper(updateContact))

router.patch('/:contactId/favorite', contactsPatchSchema, tryCatchWrapper(updateStatusContact))

module.exports = router;
