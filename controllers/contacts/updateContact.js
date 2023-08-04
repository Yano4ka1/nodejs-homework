const { Contact } = require("../../db/contactModel");

const updateContact = async (req, res, next) => {
        const { contactId } = req.params;
        const result = await Contact.findByIdAndUpdate(
            { _id: contactId },
            { $set: req.body },
            { new: true }
        );
    
        if (!result) {
            return res.status(404).json({
                message: "Not Found",
            });
        }
    
        res.status(200).json({
            result,
            message: `Contact ${result.name} was successfully changed`,
        });    
};

module.exports = {
    updateContact
}