import * as React from "react"

function SvgComponent(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      viewBox="0 0 45.63 45.07"
      {...props}
    >
      <defs>
        <style>
          {".prefix__cls-1{fill:none;stroke:#000;stroke-miterlimit:10}"}
        </style>
      </defs>
      <g id="prefix__Layer_2" data-name="Layer 2">
        <g id="prefix__Layer_1-2" data-name="Layer 1">
          <path
            className="prefix__cls-1"
            d="M.5 22.43v-1a2.26 2.26 0 012-2.29c1.06-.08 1.33.67 1.33 2.65s.63 2.26 2.49 2c4.87-.68 9.79-1.2 14.7-1.6a3.39 3.39 0 001.89-.65A3.28 3.28 0 0024.08 20c1.61-3.47 3.35-6.8 5.05-10.26 2.09-4.28 2.07-4.22-2.58-5.8-.77-.27-1.79-1.34-1.77-2C24.78.5 26.14.29 27.3.66a40.9 40.9 0 016.25 2.26 22.24 22.24 0 0111.19 23.67 22.64 22.64 0 01-20.39 17.88 21.44 21.44 0 01-22.2-13.91c-.26-.79-.51-1.59-.76-2.38a19 19 0 01-.89-5.75z"
          />
          <path
            className="prefix__cls-1"
            d="M22.36 11.26a7.85 7.85 0 01-1.44 4.34 7.76 7.76 0 01-3.6 2.82A7.9 7.9 0 017.19 7.94a8 8 0 012.94-3.5 7.85 7.85 0 017.44-.64 7.69 7.69 0 012.56 1.77 7.82 7.82 0 011.69 2.62 8.05 8.05 0 01.54 3.07z"
          />
        </g>
      </g>
    </svg>
  )
}

export default SvgComponent
