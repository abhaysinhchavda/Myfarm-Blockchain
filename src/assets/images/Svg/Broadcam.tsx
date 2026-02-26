import * as React from "react"

function Broadcam(props) {
  return (
    <svg
      viewBox="0 0 960 540"
      preserveAspectRatio="xMidYMax slice"
      xmlns="http://www.w3.org/2000/svg"
      className="prefix__absolute prefix__inset-0 prefix__pointer-events-none"
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth={100}
        className="prefix__text-gray-700 prefix__opacity-25"
      >
        <circle r={234} cx={196} cy={23} />
        <circle r={234} cx={790} cy={491} />
      </g>
    </svg>
  )
}

export default Broadcam