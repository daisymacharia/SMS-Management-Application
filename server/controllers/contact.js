import Sequelize from 'sequelize'
import { Contact } from '../models'
import * as responses from '../utils/responses'
import * as utils from '../utils/validations'

export const createContact = (req, res) => {
  const { isValidInput, isnotEmpty } = utils
  if (Object.keys(req.body).length === 0) {
    responses.emptyJsonBody(res)
  }
  const {
    body: { firstName, lastName, phoneNumber },
  } = req

  if (
    isValidInput(firstName) &&
    isValidInput(lastName) &&
    isnotEmpty(phoneNumber)
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
    responses.wrongInput(res)
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
        ? responses.notFound(res)
        : Contact.update(
            {
              firstName: isValidInput(firstName) || existingContact.firstName,
              lastName: isValidInput(lastName) || existingContact.lastName,
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
        ? responses.notFound(res)
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
