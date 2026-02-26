import * as React from "react"

function SvgComponent(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      viewBox="0 0 45.63 42.07"
      {...props}
    >
      <g data-name="Layer 2">
        <path
          d="M.85 18.72L21.74.74a1 1 0 011.3 0l21.73 18a1 1 0 01-.64 1.77h-1.84a1 1 0 00-1 1v19.05a1 1 0 01-1 1H29.38a1 1 0 01-1-1v-9a1 1 0 00-1-1H18.6a1 1 0 00-1 1v9a1 1 0 01-1 1H5.92a1 1 0 01-1-1V21.49a1 1 0 00-1-1H1.51a1 1 0 01-.66-1.77z"
          fill="none"
          stroke="#000"
          strokeMiterlimit={10}
          data-name="Layer 1"
        />
      </g>
    </svg>
  )
}

export default SvgComponent
