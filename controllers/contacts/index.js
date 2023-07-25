const { addContact } = require("./addContact");
const { getAllContacts } = require("./getAllContacts");
const { getContactById } = require("./getContactById");
const { deleteContact } = require("./deleteContact");
const { updateContact } = require("./updateContact");
const { updateStatusContact } = require("./updateStatusContact");


module.exports = {
    addContact,
    getAllContacts,
    getContactById,
    deleteContact,
    updateContact,
    updateStatusContact
}