import { useReducer, useRef, useState } from 'react'
import style from './Form.module.scss'

import Button from '../Button/Button'

import FormControl from './components/FormControl/FormControl'
import CardNumberControl from './components/CardNumberControl/CardNumberControl'
import formReducer from './formReducer'

function Form({ style: inlineStyle, className = '' }) {
  const [state, dispatch] = useReducer(formReducer, {
    isDisabled: false,
    data: {
      cardholderName: '',
      cardNumber: '',
      cardExpDateMonth: '',
      cardExpDateYear: '',
      cardCvc: '',
    },
  })

  function handleSubmit(e) {
    e.preventDefault()

    dispatch({
      type: 'submitted_form',
    })
  }

  return (
    <form
      style={inlineStyle}
      className={`${className} ${style.form}`}
      onSubmit={handleSubmit}
    >
      <FormControl
        className={style.formControl}
        label="Cardholder Name"
        name="cardholderName"
        id="cardholderNameInput"
        placeholder="e.g. Jane Appleseed"
        value={state.data.cardholderName}
      />

      <CardNumberControl
        className={style.formControl}
        label="Card Number"
        name="cardNumber"
        id="cardNumberInput"
        placeholder="e.g. 1234 5678 9123 0000"
        value={state.data.cardNumber}
        dispatch={dispatch}
      />

      <>
        <FormControl
          className={`${style.formControl} ${style.formControlColumn}`}
          label="Exp. Date (MM/YY)"
          name={['cardExpDateMonth', 'cardExpDateYear']}
          id={[
            'cardExpDateMonthInput',
            'cardExpDateYearInput',
          ]}
          placeholder={['MM', 'YY']}
          value={[
            state.data.cardExpDateMonth,
            state.data.cardExpDateYear,
          ]}
        />
        <FormControl
          className={`${style.formControl} ${style.formControlColumn}`}
          label="CVC"
          name="cardCvc"
          id="cardCvcInput"
          placeholder="e.g. 123"
          value={state.data.cardCvc}
        />
      </>

      <Button
        type="submit"
        className={style.button}
        text="Confirm"
        // onClick={handleFormSubmit}
      />
    </form>
  )
}

export default Form
