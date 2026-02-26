import React from 'react'

import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from "@material-ui/core/styles";


import SettingsIcon from '@material-ui/icons/Settings';
interface IsManage {
    TokenName: String;
    TokenImage: any;
    children: React.ReactNode;
    ThemeColor: any;
    TotalToken:any;
    ThemeText:any;

}

const ManageTokenList = (props: IsManage) => {
    const useStyles = makeStyles((theme) => ({
        TokenText: {
            "&>span": {
                fontWeight: 600,
                [theme.breakpoints.down('xs')]:{
                    fontSize:14
                }
            },
            "&>p":{
                color:props.ThemeText
            }
        }
    }));
    const classes = useStyles()

    return (
        <>
            <ListItem style={{ backgroundColor: props.ThemeColor, borderRadius: 10, color: props.ThemeText, fontWeight: 800,marginBottom:'0.8rem' }} >
                <ListItemAvatar>
                     <Avatar src={props.TokenImage} />
                </ListItemAvatar>
                <ListItemText primary={props.TokenName} className={classes.TokenText} secondary={<div style={{display:'flex',alignItems:'center'}}>{props.TotalToken}
                        <SettingsIcon style={{fontSize:13,color:'black',marginLeft:5}}/>
                   </div>}/>
                <ListItemSecondaryAction style={{ display: 'flex', alignItems: 'center' }}>
                   
                    {props.children}
                </ListItemSecondaryAction>
            </ListItem>


        </>
    )
}
export default ManageTokenList