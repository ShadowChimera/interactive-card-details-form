import { forwardRef, useState } from 'react'

import style from './FormControl.module.scss'
const STATUS_STYLE = {
  error: style.danger,
}

import Input from '../../../Input/Input'

const FormControl = forwardRef(function FormControl(
  {
    type = 'text',
    id,
    name,
    placeholder,
    value,
    onChange,
    label,
    required = false,
    infoMessage,
    style: inlineStyle = {},
    className = '',
  },
  ref
) {
  const formControlContent = getFormControlContent({
    ref,
    type,
    id,
    name,
    placeholder,
    value,
    onChange,
    required,
  })

  return (
    <div
      style={inlineStyle}
      className={`${className} ${style.formControl} ${
        STATUS_STYLE[infoMessage?.status]
      }`}
    >
      <label htmlFor={null} className={style.label}>
        {label}
      </label>
      {formControlContent}
      <div className={style.infoMessage}>
        {infoMessage?.message}
      </div>
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
        key={props.get('id')}
        type={props.get('type')}
        id={props.get('id')}
        name={props.get('name')}
        placeholder={props.get('placeholder')}
        value={props.get('value')}
        onChange={props.get('onChange')}
        required={props.get('required')}
      />
    )
  }

  return (
    <div className={style.inputsWrapper}>
      {inputsProps.map((inputProps) => (
        <Input
          key={inputProps.get('id')}
          type={inputProps.get('type')}
          id={inputProps.get('id')}
          name={inputProps.get('name')}
          placeholder={inputProps.get('placeholder')}
          value={inputProps.get('value')}
          onChange={inputProps.get('onChange')}
          required={inputProps.get('required')}
        />
      ))}
    </div>
  )
}

function getInputsProps(inputsConfig) {
  if (!(inputsConfig instanceof Object)) {
    throw new TypeError(
      'inputsConfig must be an Object or Map'
    )
  }

  if (!(inputsConfig instanceof Map)) {
    inputsConfig = new Map(Object.entries(inputsConfig))
  }

  let inputsProps = null
  let defaultProps = new Map([['id', crypto.randomUUID()]])

  for (let [propName, propValue] of inputsConfig) {
    if (!Array.isArray(propValue)) {
      defaultProps.set(propName, propValue)
      continue
    }

    if (inputsProps === null) {
      inputsProps = new Array(propValue.length)

      for (let i = 0; i < inputsProps.length; i++) {
        inputsProps[i] = new Map()
      }
    } else if (inputsProps.length !== propValue.length) {
      throw new Error(
        `Inputs' properties must be the same length`
      )
    }

    for (let i = 0; i < inputsProps.length; i++) {
      inputsProps[i].set(propName, propValue[i])
    }
  }

  if (inputsProps === null) {
    return [defaultProps]
  }

  for (let i = 0; i < inputsProps.length; i++) {
    inputsProps[i] = new Map([
      ...defaultProps,
      ...inputsProps[i],
    ])
  }

  return inputsProps
}
