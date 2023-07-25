const express = require('express');

const { getAllContacts, getContactById, addContact, deleteContact, updateContact, updateStatusContact } = require('../../controllers');
const {tryCatchWrapper} = require('../../middlewares/tryCatchWrapper');
const {auth} = require('../../middlewares/auth');
const { contactPostSchema, contactsPatchSchema } = require('../../schemas/contactSchema');

const router = express.Router();

router.get('/', auth, tryCatchWrapper(getAllContacts));

router.get('/:contactId', auth, tryCatchWrapper(getContactById));

router.post('/', auth, contactPostSchema, tryCatchWrapper(addContact))

router.delete('/:contactId', auth, tryCatchWrapper(deleteContact))

router.put('/:contactId', auth, contactPostSchema, tryCatchWrapper(updateContact))

router.patch('/:contactId/favorite', auth, contactsPatchSchema, tryCatchWrapper(updateStatusContact))

module.exports = router;