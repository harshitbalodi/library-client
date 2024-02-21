import './Button.css'

const Button = (props) => {
  return (
    <div>
       <button {...props}> {props.children}</button>
    </div>
  )
}

export default Button