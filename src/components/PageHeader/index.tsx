import * as React from "react";
import { useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { Helmet } from "react-helmet-async";
import Switch from './SwitchVersion/index'

interface PageHeaderProps {
  /** tilte of a page */
  title: string;
  /** content of a page */
  content: any;
  /** has show the v2 switch */
  hasShowSwitch:boolean
}

function PageHeader({ title, content, hasShowSwitch}: PageHeaderProps) {
  const Theme = useTheme();
  const Mobile = useMediaQuery(Theme.breakpoints.down("sm"));

  return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',width:'100%'}}>
      <Helmet>
        <title>Unifarm Dashboard | {title} </title>
        <meta name="description" content={content} />
      </Helmet>
      {Mobile ? (
        <Box
          style={{ width: "100%", textAlign: "left", marginTop: "-30px" }}
          sx={{
            display: "flex",
            alignItems: "center",
           
            width: "fit-content",
            border: (theme) => `0px solid ${theme.palette.divider}`,
            borderRadius: 1,
            color: "text.secondary",
            "& svg": {
              m: 1.5,
            },
            "& hr": {
              mx: 0.5,
            },
          }}
        >
          <h2
            style={{
              color: "#6338BC",
              marginRight: "0.5rem",
              fontSize: 20,
              marginBottom: 0,
              marginTop: 0,
              
            }}
          >
            {title}
          </h2>
          <Divider orientation="vertical" flexItem />
          <p style={{marginLeft: "0.5rem",width:200}}>{content}</p>
        </Box>
      ) : (
        <Box
          style={{textAlign: "left" }}
          sx={{
            display: "flex",
            alignItems: "center",
            width: "fit-content",
            border: (theme) => `0px solid ${theme.palette.divider}`,
            borderRadius: 1,

            color: "text.secondary",
            "& svg": {
              m: 1.5,
            },
            "& hr": {
              mx: 0.5,
            },
          }}
        >
          <h2 style={{ color: "#6338BC", marginRight: "0.5rem" }}>{title}</h2>
          <Divider orientation="vertical" flexItem />
          <p style={{ marginLeft: "0.5rem", width: 470 }}>{content}</p>
        </Box>
       
      )}
      {
        hasShowSwitch && ( <Switch/> )
      }
      
    </div>
  );
}

export default PageHeader;
