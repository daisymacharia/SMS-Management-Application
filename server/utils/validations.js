export const isValidInput = input => {
  let isNotEmpty = false
  let isAlphabetic = false
  if (input) {
    isNotEmpty =
      input.trim() !== '' && input.trim() !== undefined && input.trim() !== null

    isAlphabetic = /^[a-zA-Z ]*$/.test(input.trim())
  }
  return isNotEmpty && isAlphabetic
}

export const phoneValidation = input => {
  let isValidPhoneNumber = false
  let isValidlength = false
  if (input) {
    isValidPhoneNumber = /^[\d]+$/.test(input.trim())

    isValidlength = input.toString().trim().length === 10
    console.log(isValidPhoneNumber, isValidlength, 'valid')
  }
  return isValidPhoneNumber && isValidlength
}
