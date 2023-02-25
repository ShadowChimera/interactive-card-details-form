import { forwardRef } from 'react'

import style from './FormControl.module.scss'

import Input from '../../../Input/Input'

export const FormControl = forwardRef(function FormControl(
  {
    label,
    status,
    message,
    inputs = [],
    style: inlineStyle = {},
    className = '',
    ...inlineInputConfig
  },
  ref
) {
  /* ------------------------------ CONFIGURATION ----------------------------- */

  const config = {
    label,
    status,
    message,
    inputs,
  }

  if (!config.inputs.length) {
    config.inputs = [
      {
        ...inlineInputConfig,
        ref,
      },
    ]
  }

  /* --------------------------- CONTENT GENERATION --------------------------- */

  let statusStyle = getStatusStyle(config.status)

  const content = getContent(config)

  /* --------------------------------- MARKUP --------------------------------- */

  return (
    <div
      style={inlineStyle}
      className={`${className} ${style.formControl} ${statusStyle}`}
    >
      {content}
    </div>
  )
})

export default FormControl

/* -------------------------------------------------------------------------- */
/*                             CONTENT GENERATION                             */
/* -------------------------------------------------------------------------- */

function getContent(config) {
  const { label, message, inputs } = config
  let content = {
    inputs: getInputs(inputs),
  }

  if (typeof label !== 'undefined') {
    content.label = (
      <label
        htmlFor={inputs[0]?.id}
        className={style.label}
      >
        {label}
      </label>
    )
  }

  if (typeof message !== 'undefined') {
    content.message = (
      <div className={style.infoMessage}>{message}</div>
    )
  }

  return (
    <>
      {content.label}
      {content.inputs}
      {content.message}
    </>
  )
}

function getInputs(inputs) {
  let content = []

  for (let config of inputs) {
    const { label, status, message, ...inputConfig } =
      config

    inputConfig.id = inputConfig.id ?? crypto.randomUUID()

    let partialsContent = {
      input: (
        <Input
          {...inputConfig}
          className={`${style.input} ${inputConfig.className}`}
        />
      ),
    }

    if (typeof label !== 'undefined') {
      partialsContent.label = (
        <label
          htmlFor={inputConfig.id}
          className={style.label}
        >
          {label}
        </label>
      )
    }

    if (typeof message !== 'undefined') {
      partialsContent.message = (
        <div className={style.infoMessage}>{message}</div>
      )
    }

    content.push(
      <div
        key={inputConfig.id ?? crypto.randomUUID()}
        className={`${
          style.inputContainer
        } ${getStatusStyle(status)}`}
      >
        {partialsContent.label}
        {partialsContent.input}
        {partialsContent.message}
      </div>
    )
  }

  if (content.length > 1) {
    content = (
      <div className={style.inputsWrapper}>{content}</div>
    )
  }

  return content
}

/* -------------------------------------------------------------------------- */
/*                                   STYLING                                  */
/* -------------------------------------------------------------------------- */

const STATUS_STYLES = {
  error: style.danger,
  default: style.default,
}

function getStatusStyle(status) {
  if (typeof status !== 'undefined') {
    status = status || 'default'
  }

  return STATUS_STYLES[status]
}
