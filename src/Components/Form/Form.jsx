import { useReducer, useRef, useState } from 'react'
import style from './Form.module.scss'

import Button from '../Button/Button'

import FormControl from './components/FormControl/FormControl'
import CardNumberControl from './components/CardNumberControl/CardNumberControl'
import formReducer from './formReducer'

function Form({ style: inlineStyle, className = '' }) {
  const [state, dispatch] = useReducer(formReducer, {
    // isDisabled: false, // TODO make form status
    status: 'default',
    data: {
      cardholderName: {
        value: '',
      },
      cardNumber: {
        value: '',
      },
      cardExpDate: {
        value: {
          month: '',
          year: '',
        },
      },
      cardCvc: {
        value: '',
      },
    },
  })

  // const inputRefs = useRef(new Map())

  function handleSubmit(e) {
    e.preventDefault()

    if (
      state.status === 'validating' ||
      state.status === 'sending'
    ) {
      return
    }

    dispatch({
      type: 'submitted_form',
    })
  }

  function handleCardholderNameChange(e) {
    dispatch({
      type: 'changed_cardholder_name',
      value: e.target.value,
    })
  }
  function handleExpDateMonthChange(e) {
    dispatch({
      type: 'changed_exp_date_month',
      value: e.target.value,
    })
  }
  function handleExpDateYearChange(e) {
    dispatch({
      type: 'changed_exp_date_year',
      value: e.target.value,
    })
  }
  function handleCvcChange(e) {
    dispatch({
      type: 'changed_cvc',
      value: e.target.value,
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
        value={state.data.cardholderName.value}
        status={
          state.data.cardholderName.validation?.status
        }
        infoMessage={
          state.data.cardholderName.validation?.message
        }
        onChange={handleCardholderNameChange}
      />

      <CardNumberControl
        className={style.formControl}
        label="Card Number"
        name="cardNumber"
        id="cardNumberInput"
        placeholder="e.g. 1234 5678 9123 0000"
        value={state.data.cardNumber.value}
        status={state.data.cardNumber.validation?.status}
        infoMessage={
          state.data.cardNumber.validation?.message
        }
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
            state.data.cardExpDate.value.month,
            state.data.cardExpDate.value.year,
          ]}
          onChange={[
            handleExpDateMonthChange,
            handleExpDateYearChange,
          ]}
          status={state.data.cardExpDate.validation?.status}
          infoMessage={
            state.data.cardExpDate.validation?.message
          }
        />
        <FormControl
          className={`${style.formControl} ${style.formControlColumn}`}
          label="CVC"
          name="cardCvc"
          id="cardCvcInput"
          placeholder="e.g. 123"
          value={state.data.cardCvc.value}
          status={state.data.cardCvc.validation?.status}
          infoMessage={
            state.data.cardCvc.validation?.message
          }
          onChange={handleCvcChange}
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
