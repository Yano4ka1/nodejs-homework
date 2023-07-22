const { Contact } = require("../db/contactModel");

const addContact = async (req, res, next) => {
        const { name, email, phone, favorite = false } = req.body;
        const data = { name, email, phone, favorite };

        const newContact = await Contact.create(data);
        res.status(201).json(newContact);
    
}

module.exports = { addContact };