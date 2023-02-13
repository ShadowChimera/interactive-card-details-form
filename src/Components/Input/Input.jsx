import style from './Input.modules.scss'

function Input({
  type = 'text',
  id,
  name,
  className,
  style: inlineStyle,
  value = '',
  onChange,
}) {
  return (
    <input
      style={inlineStyle}
      className={`${className} ${style.input}`}
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
    />
  )
}

export default Input
