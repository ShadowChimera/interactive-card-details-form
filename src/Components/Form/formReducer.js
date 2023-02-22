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
      return changeStateNumericData(
        action.value,
        state,
        'cardExpDateMonth',
        2
      )
    }
    case 'changed_exp_date_year': {
      return changeStateNumericData(
        action.value,
        state,
        'cardExpDateYear',
        2
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
      [field]: value,
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
