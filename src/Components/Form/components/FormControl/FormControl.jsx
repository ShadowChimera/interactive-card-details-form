import { forwardRef } from 'react'

import style from './FormControl.module.scss'
const STATUS_STYLE = {
  error: style.danger,
}

import Input from '../../../Input/Input'

const FormControl = forwardRef(function FormControl(
  {
    label,
    status,
    infoMessage,
    style: inlineStyle = {},
    className = '',
    ...inputProps
  },
  ref
) {
  const formControlContent = getFormControlContent({
    ...inputProps,
    ref,
  })

  return (
    <div
      style={inlineStyle}
      className={`${className} ${style.formControl} ${STATUS_STYLE[status]}`}
    >
      <label htmlFor={null} className={style.label}>
        {label}
      </label>
      {formControlContent}
      <div className={style.infoMessage}>{infoMessage}</div>
    </div>
  )
})

export default FormControl

function getFormControlContent(inputsConfig) {
  const inputsProps = getInputsProps(inputsConfig)

  if (inputsProps.length === 1) {
    const props = inputsProps[0]

    return <Input {...props} />
  }

  return (
    <div className={style.inputsWrapper}>
      {inputsProps.map((inputProps) => (
        <Input key={inputProps.id} {...inputProps} />
      ))}
    </div>
  )
}

function getInputsProps(inputsConfig) {
  if (!(inputsConfig instanceof Object)) {
    throw new TypeError('inputsConfig must be an Object')
  }

  let inputsProps = null
  let defaultProps = {
    id: crypto.randomUUID(),
  }

  for (let [propName, propValue] of Object.entries(
    inputsConfig
  )) {
    if (!Array.isArray(propValue)) {
      defaultProps[propName] = propValue
      continue
    }

    if (inputsProps === null) {
      inputsProps = new Array(propValue.length)

      for (let i = 0; i < inputsProps.length; i++) {
        inputsProps[i] = {}
      }
    } else if (inputsProps.length !== propValue.length) {
      throw new Error(
        `Inputs' properties must be the same length`
      )
    }

    for (let i = 0; i < inputsProps.length; i++) {
      inputsProps[i][propName] = propValue[i]
    }
  }

  if (inputsProps === null) {
    return [defaultProps]
  }

  for (let i = 0; i < inputsProps.length; i++) {
    inputsProps[i] = {
      ...defaultProps,
      ...inputsProps[i],
    }
  }

  return inputsProps
}
