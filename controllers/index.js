const {
    addContact,
    getAllContacts,
    getContactById,
    deleteContact,
    updateContact,
    updateStatusContact
  } = require("./contacts");

const { register, login, logout } = require("./auth");
const { getCurrentUser, updateAvatar } = require("./users");

module.exports = {
    addContact,
    getAllContacts,
    getContactById,
    deleteContact,
    updateContact,
    updateStatusContact,
    register,
    login,
    logout,
    getCurrentUser,
    updateAvatar
  }