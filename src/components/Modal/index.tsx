import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";
import { ButtonBg, TextColor } from "../../stylevariable";
import "./Modal.css";

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    spanText: {
      [theme.breakpoints.down("xs")]: {
        fontSize: "17px !important",
      },
    },
    Root: {
      "&>.MuiBackdrop-root": {
        backgroundColor: ButtonBg.myBackground + "!important",
        opacity: "0.5 !important",
      },
    },
  })
);

interface ModalProps {
  title: any;
  open: boolean;
  close: () => void;
  className: string;
  headerClass: string;
  children: React.ReactNode;
}

const Modal = ({title,open,close,className,headerClass,children}: ModalProps): JSX.Element => {
  
  const classes = useStyle();
  
  return (
    <div>
      <Dialog
        open={open}
        onClose={close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className={className + " " + classes.Root}
      >
        <DialogTitle
          id="alert-dialog-title"
          className={headerClass}
          style={{
            borderBottom: "1px solid #80808057",
            color: "black",
            paddingBottom: "0.2rem",
            paddingTop: "0.2rem",
            paddingLeft: "1rem",
            paddingRight: "1rem",
          }}
        >
          <div
            className="TextDarkModal"
            style={{
              justifyContent: "space-between",
              display: "flex",
              alignItems: "center",
              color: TextColor.textColor,
              fontWeight: 700,
            }}
          >
            {title}
            <IconButton
              onClick={close}
              style={{ color: TextColor.textColor, fontWeight: 800 }}
            >
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        {/* {props.suggestion ? (
          <div
            style={{
              borderBottom: "1px solid #80808057",
              paddingTop: "1rem",
              paddingBottom: "1rem",
            }}
          >
            {props.suggestion}
          </div>
        ) : null} */}

        <DialogContent>{children}</DialogContent>
      </Dialog>
    </div>
  );
};
export default Modal;
