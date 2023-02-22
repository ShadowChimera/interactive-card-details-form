function formReducer(state, action) {
  switch (action.type) {
    case 'submitted_form': {
      if (state.isDisabled) {
        return state
      }

      return {
        ...state,
        isDisabled: true,
      }
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
