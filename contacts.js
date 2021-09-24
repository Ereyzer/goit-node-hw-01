const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.join(__dirname, './db/contacts.json');

// contacts.js

// TODO: задокументировать каждую функцию
async function listContacts() {
  try {
    const result = await fs.readFile(contactsPath, 'utf8');
    const contacts = JSON.parse(result);
    return contacts;
  } catch (err) {
    console.error(err);
    return err;
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const found = contacts.find(({ id }) => id === contactId);
    return found;
  } catch (err) {
    console.error(err);
    return err;
  }
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const newContactList = contacts.filter(({ id }) => id !== contactId);
  const data = JSON.stringify(newContactList);

  try {
    await fs.writeFile(contactsPath, data);
    return {};
  } catch (err) {
    console.error(err);
    return err;
  }
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = {
    id: contacts[contacts.length - 1].id + 1,
    name,
    email,
    phone,
  };
  const data = JSON.stringify([...contacts, newContact]);
  try {
    await fs.writeFile(contactsPath, data);
    return newContact;
  } catch (err) {
    console.error(err);
    return err;
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
