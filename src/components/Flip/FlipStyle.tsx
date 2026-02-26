import { createStyles, makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) =>
  createStyles({
    selectBoxWrappewr:{
        width: '50%', textAlign: 'left'
    },
   MenuWrapper:{
    display: 'flex', alignItems: 'center'
   },
   TextWrapper:{
    width: '50%', textAlign: 'right', marginTop: '27px'
   },
   Modal: {
    overflow: "hidden",
    "&>.MuiDialog-container>.MuiPaper-root": {
      borderRadius: "15px",
     
      opacity: "1",
      [theme.breakpoints.down("sm")]: {
        
      },
    },
  },
  ModalWrapper:{
    width:370,display:'flex',flexDirection:'column',alignItems:'center'
  },
  CheckImage:{
    marginTop:'1rem',marginBottom:'1rem'
  },
  MainTitle:{
    marginBottom:'1rem',fontWeight:'bold',fontSize:16
  },
  LinkExplorer:{
    display:'flex',alignItems:'center',textDecoration:'none',color:'rgba(97, 97, 97, 1)',
    marginTop:'1rem',
    marginBottom:'1rem',
    
  }
  }))
  export default useStyles;