interface StakedAmtROIProps{
    stakedAmt:any;
    ROI:any;
}


const StakedAmtROI = (props:StakedAmtROIProps) => {

    return (
        <div>
        <span
                style={{
                  display: "flex",
                  top: "78px",
                  left: "31px",
                  fontFamily: "Inter",
                  fontStyle: "normal",
                  marginBottom: "1rem",
                  fontWeight: "normal",
                  fontSize: "20px",
                  lineHeight: "24px",
                  color: "black",
                  marginTop:35

                }}
              >
                Staked Amount
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                ROI
              </span>
              <span
                style={{
                  display: "flex",
                  top: "75px",
                  left: "31px",
                  marginBottom: "1rem",
                  fontFamily: "Inter",
                  fontStyle: "normal",
                  fontWeight: "normal",
                  fontSize: "20px",
                  lineHeight: "24px",
                  color: "#000000",
                }}
              >
                {props.stakedAmt}
               &nbsp;&nbsp;  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {props.ROI}%
              </span>
              </div>
    );
}

export default StakedAmtROI;