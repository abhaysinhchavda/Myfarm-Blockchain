import * as React from "react"

function Eth(props) {
  return (
    <svg
      width={39}
      height={63}
      viewBox="0 0 39 63"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        opacity={0.6}
        d="M19.34 23.297L0 32.093l19.34 11.426 19.334-11.426-19.333-8.796z"
        fill="#010101"
      />
      <path
        opacity={0.45}
        d="M0 32.09l19.34 11.425V0L0 32.09z"
        fill="#010101"
      />
      <path
        opacity={0.8}
        d="M19.34 0v43.516l19.334-11.427L19.34 0z"
        fill="#010101"
      />
      <path
        opacity={0.45}
        d="M0 35.754L19.34 63V47.18L0 35.753z"
        fill="#010101"
      />
      <path
        opacity={0.8}
        d="M19.34 47.18V63L38.69 35.755 19.341 47.18z"
        fill="#010101"
      />
    </svg>
  )
}

export default Eth
