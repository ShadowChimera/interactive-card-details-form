import style from './Form.module.scss'

import FormControl from './components/FormControl/FormControl'
import Button from '../Button/Button'
import { useState } from 'react'

function Form({ style: inlineStyle, className = '' }) {
  const [isDisabled, setIsDisabled] = useState(false)

  function handleFormSubmit(e) {
    e.preventDefault()

    if (isDisabled) {
      return
    }

    setIsDisabled(true)
  }

  return (
    <form
      style={inlineStyle}
      className={`${className} ${style.form}`}
    >
      <FormControl
        className={style.formControl}
        label="Cardholder Name"
        inputsConfig={{
          name: 'cardholderName',
          id: 'cardholderNameInput',
          placeholder: 'e.g. Jane Appleseed',
        }}
      />

      <FormControl
        className={style.formControl}
        label="Card Number"
        inputsConfig={{
          name: 'cardNumber',
          id: 'cardNumberInput',
          placeholder: 'e.g. 1234 5678 9123 0000',
        }}
      />

      <>
        <FormControl
          className={`${style.formControl} ${style.formControlColumn}`}
          label="Exp. Date (MM/YY)"
          inputsConfig={[
            {
              name: 'cardExpDateMonth',
              id: 'cardExpDateMonthInput',
              placeholder: 'MM',
            },
            {
              name: 'cardExpDateYear',
              id: 'cardExpDateYearInput',
              placeholder: 'YY',
            },
          ]}
        />
        <FormControl
          className={`${style.formControl} ${style.formControlColumn}`}
          label="CVC"
          inputsConfig={{
            name: 'cardCvc',
            id: 'cardCvcInput',
            placeholder: 'e.g. 123',
          }}
        />
      </>

      <Button
        type="submit"
        className={style.button}
        text="Confirm"
        onClick={handleFormSubmit}
      />
    </form>
  )
}

export default Form
