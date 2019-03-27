import { Message, Contact } from '../models'
import * as responses from '../utils/responses'
import * as utils from '../utils/validations'

export const createMessage = async (req, res, next) => {
  const { isValidInput, phoneValidation } = utils
  if (Object.keys(req.body).length === 0) {
    responses.emptyJsonBody(res)
  }
  const {
    body: { to, message, from },
  } = req

  if (isValidInput(message) && phoneValidation(to) && phoneValidation(from)) {
    Contact.findOne({
      where: {
        phoneNumber: from,
      },
    })
      .then(contact => {
        contact
          ? (req.body.from = contact.dataValues.id)
          : responses.senderNotFound(res)
      })
      .then(() =>
        Contact.findOne({
          where: {
            phoneNumber: to,
          },
        })
      )
      .then(contact => {
        contact
          ? (req.body.to = contact.dataValues.id)
          : responses.receiverNotFound(res)
      })
      .then(() => {
        Message.create({
          message,
          senderId: req.body.from,
          receiverId: req.body.to,
          message_status: 'sent',
        })
          .then(message => responses.creationSuccess(res, message))
          .catch(error => res.status(400).send(error))
      })
  } else {
    responses.wrongInput(res, 'Message data')
  }
}

export const deleteMessage = ({ params: { id } }, res) => {
  if (id) {
    Message.findOne({
      where: {
        id: id.trim(),
      },
    })
      .then(message => {
        message
          ? Message.destroy({
              where: {
                id: message.id,
              },
            })
              .then(() => {
                responses.deleteSuccess(res, message.message)
              })
              .catch(err => {
                responses.serverError(res, err)
              })
          : responses.MessageNotFound(res, id)
      })
      .catch(err => {
        responses.serverError(res, err)
      })
  } else {
    responses.wrongInput(res, 'Message Id')
  }
}

export const getSingleMessage = ({ params: { id } }, res) => {
  if (id) {
    Message.findOne({
      where: {
        id: id.trim(),
      },
    })
      .then(message => {
        message
          ? responses.getSuccess(res, message)
          : responses.MessageNotFound(res, id)
      })
      .catch(err => {
        responses.serverError(res, err)
      })
  } else {
    responses.wrongInput(res, 'Message Id')
  }
}

export const getAllSentMessages = ({ params: { phoneNumber } }, res) => {
  if (phoneNumber) {
    Message.findAll({
      where: {
        senderId: phoneNumber,
      },
    })
      .then(message => {
        message
          ? responses.getSuccess(res, message)
          : responses.contactNotFound(res, phoneNumber)
      })
      .catch(err => {
        responses.serverError(res, err)
      })
  }
}

export const getAllReceivedtMessages = ({ params: { phoneNumber } }, res) => {
  if (phoneNumber) {
    Message.findAll({
      where: {
        receiverId: phoneNumber,
      },
    }).then(message => {
      message
        ? responses.getSuccess(res, message)
        : responses.contactNotFound(res, phoneNumber)
    })
  } else {
    responses.wrongInput(res, 'Phone Number')
  }
}
