import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import React from 'react'
import Claim3 from '../../../assets/images/New/claim3.png'
import { makeStyles, createStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(() =>
    createStyles({
        TableContainer:{
            marginTop: '2rem', boxShadow: 'none', border: '1px solid #E1E1E1'
        },
        TableHead:{
            background: '#F8F4FF'
        },
        TableCell:{
            fontWeight: 700, color: '#5A5858' 
        },
        Celldiv:{
            display:'flex',alignItems:'center'
        }
    }),

);
const AirDropsTable = () => {
    const classes=useStyles()
    return (
        <TableContainer component={Paper} className={classes.TableContainer}>
            <Table aria-label="simple table">
                <TableHead className={classes.TableHead}>
                    <TableRow>
                       <TableCell className={classes.TableCell}>Token</TableCell>
                        <TableCell className={classes.TableCell}>Amount</TableCell>
                        <TableCell className={classes.TableCell}>Airdropped on</TableCell>
                        <TableCell className={classes.TableCell}>Claimed on</TableCell>
                   </TableRow>
                </TableHead>
                <TableBody>
                <TableRow>
                    <TableCell style={{ width: '10%'}}><div className={classes.Celldiv}><img  src={Claim3} width="20" style={{marginRight:'5px'}}/>TacoCat Token (TCT)</div></TableCell>
                    <TableCell style={{ width: '5%'}}>100</TableCell>
                    <TableCell style={{ width: '5%',color: '#787878' }}>27/Jan/2021</TableCell>
                    <TableCell style={{ width: '10%', color: '#787878' }}>24/Jan/2021</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{ width: '10%'}}><div className={classes.Celldiv}><img  src={Claim3} width="20" style={{marginRight:'5px'}}/>TacoCat Token (TCT)</div></TableCell>
                    <TableCell style={{ width: '5%'}}>100</TableCell>
                    <TableCell style={{ width: '5%',color: '#787878' }}>27/Jan/2021</TableCell>
                    <TableCell style={{ width: '10%', color: '#787878' }}>24/Jan/2021</TableCell>
                </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}
export default AirDropsTable