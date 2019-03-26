export const creationSuccess = (res, data) => {
  res.status(201).json({ data: data, message: `successfully created` })
}

export const updateSuccess = (res, data) => {
  res.status(200).json({ data: data, message: `successfully updated` })
}

export const deleteSuccess = (res, deletedData) => {
  res.status(200).json({ message: `${deletedData} has been deleted` })
}

export const contactNotFound = res => {
  res.status(404).json({ message: `Contact doesn't exist` })
}

export const getSuccess = (res, data) => {
  res.status(200).json({ data: data, message: `succesfully fetched data` })
}

export const wrongInput = (res, data) => {
  res.status(422).json({ message: `Invalid ${data}` })
}

export const serverError = (res, err) => {
  res.status(500).json({ error: err.message })
}

export const addExistingData = res => {
  res.status(409).json({ message: `contact already exists` })
}

export const MessageNotFound = (res, messageId) => {
  res
    .status(404)
    .json({ message: `Message with Id: ${messageId} doesn't exist` })
}

export const emptyJsonBody = res => {
  res.status(400).json({ Message: 'The Body should not be empty' })
}

export const senderNotFound = res => {
  res.status(404).json({ Message: 'The sender number does not exist' })
}

export const receiverNotFound = res => {
  res.status(404).json({ Message: 'The receiver number does not exist' })
}
