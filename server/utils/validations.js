export const isValidInput = input => {
  let isNotEmpty = false
  let isAlphabetic = false
  if (input) {
    isNotEmpty =
      input.trim() !== '' && input.trim() !== undefined && input.trim() !== null

    isAlphabetic = /^[a-zA-Z]+$/.test(input.trim())
  }
  return isNotEmpty && isAlphabetic
}

export const isnotEmpty = input => {
  let isNotEmpty = false
  if (input) {
    isNotEmpty =
      input.trim() !== '' && input.trim() !== undefined && input.trim() !== null
  }
  return isNotEmpty
}
