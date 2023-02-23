import validation from './utils/validation'

function formReducer(state, action) {
  switch (action.type) {
    case 'submitted_form': {
      if (
        state.status === 'validating' ||
        state.status === 'sending'
      ) {
        return
      }

      return validate(state) // TODO status change
    }
    case 'changed_card_number': {
      return changeStateData(
        action.value,
        state,
        'cardNumber'
      )
    }
    case 'changed_cardholder_name': {
      return changeStateData(
        action.value,
        state,
        'cardholderName'
      )
    }
    case 'changed_exp_date_month': {
      return changeStateDataCardExpDate(
        action.value,
        state,
        'month'
      )
    }
    case 'changed_exp_date_year': {
      return changeStateDataCardExpDate(
        action.value,
        state,
        'year'
      )
    }
    case 'changed_cvc': {
      return changeStateNumericData(
        action.value,
        state,
        'cardCvc',
        3
      )
    }

    case 'removed_focus_from_card_number': {
      return validate(state, 'cardNumber')
    }
    case 'removed_focus_from_cardholder_name': {
      return validate(state, 'cardholderName')
    }
    case 'removed_focus_from_exp_date_month': {
      return validate(state, 'cardExpDate')
    }
    case 'removed_focus_from_exp_date_year': {
      return validate(state, 'cardExpDate')
    }
    case 'removed_focus_from_cvc': {
      return validate(state, 'cardCvc')
    }
    default: {
      throw Error('Unknown action: ' + action.type)
    }
  }
}

export default formReducer

function changeStateData(value, state, field) {
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

function changeStateNumericData(
  value,
  state,
  field,
  maxLength = Infinity
) {
  if (!/^\d*$/.test(value) || value.length > maxLength) {
    return state
  }

  return changeStateData(value, state, field)
}

function changeStateDataCardExpDate(value, state, field) {
  let newState = changeStateNumericData(
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

function validate(state, fieldToValidate) {
  const validationMethods = new Map(
    Object.entries({
      cardholderName: validation.validateCardholderName,
      cardNumber: validation.validateCardNumber,
      cardExpDate: validation.validateCardExpDate,
      cardCvc: validation.validateCardCvc,
    })
  )

  let validationResults

  if (fieldToValidate) {
    validationResults = new Map([
      [
        fieldToValidate,
        validationMethods.get(fieldToValidate)(
          state.data[fieldToValidate].value,
          true
        ),
      ],
    ])

    if (
      validationResults.get(fieldToValidate).status ===
        state.data[fieldToValidate].validation?.status &&
      validationResults.get(fieldToValidate).message ===
        state.data[fieldToValidate].validation?.message
    ) {
      return state
    }
  } else {
    validationResults = new Map(
      Array.from(validationMethods, (entry) => entry).map(
        ([fieldName, method]) => {
          return [
            fieldName,
            method(state.data[fieldName].value, true),
          ]
        }
      )
    )
  }

  let newState = {
    ...state,
    data: {
      ...state.data,
    },
  }

  for (let [
    fieldName,
    validationResult,
  ] of validationResults) {
    if (validationResult.isValid) {
      newState.data[fieldName] = {
        ...newState.data[fieldName],
        validation: null,
      }

      continue
    }

    newState.data[fieldName] = {
      ...newState.data[fieldName],
      validation: {
        status: validationResult.status,
        message: validationResult.message,
      },
    }
  }

  return newState
}
