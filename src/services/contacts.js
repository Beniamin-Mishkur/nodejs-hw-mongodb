// src/services/contacts.js
import contact from '../models/contact.js';

export async function findAllContacts() {
  return contact.find();
}

export async function findContactById(id) {
  return contact.findById(id);
}
