const fs = require('fs/promises');
const path = require("path");
const { uid } = require("uid");

const contactsPath = path.join(__dirname, "..", "models", "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf8");

  return JSON.parse(data);
}

const getContactById = async (contactId) => {
  const data = await fs.readFile(contactsPath, "utf8");
  const contact = JSON.parse(data).find(({ id }) => id === contactId);

  return contact;
}

const removeContact = async (contactId) => {
  const data = await fs.readFile(contactsPath, "utf8");
  const contacts = JSON.parse(data);

  const isInList = contacts.find(({ id }) => id === contactId);
  if(!isInList){
      return null;
  }

  const newContacts = contacts.filter(({ id }) => id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 4), "utf8");
  
  return isInList;
}

const addContact = async (name, email, phone) => {
const newContact = { name, email, phone, id: uid(10) };

const data = await fs.readFile(contactsPath, "utf8");
const contacts = JSON.parse(data);

contacts.push(newContact);
await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 4), "utf8");
return newContact;
};

const updateContact = async (contactId, body) => {
const contacts = await listContacts();
const contactIndex = contacts.findIndex(({ id }) => id === contactId);
const updatedContact = contacts[contactIndex];

const { name, email, phone } = body;
updatedContact.name = name;
updatedContact.email = email;
updatedContact.phone = phone;

await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 4), "utf8")
return updatedContact;

}

module.exports = {
listContacts,
getContactById,
removeContact,
addContact,
updateContact,
}