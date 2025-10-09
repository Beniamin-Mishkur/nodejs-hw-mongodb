import Contact from './contact.js';

export async function findAllContacts() {
  return Contact.find();
}

export async function findContactById(id) {
  return Contact.findById(id);
}
