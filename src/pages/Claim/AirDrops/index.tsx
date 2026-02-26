import React from 'react'
import AirDropList from '../Component/AirDropsList'
import Claim1 from '../../../assets/images/New/claim1.png'
import Claim2 from '../../../assets/images/New/claim2.png'
import AirdopsTable from './AirDropsTable'
const AirDrops=()=>
{
    return(
        <div>
        <AirDropList
          Token={10000}
          Amount={121}
          AirDropOn="10/12/2020"
          TokenImage={Claim1}
          climed={()=>alert('hello')}
          />
          <AirDropList
          Token={10000}
          Amount={121}
          TokenImage={Claim2}
          AirDropOn="10/12/2020"
          climed={()=>alert('hello')}
          />
          <AirdopsTable/>
  </div>
)
}
export default AirDrops