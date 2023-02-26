import {
  memo,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react'
import style from './Form.module.scss'

import Button from '../Button/Button'

import FormControl from './components/FormControl/FormControl'
import CardNumberControl from './components/CardNumberControl/CardNumberControl'
import formReducer from './formReducer'

function Form({ style: inlineStyle, className = '' }) {
  const [state, dispatch] = useReducer(formReducer, {
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

  function handleSubmit(e) {
    e.preventDefault()

    dispatch({
      type: 'submitted_form',
    })
  }

  /* -------------------------------------------------------------------------- */
  /*                               FORM SUBMITTING                              */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    if (state.status !== 'sending') {
      return
    }

    console.log('sending...')
    let timerId = setTimeout(
      () => console.log('success!'),
      1000
    )

    return () => {
      clearTimeout(timerId)
    }
  }, [state.status])

  return (
    <form
      style={inlineStyle}
      className={`${className} ${style.form}`}
      onSubmit={handleSubmit}
    >
      <FormContent
        data={state.data}
        dispatch={dispatch}
        disabled={
          state.status === 'sending' ||
          state.status === 'success'
        }
      />
      <Button
        className={style.button}
        text={
          state.status === 'sending' ? (
            <LoadingIcon />
          ) : (
            'Confirm'
          )
        }
      />
    </form>
  )
}

export default Form

/* -------------------------------------------------------------------------- */
/*                                FORM CONTENT                                */
/* -------------------------------------------------------------------------- */

const FormContent = memo(function FormContent({
  data,
  dispatch,
  disabled = false,
}) {
  function handleCardholderNameChange(e) {
    if (disabled) {
      return
    }

    dispatch({
      type: 'changed_cardholder_name',
      value: e.target.value,
    })
  }
  function handleExpDateMonthChange(e) {
    if (disabled) {
      return
    }

    dispatch({
      type: 'changed_exp_date_month',
      value: e.target.value,
    })
  }
  function handleExpDateYearChange(e) {
    if (disabled) {
      return
    }

    dispatch({
      type: 'changed_exp_date_year',
      value: e.target.value,
    })
  }
  function handleCvcChange(e) {
    if (disabled) {
      return
    }

    dispatch({
      type: 'changed_cvc',
      value: e.target.value,
    })
  }

  function handleCardholderNameBlur(e) {
    dispatch({
      type: 'removed_focus_from_cardholder_name',
    })
  }
  function handleCardNumberBlur(e) {
    dispatch({
      type: 'removed_focus_from_card_number',
    })
  }
  function handleExpDateMonthBlur(e) {
    dispatch({
      type: 'removed_focus_from_exp_date_month',
    })
  }
  function handleExpDateYearBlur(e) {
    dispatch({
      type: 'removed_focus_from_exp_date_year',
    })
  }
  function handleCvcBlur(e) {
    dispatch({
      type: 'removed_focus_from_cvc',
    })
  }

  return (
    <>
      <FormControl
        className={style.formControl}
        label="Cardholder Name"
        status={data.cardholderName.validation?.status}
        message={data.cardholderName.validation?.message}
        inputs={[
          {
            name: 'cardholderName',
            id: 'cardholderNameInput',
            placeholder: 'e.g. Jane Appleseed',
            value: data.cardholderName.value,
            onChange: handleCardholderNameChange,
            onBlur: handleCardholderNameBlur,
          },
        ]}
      />
      <CardNumberControl
        className={style.formControl}
        label="Card Number"
        name="cardNumber"
        id="cardNumberInput"
        placeholder="e.g. 1234 5678 9123 0000"
        value={data.cardNumber.value}
        status={data.cardNumber.validation?.status}
        message={data.cardNumber.validation?.message}
        dispatch={dispatch}
        onBlur={handleCardNumberBlur}
      />
      <>
        <FormControl
          className={`${style.formControl} ${style.formControlColumn}`}
          label="Exp. Date (MM/YY)"
          message={data.cardExpDate.validation?.message}
          status={
            data.cardExpDate.validation?.status.month ||
            data.cardExpDate.validation?.status.year
          }
          inputs={[
            {
              name: 'cardExpDateMonth',
              id: 'cardExpDateMonthInput',
              placeholder: 'MM',
              value: data.cardExpDate.value.month,
              status:
                data.cardExpDate.validation?.status.month,
              onChange: handleExpDateMonthChange,
              onBlur: handleExpDateMonthBlur,
            },
            {
              name: 'cardExpDateYear',
              id: 'cardExpDateYearInput',
              placeholder: 'YY',
              value: data.cardExpDate.value.year,
              status:
                data.cardExpDate.validation?.status.year,
              onChange: handleExpDateYearChange,
              onBlur: handleExpDateYearBlur,
            },
          ]}
        />
        <FormControl
          className={`${style.formControl} ${style.formControlColumn}`}
          label="CVC"
          status={data.cardCvc.validation?.status}
          message={data.cardCvc.validation?.message}
          inputs={[
            {
              name: 'cardCvc',
              id: 'cardCvcInput',
              placeholder: 'e.g. 123',
              value: data.cardCvc.value,
              onChange: handleCvcChange,
              onBlur: handleCvcBlur,
            },
          ]}
        />
      </>
    </>
  )
})

/* -------------------------------------------------------------------------- */
/*                                    ICONS                                   */
/* -------------------------------------------------------------------------- */

function LoadingIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      style={{
        margin: 'auto',
        background: '',
        display: 'block',
        shapeRendering: 'auto',
      }}
      width="18px"
      height="18px"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
    >
      <circle
        cx={50}
        cy={50}
        fill="none"
        stroke="#ffffff"
        strokeWidth={10}
        r={35}
        strokeDasharray="164.93361431346415 56.97787143782138"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          repeatCount="indefinite"
          dur="1s"
          values="0 50 50;360 50 50"
          keyTimes="0;1"
        />
      </circle>
    </svg>
  )
}
