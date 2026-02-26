import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import React from 'react'
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
const VestingTable = () => {
    const classes=useStyles()
    return (
        <TableContainer component={Paper} className={classes.TableContainer}>
            <Table aria-label="simple table">
                <TableHead className={classes.TableHead}>
                    <TableRow>
                        <TableCell className={classes.TableCell}>Amount</TableCell>
                        <TableCell className={classes.TableCell}>Date Claimed</TableCell>
                        <TableCell ></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell style={{ width: '5%' }}>50</TableCell>
                        <TableCell style={{ width: '5%', color: '#787878' }}>100</TableCell>
                        <TableCell style={{ width: '10%' }}><a href="#" style={{ color: '#787878' }}>View on explorer</a></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell style={{ width: '5%' }}>50</TableCell>
                        <TableCell style={{ width: '5%', color: '#787878' }}>100</TableCell>
                        <TableCell style={{ width: '10%' }}><a href="#" style={{ color: '#787878' }}>View on explorer</a></TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}
export default VestingTable