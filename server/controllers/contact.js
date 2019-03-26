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
