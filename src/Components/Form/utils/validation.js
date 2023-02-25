const BLANK_MESSAGE = "Can't be blank"

export const cardNumberFormatConfig = {
  groupsCount: 4,
  numbersInGroupCount: 4,
  groupsSeparator: ' ',
}

export function validateCardholderName(
  value,
  getStatus = false
) {
  if (!value.length) {
    return {
      isValid: false,
      message: BLANK_MESSAGE,
      status: getStatus ? 'error' : undefined,
    }
  }

  return { isValid: true }
}

export function validateCardNumber(
  value,
  getStatus = false
) {
  if (!value.length) {
    return {
      isValid: false,
      message: BLANK_MESSAGE,
      status: getStatus ? 'error' : undefined,
    }
  }

  const settings = cardNumberFormatConfig

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
      status: getStatus ? 'error' : undefined,
    }
  }

  return { isValid: true }
}

export function validateCardExpDate(
  { month, year },
  getStatus = false
) {
  let validationResult = {
    isValid: true,
    status: getStatus
      ? {
          month: '',
          year: '',
        }
      : undefined,
  }

  if (!month.length || !year.length) {
    validationResult.isValid = false
    validationResult.message = BLANK_MESSAGE

    if (!month.length && validationResult.status) {
      validationResult.status.month = 'error'
    }

    if (!year.length && validationResult.status) {
      validationResult.status.year = 'error'
    }

    return validationResult
  }

  const expDateReg = /^\d{1,2}$/

  if (!expDateReg.test(month) || !expDateReg.test(year)) {
    validationResult.isValid = false
    validationResult.message = `Wrong format, only 2-digit numbers`

    if (
      !expDateReg.test(month) &&
      validationResult.status
    ) {
      validationResult.status.month = 'error'
    }

    if (!expDateReg.test(year) && validationResult.status) {
      validationResult.status.year = 'error'
    }

    return validationResult
  }

  month = parseInt(month)
  year = parseInt(`20${year}`)

  if (month < 1 || month > 12) {
    return {
      isValid: false,
      message: `Wrong format, the month number can be from 1 to 12`,
      status: getStatus
        ? { month: 'error', year: '' }
        : undefined,
    }
  }

  const expDate = new Date(year, month - 1)

  if (expDate.getTime() <= Date.now()) {
    return {
      isValid: false,
      message: `Card has expired, enter the relevant date`,
      status: getStatus
        ? { month: 'error', year: 'error' }
        : undefined,
    }
  }

  return { isValid: true }
}

export function validateCardCvc(value, getStatus = false) {
  if (!value.length) {
    return {
      isValid: false,
      message: BLANK_MESSAGE,
      status: getStatus ? 'error' : undefined,
    }
  }

  const cvcReg = /^\d{3}$/

  if (!cvcReg.test(value)) {
    return {
      isValid: false,
      message: `Wrong format, only 3-digit number`,
      status: getStatus ? 'error' : undefined,
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
