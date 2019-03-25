import { Contact } from '../models'

export const createContact = (req, res) => {
  return Contact.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phoneNumber: req.body.phoneNumber,
  })
    .then(contact => res.status(201).send(contact))
    .catch(error => res.status(400).send(error))
}
