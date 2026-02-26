import * as React from "react"

function SvgComponent(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      viewBox="0 0 45.63 45.63"
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
            d="M39.22 2.85L34.5 8.1a1.36 1.36 0 00.16 2l10 8.1a1.37 1.37 0 01.16 2l-5.63 6.2a1.54 1.54 0 01-2.11.15l-9.95-8.09a1.56 1.56 0 00-2.11.15l-4.73 5.25a1.52 1.52 0 01-2.62-.71l-3.3-20.9A1.44 1.44 0 0115.84.62L38.08.5a1.42 1.42 0 011.14 2.35z"
          />
          <path
            className="prefix__cls-1"
            d="M6.41 42.78l4.73-5.24a1.38 1.38 0 00-.17-2L1 27.43a1.37 1.37 0 01-.16-2l5.58-6.2a1.56 1.56 0 012.11-.15l10 8.09a1.56 1.56 0 002.08-.17l4.73-5.25a1.52 1.52 0 012.62.71l3.3 20.9A1.45 1.45 0 0129.79 45l-22.24.11a1.42 1.42 0 01-1.14-2.33z"
          />
        </g>
      </g>
    </svg>
  )
}

export default SvgComponent
