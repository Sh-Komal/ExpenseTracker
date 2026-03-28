import React from 'react'
import { getIntials } from '../../utils/helper'

const CharAvatar = ({fullName,width,heigth,style}) => {
  return (
    <div className={`${heigth|| "h-12"}  ${width || " w-12"} ${style || ''} flex items-center justify-center rounded-full text-gray-900 font-medium bg-gray-100 `}>

        {getIntials(fullName || "")}
    </div>
  )
}

export default CharAvatar