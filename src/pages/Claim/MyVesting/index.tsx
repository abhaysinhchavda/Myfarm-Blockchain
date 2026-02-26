import React from 'react'
import VestingList from '../Component/VestingList'
import VastingDataTable from './VastignDataTable'

const MyVesting=()=>
{
    return(
        <div>
           <VestingList 
             Token={1000}
             Vested={5000}
             Claimed={100}
             SChedule="Monthly"
             climed={()=>alert('tested')}
          />
        <VastingDataTable/>
        </div>
    )
}
export default MyVesting 