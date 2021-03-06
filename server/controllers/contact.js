import { Contact, Message } from '../models'
import * as responses from '../utils/responses'
import * as utils from '../utils/validations'

export const createContact = (req, res) => {
  const { isValidInput, phoneValidation } = utils
  if (Object.keys(req.body).length === 0) {
    responses.emptyJsonBody(res)
  }
  const {
    body: { firstName, lastName, phoneNumber },
  } = req

  if (
    isValidInput(firstName) &&
    isValidInput(lastName) &&
    phoneValidation(phoneNumber)
  ) {
    Contact.findOne({
      where: {
        phoneNumber: phoneNumber,
      },
    })
      .then(contact => {
        contact
          ? responses.addExistingData(res, phoneNumber)
          : Contact.create({ firstName, lastName, phoneNumber })
              .then(contact => responses.creationSuccess(res, contact))
              .catch(error => res.status(400).send(error))
      })
      .catch(e => {
        responses.serverError(res, e)
      })
  } else {
    responses.wrongInput(res, 'Contact data')
  }
}

export const updateContact = (req, res) => {
  const { firstName, lastName } = req.body
  const { isValidInput } = utils

  Contact.findOne({
    where: {
      phoneNumber: req.params.phoneNumber,
    },
  })
    .then(contact => {
      !contact
        ? responses.contactNotFound(res)
        : Contact.update(
            {
              firstName: firstName || existingContact.firstName,
              lastName: lastName || existingContact.lastName,
            },
            {
              where: {
                phoneNumber: contact.phoneNumber,
              },
            }
          )
            .then(updatedContact => {
              responses.updateSuccess(res, contact.phoneNumber)
            })
            .catch(e => {
              responses.serverError(res, e)
            })
    })
    .catch(e => {
      responses.serverError(res, e)
    })
}

export const deleteContact = (req, res) => {
  Contact.findOne({
    where: {
      phoneNumber: req.params.phoneNumber,
    },
  })
    .then(contact => {
      !contact
        ? responses.contactNotFound(res)
        : Contact.destroy({
            where: { phoneNumber: contact.phoneNumber },
          })
            .then(deletedContact => {
              responses.deleteSuccess(res, contact.phoneNumber)
            })
            .catch(e => {
              responses.serverError(res, e)
            })
    })
    .catch(e => {
      responses.serverError(res, e)
    })
}

export const getMessages = ({ params: { id }, res }) => {
  Contact.findAll({
    include: [
      {
        association: 'sender',
      },
      {
        association: 'receiver',
      },
    ],
    where: {
      id: id,
    },
  }).then(contact =>
    contact
      ? responses.getSuccess(res, contact)
      : responses.contactNotFound(res)
  )
}
