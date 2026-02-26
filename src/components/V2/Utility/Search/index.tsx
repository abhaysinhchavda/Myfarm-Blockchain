import React from "react";
import TextField from "@mui/material/TextField";
import { makeStyles,Theme } from "@material-ui/core";


interface SearchProps {
  /** search value */
  searchValue: string | number;
  /** search Handler */
  searchHandler: (searchKey: string) => void;
}

const useStyles = makeStyles((theme:Theme) => ({
  root:{
  [theme.breakpoints.down('xs')]:{
    width:'100%'
  }
  }
}))

const Search = ({ searchValue, searchHandler }: SearchProps) => {
  const classes=useStyles()
  return (
    <TextField
      id="standard-basic"
      label="Search"
      variant="standard"
      value={searchValue}
      onChange={(event) => searchHandler(event.target.value)}
      className={classes.root}
    />
  );
};

export default Search;
