import { Message, Contact } from '../models'
import * as responses from '../utils/responses'
import * as utils from '../utils/validations'

export const createMessage = async (req, res) => {
  const { isValidInput, phoneValidation } = utils
  if (Object.keys(req.body).length === 0) {
    responses.emptyJsonBody(res)
  }
  const {
    body: { to, message, from },
  } = req

  let findSender = await Contact.findOne({
    where: {
      phoneNumber: from,
    },
  })

  let findReciever = await Contact.findOne({
    where: {
      phoneNumber: to,
    },
  })
  if (!findSender) responses.senderNotFound(res)
  if (!findReciever) responses.receiverNotFound(res)
  if (findSender && findReciever) {
    let data = {
      message: message,
      message_status: 'sent',
      receiver: to,
      sender: from,
    }
    console.log(data.message)

    if (isValidInput(message) && phoneValidation(to) && phoneValidation(from)) {
      Message.create(data)
        .then(message => responses.creationSuccess(res, message))
        .catch(error => res.status(400).send(error))
    } else {
      responses.wrongInput(res, 'Message data')
    }
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
        sender: phoneNumber,
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
  } else {
    responses.wrongInput(res, 'Phone Number')
  }
}

export const getAllReceivedtMessages = ({ params: { phoneNumber } }, res) => {
  if (phoneNumber) {
    Message.findAll({
      where: {
        receiver: phoneNumber,
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
  } else {
    responses.wrongInput(res, 'Phone Number')
  }
}
