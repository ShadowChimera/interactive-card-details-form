import { forwardRef } from 'react'
import style from './Input.module.scss'

const Input = forwardRef(function Input(
  { className = '', style: inlineStyle = {}, ...props },
  ref
) {
  return (
    <div
      className={`${className} ${style.input}`}
      style={inlineStyle}
    >
      <input ref={ref} {...props} />
    </div>
  )
})

export default Input
