import { forwardRef } from 'react'
import style from './Input.module.scss'

const Input = forwardRef(function Input(
  {
    type = 'text',
    id,
    name,
    placeholder = '',
    value = '',
    required = false,
    onChange,
    onSelect,
    className = '',
    style: inlineStyle = {},
  },
  ref
) {
  return (
    <div
      className={`${className} ${style.input}`}
      style={inlineStyle}
    >
      <input
        ref={ref}
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onSelect={onSelect}
        required={required}
      />
    </div>
  )
})

// function Input({
//   type = 'text',
//   id,
//   name,
//   placeholder = '',
//   value = '',
//   required = false,
//   onChange,
//   className = '',
//   style: inlineStyle = {},
// }) {
//   return (
//     <div
//       className={`${className} ${style.input}`}
//       style={inlineStyle}
//     >
//       <input
//         type={type}
//         id={id}
//         name={name}
//         placeholder={placeholder}
//         value={value}
//         onChange={onChange}
//         required={required}
//       />
//     </div>
//   )
// }

export default Input
