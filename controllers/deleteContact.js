const { Contact } = require("../db/contactModel");

const deleteContact = async (req, res, next) => {
        const { contactId } = req.params;
        const contact = await Contact.findOneAndRemove({ _id: contactId });

        if (!contact) {
            return res.status(404).json({
                message: `There is no contact with id ${contactId} to delete`,
            });
        }
        
        res.status(200).json({
            message: `Contact ${contact.name} was successfully deleted`,
            contact,
        });
   
};

module.exports = {
    deleteContact
}