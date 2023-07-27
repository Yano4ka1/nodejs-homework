const { Contact } = require("../../db/contactModel");

const addContact = async (req, res, next) => {
        const { _id } = req.user;
        const { name, email, phone, favorite = false } = req.body;
        const data = { name, email, phone, favorite, owner: _id };

        const newContact = await Contact.create(data);
        res.status(201).json(newContact);
    
}

module.exports = { addContact };