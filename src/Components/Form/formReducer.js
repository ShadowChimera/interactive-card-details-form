import validation from './utils/validation'

function formReducer(state, action) {
  switch (action.type) {
    case 'submitted_form': {
      if (state.status !== 'default') {
        return
      }

      return submitForm(state)
    }
    case 'changed_card_number': {
      return changeData(action.value, state, 'cardNumber')
    }
    case 'changed_cardholder_name': {
      return changeData(
        action.value,
        state,
        'cardholderName'
      )
    }
    case 'changed_exp_date_month': {
      return changeDataCardExpDate(
        action.value,
        state,
        'month'
      )
    }
    case 'changed_exp_date_year': {
      return changeDataCardExpDate(
        action.value,
        state,
        'year'
      )
    }
    case 'changed_cvc': {
      return changeNumericData(
        action.value,
        state,
        'cardCvc',
        3
      )
    }

    case 'removed_focus_from_card_number': {
      return {
        ...state,
        data: validate('cardNumber', state.data),
      }
    }
    case 'removed_focus_from_cardholder_name': {
      return {
        ...state,
        data: validate('cardholderName', state.data),
      }
    }
    case 'removed_focus_from_exp_date_month': {
      return {
        ...state,
        data: validate('cardExpDate', state.data),
      }
    }
    case 'removed_focus_from_exp_date_year': {
      return {
        ...state,
        data: validate('cardExpDate', state.data),
      }
    }
    case 'removed_focus_from_cvc': {
      return {
        ...state,
        data: validate('cardCvc', state.data),
      }
    }
    default: {
      throw Error('Unknown action: ' + action.type)
    }
  }
}

export default formReducer

/* -------------------------------------------------------------------------- */
/*                             CHANGING FORM DATA                             */
/* -------------------------------------------------------------------------- */

function changeData(value, state, field) {
  if (state.status !== 'default') {
    return state
  }

  if (value === state.data[field]) {
    return state
  }

  return {
    ...state,
    data: {
      ...state.data,
      [field]: {
        ...state.data[field],
        value: value,
      },
    },
  }
}

function changeNumericData(
  value,
  state,
  field,
  maxLength = Infinity
) {
  if (!/^\d*$/.test(value) || value.length > maxLength) {
    return state
  }

  return changeData(value, state, field)
}

function changeDataCardExpDate(value, state, field) {
  let newState = changeNumericData(
    value,
    state,
    'cardExpDate',
    2
  )

  if (newState === state) {
    return state
  }

  newState.data.cardExpDate.value = {
    ...state.data.cardExpDate.value,
    [field]: value,
  }

  return newState
}

/* -------------------------------------------------------------------------- */
/*                               FORM SUBMITTING                              */
/* -------------------------------------------------------------------------- */

function submitForm(state) {
  const formData = state.data

  let updatedFormData = formData
  let isFormValid = true

  for (let fieldName in formData) {
    let isValid
    ;[updatedFormData, isValid] = validate(
      fieldName,
      updatedFormData,
      true
    )

    isFormValid = isValid && isFormValid
  }

  if (isFormValid) {
    return {
      ...state,
      status: 'sending',
      data: updatedFormData,
    }
  }

  if (updatedFormData === formData) {
    return state
  }

  return {
    ...state,
    data: updatedFormData,
  }
}

/* -------------------------------------------------------------------------- */
/*                               FORM VALIDATION                              */
/* -------------------------------------------------------------------------- */

const validationMethods = {
  cardholderName: validation.validateCardholderName,
  cardNumber: validation.validateCardNumber,
  cardExpDate: validation.validateCardExpDate,
  cardCvc: validation.validateCardCvc,
}

function validate(fieldName, formData, getIsValid = false) {
  const field = formData[fieldName]
  let updatedFormData = formData

  const { isValid, status, message } = validationMethods[
    fieldName
  ](field.value)

  let validation

  if (status || message) {
    validation = {
      status: status,
      message: message,
    }
  }

  const isResultDifferent =
    status !== field.validation?.status ||
    message !== field.validation?.message

  if (isResultDifferent) {
    updatedFormData = {
      ...updatedFormData,
      [fieldName]: {
        ...field,
        validation,
      },
    }
  }

  if (getIsValid) {
    return [updatedFormData, isValid]
  }

  return updatedFormData
}
