import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import { Divider } from "@material-ui/core";
import React from 'react'
interface IsTokenList {
    tokentitle: string;
    fullname: string;
    value: any;
    tokenImage: any;
    click:()=>void;
    select:any;
}

const TokenList = (props: IsTokenList) => {
    return (
        <>
         <ListItem button onClick={props.click} disabled={props.select}>
               <ListItemAvatar>
                    <Avatar src={props.tokenImage} />
              </ListItemAvatar>
                <ListItemText
                    primary={props.tokentitle}
                    secondary={props.fullname}
                />
                <ListItemSecondaryAction>
                    {props.value}
                </ListItemSecondaryAction>
            </ListItem>
            <Divider />
        </>
    )
}

export default TokenList