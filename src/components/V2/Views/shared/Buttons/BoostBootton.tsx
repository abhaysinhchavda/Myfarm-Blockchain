import React from 'react';

// import APYCalc from "../../../Modals/APYCalculator/APYCalc";
// import Boost from '../../../../../assets/V2/Images/boost2.png';
// import Calc from '../../../../../assets/V2/Images/calc.png';
import style from 'styled-components';
import { createStyles, makeStyles } from '@material-ui/core/styles';



const MyButton = style.button`
display: flex;
flex-direction: row;
justify-content: center;
background: transparent;
align-items: center;
width:50%;

position: static;

height: 50px;
left: 0px;
top: 0px;

/* tertiary_brand/main */

border: 1px solid #03A9F4;
box-sizing: border-box;
border-radius: 10px;


/* Inside auto layout */

flex: none;
order: 0;
flex-grow: 0;

&:hover {
   
   
    cursor:pointer;
  }



  
`;

interface BoostButtonProps {
  boostIcon: string;
  boostTitle : string;
  noButton: boolean;
  handleClick: () => void;
}

const BoostButton = ({
  boostIcon,
  boostTitle,
  handleClick,
  noButton
}: BoostButtonProps) => {
  const useStyle = makeStyles((theme) =>
    createStyles({
      Root: {
        overflow: 'hidden',
        '&>.MuiDialog-container>.MuiPaper-root': {
          borderRadius: '15px',
          width: '550px',
          [theme.breakpoints.down('md')]: {
            margin: '0px',
            width: '330px',
          },
        },
      },

      DialogContent: {
        padding: '0px',
      },

      boosted: {
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '11px',
        lineHeight: '15px',
        /* identical to box height */
         display:'flex',
         alignItems:'center',
        textAlign: 'center',
        textTransform: 'capitalize',

        /* tertiary_brand/dark */

        color: '#005AD1',
      },

      boostedSpan: {
        marginLeft: '5px',
      },

      boostUpto: {
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '12px',
        lineHeight: '15px',
        /* identical to box height */

        textAlign: 'center',
        textTransform: 'capitalize',

        /* tertiary_brand/dark */

        color: '#005AD1',
      },
    })
  );

  const classe = useStyle();

  return (
    <>
    {noButton === true ? null : <MyButton onClick={handleClick}>
          
          <div className={classe.boosted}>
            <img src={boostIcon} width={15} />
            <span className={classe.boostedSpan}>{boostTitle}</span>
          </div>
      
      </MyButton>}
          
        
    </>
  );
};
export default BoostButton;
