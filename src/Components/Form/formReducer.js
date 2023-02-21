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
      if (action.value === state.data.cardNumber) {
        return state
      }

      return {
        ...state,
        data: {
          ...state.data,
          cardNumber: action.value,
        },
      }
    }
    default: {
      throw Error('Unknown action: ' + action.type)
    }
  }
}

export default formReducer
