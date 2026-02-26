import React from 'react';
import Modal from '../Modal/index'
import Check from '../../assets/flip/check.png'
import useStyles from './FlipStyle'
import LaunchIcon from '@mui/icons-material/Launch';
interface Props {
  open: boolean
  close: () => void
  title: string;
  content: string;
  explorer:boolean
}
const TransactionSuccess = ({ open, close, title, content,explorer }: Props) => {
  const classes = useStyles()
  return (
    <Modal
      open={open}
      close={close}
      title={"Transaction Successfull"}
      headerClass="SettingHeader"
      className={classes.Modal}
    >
      <div className={classes.ModalWrapper}>
        <img src={Check} width={80} className={classes.CheckImage} />
        <div className={classes.MainTitle}>{title}</div>
        <div style={{ color: 'rgba(33, 33, 33, 1)', textAlign: 'center' }}>{content}</div>
        {
          explorer?<a href="" className={classes.LinkExplorer}><LaunchIcon style={{ fontSize: 20 }} />&nbsp;&nbsp;View in Explorer</a>:null
        }
        

      </div>
    </Modal>
  )
}

export default TransactionSuccess;
