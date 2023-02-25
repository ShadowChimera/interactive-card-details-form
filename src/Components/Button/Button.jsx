import style from './Button.module.scss'

function Button({
  type,
  text,
  onClick,
  style: inlineStyle = {},
  className = '',
  ...props
}) {
  return type ? (
    <input
      style={inlineStyle}
      className={`${className} ${style.button}`}
      type={type}
      value={text}
      onClick={onClick}
      {...props}
    />
  ) : (
    <button
      style={inlineStyle}
      className={`${className} ${style.button}`}
      onClick={onClick}
      {...props}
    >
      {text}
    </button>
  )
}

export default Button
