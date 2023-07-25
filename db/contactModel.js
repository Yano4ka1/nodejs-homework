const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        maxLength: 30,
        unique: true,
        required: [true, 'Set name for contact'],
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        minLength: 10,
        maxLength: 20,
    },
    favorite: {
        type: Boolean,
        default: false,
    },
    owner: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user',
        required: true,
      },
}, { versionKey: false, timestamps: true });

const Contact = mongoose.model("contact", contactSchema);

module.exports = {
    Contact,
};