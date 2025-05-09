import './button.css'

const Button = ({text,onClick}) => {
  return (

<div className='butttonContainer'>
      <button className='connectButton' onClick={onClick}>
          {text}
      </button>
</div>
  )
}

export  default Button