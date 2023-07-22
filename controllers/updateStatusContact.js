const { Contact } = require("../db/contactModel");

const updateStatusContact = async (req, res, next) => {
    const { contactId } = req.params;
    const { favorite } = req.body;
    
        const result = await Contact.findByIdAndUpdate(
            { _id: contactId },
            { favorite },
            { new: true }
        );
    
        if (!result) {
            return res.status(404).json({
                message: "Not Found",
            });
        }
    
    res.status(200).json(result);
    
};

module.exports = {
    updateStatusContact
}