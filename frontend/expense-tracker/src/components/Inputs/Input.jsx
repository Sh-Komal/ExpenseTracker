import React from 'react'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa"

const Input = ({ value, onChange, lable, placeholder, type }) => {

  const [showpassword, setShowPassword] = React.useState(false)

  const toggleShowPassword = () => {
    setShowPassword(!showpassword)
  }
  return (
    <div>
      <label className=' text-[13px] text-slate-800'>{lable}</label>
      <div className=' relative'>


        <input type={type == "password" ? showpassword ? "text" : "password" : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full bg-transparent outline-none input-box" />

        {type == "password" &&
          (<div className=' absolute top-3 right-3'>{showpassword ? (<FaRegEye size={22} className='text-primary cursor-pointer'
            onClick={() => toggleShowPassword()} />)
            : (<FaRegEyeSlash size={22} className=' text-slate-400 cursor-pointer'
              onClick={() => toggleShowPassword()} />)}
          </div>)}
      </div>
    </div>
  )
}

export default Input