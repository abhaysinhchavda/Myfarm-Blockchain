import { Button } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { useWeb3React } from "@web3-react/core";
import React from "react";
import Style from "styled-components";
import variable from "../../assets/stylesheet/Governance.module.scss";
import BreadCrumb from "../../components/PageHeader";
import ProposalTable from "../../components/ProposalTable/ProposalTable";
import Tab from "../../components/Tabs/GovernanceTab";
import { useOpenWalletPopUp } from "../../store/application/hooks";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

const PlusIcon = Style.div`
  display:none;
  @media screen and (max-width: 600px){
    display:block;
  }
  margin-left:89%;
  margin-top:-43px;

`;

const CreateProposal = Style.span`
  display:none;
  @media screen and (max-width: 600px){
    display:block;
  }
  margin-left:55%;
  margin-top:90px;
  width: 149px;
  height: 32px;
  background-color: #FFFFFF;
  padding-top: 2px;
  border-radius: 4px;
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 1px 3px rgba(0, 0, 0, 0.12);
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: 0.15px;
  color: #777777;
`;

const StyledButton = Style(Button)`
  background:${variable.background};
  border:unset;
  border-radius: 10px;
   margin-left: 0.5rem;
   padding:9px 13px;
  letter-spacing:2px;
  text-indent:5px;
  box-shadow:0px 7px 18px -2px rgba(103, 58, 183, 0.56);
  text-transform: capitalize;
  color: ${variable.buttonText} !important;
  &: hover {
    background: #6338BC;
  };

  @media screen and (max-width: 600px){
     display:none;
  }
  
`;
const HeaderContainer = Style.div`
display:flex;
align-items:center;
justify-content:space-between;

`;



function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3} style={{ paddingTop: 45, paddingLeft: 0, paddingRight: 0 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

interface GovernanceProps {
  parentCallback: any;
  parentCallback2: any;
  parentCallback3: any;
  parentCallback4: any;
  proposals:any;
}

const Governance = (props: GovernanceProps) => {
  const [value, setValue] = React.useState(0);
  const { active } = useWeb3React();
  const open = useOpenWalletPopUp();
  const handleCallback = (childData) => {
    setValue(childData);
  };

  const handleCallback2 = (childData) => {
    props.parentCallback(childData);
  };

  const handleCallback3 = (childData) => {
    props.parentCallback2(childData);
  };

  const handleCallback4 = () => {
    props.parentCallback3("ProposalCreate");
  };

  const handleCallback5 = (childData) => {
    props.parentCallback4(childData);
  }

  const propbool = false;

  return (
    <>
      <HeaderContainer>
        <BreadCrumb title="Governance" content="" hasShowSwitch={false}/>
        {active ? (
          <StyledButton onClick={handleCallback4}>Create Proposal</StyledButton>
        ) : (
          <StyledButton onClick={open}>Connect Wallet</StyledButton>
        )}
      </HeaderContainer>

      <Tab parentCallback={handleCallback} />

      <TabPanel value={value} index={0}>
        <ProposalTable
          proposal={props.proposals}
          proposalBool={propbool}
          createdProposal={false}
          parentCallback={handleCallback2}
          parentCallback2={handleCallback3}
          parentCallback3={handleCallback5}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ProposalTable
          proposal={props.proposals}
          proposalBool={propbool}
          createdProposal={true}
          parentCallback={handleCallback2}
          parentCallback2={handleCallback3}
          parentCallback3={handleCallback5}
        />
      </TabPanel>

      {active ? (
        <div>
          {" "}
          <CreateProposal>Create Proposal</CreateProposal>
          <PlusIcon>
            <Fab
              color="primary"
              aria-label="add"
              sx={{
                backgroundColor: "#6338BC",
                "&:hover": { backgroundColor: "#6338BC" },
              }}
              onClick={handleCallback4}
            >
              <AddIcon />
            </Fab>
          </PlusIcon>{" "}
        </div>
      ) : (
        <div>
          <CreateProposal>Connect Wallet</CreateProposal>
          <PlusIcon>
            <Fab
              color="primary"
              aria-label="add"
              sx={{
                backgroundColor: "#6338BC",
                "&:hover": { backgroundColor: "#6338BC" },
              }}
              onClick={open}
            >
              <AddIcon />
            </Fab>
          </PlusIcon>{" "}
        </div>
      )}
    </>
  );
};
export default Governance;
