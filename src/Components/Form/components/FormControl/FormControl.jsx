import PropTypes from 'prop-types'

import style from './FormControl.module.scss'

import Input from '../../../Input/Input'
import { useState } from 'react'

const INPUT_CONFIG_TEMPLATE = {
  id: crypto.randomUUID,
  type: 'text',
  placeholder: '',
  value: '',
}

function FormControl({
  label,
  inputsConfig = INPUT_CONFIG_TEMPLATE,
  require = false,
  style: inlineStyle = {},
  className = '',
}) {
  if (!Array.isArray(inputsConfig)) {
    inputsConfig = [inputsConfig]
  }

  inputsConfig = getProcessedInputsConfig(inputsConfig)

  const [inputsValue, setInputsValue] = useState(
    inputsConfig.map((inputConfig) => inputConfig.value)
  )

  const formControlContent =
    getFormControlContent(inputsConfig)

  return (
    <div
      style={inlineStyle}
      className={`${className} ${style.formControl}`}
    >
      <label
        htmlFor={inputsConfig[0].id}
        className={style.label}
      >
        {label}
      </label>
      {formControlContent}
      <div className={style.infoMessage}></div>
    </div>
  )
}

export default FormControl

FormControl.propTypes = {
  inputsConfig: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
}

function getProcessedInputsConfig(inputsConfig) {
  return inputsConfig.map((inputConfig) => {
    const isConfigObject =
      typeof inputConfig === 'object' &&
      !Array.isArray(inputConfig) &&
      inputConfig !== null

    if (!isConfigObject) {
      throw new TypeError(
        `inputsConfig property must be an object or an array with objects: ${inputConfig}`
      )
    }

    return {
      ...INPUT_CONFIG_TEMPLATE,
      ...inputConfig,
    }
  })
}

function getFormControlContent(inputsConfig) {
  const inputElements = inputsConfig.map((inputConfig) => (
    <Input
      key={inputConfig.id}
      type={inputConfig.type}
      id={inputConfig.id}
      name={inputConfig.name}
      placeholder={inputConfig.placeholder}
      value={inputConfig.value}
    />
  ))

  const formControlContent =
    inputsConfig.length > 1 ? (
      <div className={style.inputsWrapper /* TODO */}>
        {inputElements}
      </div>
    ) : (
      inputElements
    )

  return formControlContent
}
