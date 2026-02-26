import React, { Fragment } from "react";
import TextField from "@material-ui/core/TextField";
import { InputAdornment } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { useUserControlContext } from "../../contexts/UserControlContext";

export default function SearchInput() {
  const { onSearch } = useUserControlContext();

  return (
    <Fragment>
      <TextField
        placeholder="Search by token name, cohort..."
        variant="standard"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        onChange={(event) => onSearch(event.target.value)}
      />
    </Fragment>
  );
}
