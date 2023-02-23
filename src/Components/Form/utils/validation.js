const BLANK_MESSAGE = "Can't be blank"

export const cardNumberValidationSettings = {
  groupsCount: 4,
  numbersInGroupCount: 4,
  groupsSeparator: ' ',
}

export function validateCardholderName(value) {
  if (!value.length) {
    return {
      isValid: false,
      message: BLANK_MESSAGE,
    }
  }

  return { isValid: true }
}

export function validateCardNumber(value) {
  if (!value.length) {
    return {
      isValid: false,
      message: BLANK_MESSAGE,
    }
  }

  const settings = cardNumberValidationSettings

  const CARD_NUMBER_PATTERN = `^(\\d{${
    settings.numbersInGroupCount
  }}${settings.groupsSeparator}){${
    settings.groupsCount - 1
  }}(\\d{${settings.numbersInGroupCount}})$`

  console.log('CARD_NUMBER_PATTERN', CARD_NUMBER_PATTERN)

  const cardNumberReg = new RegExp(CARD_NUMBER_PATTERN)

  if (!cardNumberReg.test(value)) {
    return {
      isValid: false,
      message: `Wrong format, must contain ${
        settings.groupsCount * settings.numbersInGroupCount
      } numbers`,
    }
  }

  return { isValid: true }
}

export function validateCardExpDate({ month, year }) {
  if (!month.length || !year.length) {
    return {
      isValid: false,
      message: BLANK_MESSAGE,
    }
  }

  const expDateReg = /^\d{1,2}$/

  if (!expDateReg.test(month) || !expDateReg.test(year)) {
    return {
      isValid: false,
      message: `Wrong format, only 2-digit numbers`,
    }
  }

  month = parseInt(month)
  year = parseInt(`20${year}`)

  if (month < 1 || month > 12) {
    return {
      isValid: false,
      message: `Wrong format, the month number can be from 1 to 12`,
    }
  }

  const expDate = new Date(year, month - 1)

  if (expDate.getTime() <= Date.now()) {
    return {
      isValid: false,
      message: `Card has expired, enter the relevant date`,
    }
  }

  return { isValid: true }
}

export function validateCardCvc(value) {
  if (!value.length) {
    return {
      isValid: false,
      message: BLANK_MESSAGE,
    }
  }

  const cvcReg = /^\d{3}$/

  if (!cvcReg.test(value)) {
    return {
      isValid: false,
      message: `Wrong format, only 3-digit number`,
    }
  }

  return { isValid: true }
}

export default {
  validateCardholderName,
  validateCardNumber,
  validateCardExpDate: validateCardExpDate,
  validateCardCvc: validateCardCvc,
}
