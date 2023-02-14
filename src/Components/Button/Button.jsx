import style from './Button.module.scss'

function Button({
  type,
  text,
  onClick,
  style: inlineStyle = {},
  className = '',
}) {
  return type ? (
    <input
      style={inlineStyle}
      className={`${className} ${style.button}`}
      type={type}
      value={text}
      onClick={onClick}
    />
  ) : (
    <button
      style={inlineStyle}
      className={`${className} ${style.button}`}
      onClick={onClick}
    >
      {text}
    </button>
  )
}

export default Button
