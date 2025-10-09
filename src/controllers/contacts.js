import * as contactsService from '../services/contacts.js';

export async function getAllContacts(req, res, next) {
  try {
    const data = await contactsService.findAllContacts();
    return res.json({
      status: 200,
      message: 'Successfully found contacts!',
      data,
    });
  } catch (err) {
    next(err);
  }
}

export async function getContactById(req, res, next) {
  try {
    const { contactId } = req.params;
    const contact = await contactsService.findContactById(contactId);

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    return res.json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  } catch (err) {
    next(err);
  }
}
