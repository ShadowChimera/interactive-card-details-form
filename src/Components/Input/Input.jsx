import style from './Input.module.scss'

function Input({
  type = 'text',
  id,
  name,
  placeholder = '',
  value = '',
  required = false,
  onChange,
  className = '',
  style: inlineStyle = {},
}) {
  return (
    <div
      className={`${className} ${style.input}`}
      style={inlineStyle}
    >
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  )
}

export default Input
