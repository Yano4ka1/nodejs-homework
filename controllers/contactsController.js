const {
    listContacts,
    getContactById,
    addContact,
    removeContact,
    updateContact,
  } = require("../models/contacts");

const getContactsController = async (req, res) => {
    try {
        const data = await listContacts();

        res.json(data);
    } catch (error) {
        res.status(500).json({
            status: "error",
            code: 500,
            message: "Server error",
        });
    }
} 

const getContactByIdController = async (req, res) => {
    try {
        const { contactId } = req.params;
        const data = await getContactById(contactId);

        if (!data) {
            return res.status(400).json({
                status: "error",
                code: 400,
                message: `Contact with id ${contactId} not found`,
            });            
        }

        res.json({
            status: "success",
            code: 200,
            data,
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            code: 500,
            message: "Server error",
        });
    }
}

const postContactController = async (req, res) => {
    try {
        const { name, email, phone } = req.body;
        const data = await addContact(name, email, phone);

        res.status(201).json({
            status: "success",
            code: 201,
            data,
            message: `Contact ${name} was successfully added`,
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            code: 500,
            message: "Server error",
        });        
    }
}

const deleteContactController = async (req, res) => {
    try {
        const { contactId } = req.params;
        const searchContact = await getContactById(contactId);
        if (!searchContact) {
            return res.status(404).json({
                message: `There is no contact with id ${contactId} to delete`,
            });
        }
        
        const data = await removeContact(contactId);
        res.status(200).json({
            status: "success",
            code: 200,
            message: `Contact ${data.name} was successfully deleted`,
            data,
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            code: 500,
            message: "Server error",
        });           
    }
}

const putContactByIdController = async (req, res) => {
try {
    const { contactId } = req.params;
    const data = await updateContact(contactId, req.body);

    if (!data) {
        return res.status(404).json({
            status: "error",
            code: 404,
            message: "Not Found",
        });
    }

    res.status(200).json({
        status: "success",
        code: 200,
        data,
        message: `Contact ${data.name} was successfully changed`,
    })
} catch (error) {
          res.status(500).json({
            status: "error",
            code: 500,
            message: "Server error",
        });   
}
}

module.exports = {
    getContactsController,
    getContactByIdController,
    postContactController,
    deleteContactController,
    putContactByIdController
}