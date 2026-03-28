import React from "react";

const InfoCard = ({ icon, lable, value, color }) => {
  return (
    <div className=" flex gap-6 bg-white p-6 rounded-2xl shadow-md">
     <div className={`w-14 h-14 flex items-center justify-center text-white rounded-full ${color} drop-shadow-2xl`}>
        {icon}
     </div>
     <div>
        <h6 className=" text-sm text-gray-500 mb-1">{lable}</h6>
        <span className=" text-[22px]">${value}</span>
     </div>
    </div>
  )
};

export default InfoCard;
