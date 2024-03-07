import './Button.css'
import ArrowLogo from '../../assets/arrow.svg';

const Button = (props) => {
  return (
    <div >
      <button className='btn' {...props}>
        {props.children}
        <img src={ArrowLogo} alt="" />
      </button>

    </div>
  )
}

export default Button