import React from 'react'

function Button({
    onClick,
}) {
  return (
    <div>
        <button onClick={onClick}  className="bg-[#5494DC] text-[18px] py-4 px-8 rounded-[8px] text-white" />
    </div>
  )
}

export default Button