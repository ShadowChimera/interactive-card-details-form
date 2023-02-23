import { forwardRef } from 'react'

import style from './FormControl.module.scss'

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
  let [statusStyle, generalStatusStyle] =
    getStatusStyle(status)

  const formControlContent = getFormControlContent({
    ...inputProps,
    className: statusStyle,
    ref,
  })

  return (
    <div
      style={inlineStyle}
      className={`${className} ${style.formControl} ${generalStatusStyle}`}
    >
      <label
        htmlFor={null /* TODO htmlFor  */}
        className={style.label}
      >
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

    return (
      <Input
        {...props}
        className={`${style.input} ${props.className}`}
      />
    )
  }

  return (
    <div className={style.inputsWrapper}>
      {inputsProps.map((inputProps) => (
        <Input
          key={inputProps.id}
          {...inputProps}
          className={`${style.input} ${inputProps.className}`}
        />
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

function getStatusStyle(status) {
  const STATUS_STYLE = {
    error: style.danger,
  }

  let statusStyle, generalStatusStyle

  if (Array.isArray(status)) {
    statusStyle = status.map(
      (status) => STATUS_STYLE[status]
    )
    generalStatusStyle = statusStyle.find(
      (status) => status
    )
  } else {
    statusStyle = STATUS_STYLE[status]
    generalStatusStyle = statusStyle
  }

  return [statusStyle, generalStatusStyle]
}
