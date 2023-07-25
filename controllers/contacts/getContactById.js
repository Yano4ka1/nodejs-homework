const { Contact } = require("../../db/contactModel");

const getContactById = async (req, res, next) => {
        const { contactId } = req.params;
        const contact = await Contact.findOne({ _id: contactId });

        if (!contact) {
            return res.status(400).json({
                message: `Contact with id ${contactId} not found`,
            });
        }
        res.json({contact});
    
};

module.exports = {
    getContactById
}