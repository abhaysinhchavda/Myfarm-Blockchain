import * as React from "react"

function SvgComponent(props) {
  return (
    <svg
      width={23}
      height={20}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M14.81 2.858a8.62 8.62 0 103.843 7.174"
        stroke="#1EA72C"
        strokeLinecap="round"
      />
      <path
        d="M5.38 9.063l3.005 3.138a2 2 0 002.889 0L22 1.001"
        stroke="#1EA72C"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </svg>
  )
}

export default SvgComponent
