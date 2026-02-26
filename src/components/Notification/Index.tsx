import React, { useEffect } from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CloseIcon from "@mui/icons-material/Close";
import style from "styled-components";
declare type Props = {
  closeNotification: () => void;
};

const NotificationDiv = style.div`
  position: absolute;
  top: 180px;
  right: 50px;
  width: 510px;
  height: 77px;
  border-radius: 10px;
  background: #00c85321;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 99;
`;

const NotificationTitleDiv = style.div`
  position: relative;
  font-size: 17px;
  font-family: "Inter";
  line-height: 20.5px;
  font-style: normal;
  font-weight: normal;
  text-align: left;
  padding-top: 6px;
  padding-left: 60px;

`;

const NotificationIconDiv = style.div`
  position: absolute;
  left: 15px;
  top: 5px;
`;
const CloseIconDiv = style.div`
  position: absolute;
  right: 15px;
  top: 5px;
  cursor: pointer;
`;

const NotificationBodyDiv = style.div`
  font-size: 14px;
  font-family: "Inter";
  padding: 5px;
  padding-left: 60px;
  text-align: left;
`;
function Notification(props: Props) {
  const CloseMyNotification = React.useCallback(() => {
    setTimeout(() => {
      props.closeNotification();
    }, 2000);
  }, [props])
  useEffect(() => {
    CloseMyNotification()
  }, [CloseMyNotification]);
  return (
    <NotificationDiv>
      <NotificationTitleDiv>
        <NotificationIconDiv>
          <CheckCircleOutlineIcon className="notification-success-icon" />
        </NotificationIconDiv>
        Liquidity Removed
        <CloseIconDiv>
          <CloseIcon onClick={props.closeNotification} />
        </CloseIconDiv>
      </NotificationTitleDiv>

      <NotificationBodyDiv>
        Removed 6.45 USDT and 4.91 Matic, <a href="#">View on Explorer</a>
      </NotificationBodyDiv>
    </NotificationDiv>
  );
}

export default Notification;
