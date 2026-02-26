import React, { Fragment } from "react";
import PageHeader from 'components/PageHeader';
//import DesktopControls from "components/V2/Utility";
import { useApplicationUserState } from "store/user/hooks";
import { Views } from "store/user/reducer";
import ListItem from "components/Launch/ListItem";
import { useObtainIDOProjects } from "store/ido/hooks";
import { isEmpty } from "lodash";
import ContentLoader from "components/ContentLoader";
import GridItem from "components/Launch/GridItem";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const Body = styled.div`
  margin-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 25px;
  padding: 15px 0px;
`;

const LaunchPad = () => {
   
  let {view} = useApplicationUserState();
  let projects = useObtainIDOProjects();
  let history = useHistory();
  
  const getCurrentView = () => {
     if(isEmpty(projects)){
       return <ContentLoader color="#222" message="Loading Best IDO Projects"/>  
     }else {
        if(view === Views.LIST){
            return(
                <Body>
                  {
                    projects.map((items,index) => {
                        return (
                         <ListItem
                         key={index}
                         projectIcon={items.sellToken.icon}
                         projectName={items.sellToken.name}
                         projectSymbol={items.sellToken.symbol}
                         eligibilityLabel={items.extra.eligibility[0].eligibilityLabel}
                         endTime={items.endTime}
                         saleStatus={items.saleStatus}
                         paymentTokenName={items.paymentToken.symbol}
                         paymentTokenIcon={items.paymentToken.icon}
                         idoFilled={items.totalRaisedInPercentage.toString()}
                         redirectionHandler={() => history.push(`/launch/project/${items.extra.idoAddress}`)}
                       />
                       )
                      })
                    }    
                </Body>  
            ) 
        }else {
            return(
                <Body>
                  {
                    projects.map((items,index) => {
                        return (
                         <GridItem
                         key={index}
                         projectIcon={items.sellToken.icon}
                         projectName={items.sellToken.name}
                         projectSymbol={items.sellToken.symbol}
                         eligibilityLabel={items.extra.eligibility[0].eligibilityLabel}
                         endTime={items.endTime}
                         saleStatus={items.saleStatus}
                         paymentTokenName={items.paymentToken.symbol}
                         paymentTokenIcon={items.paymentToken.icon}
                         idoFilled={items.totalRaisedInPercentage.toString()}
                         redirectionHandler={() => history.push(`/launch/project/${items.extra.idoAddress}`)}
                       />
                       )
                      })
                    }    
                </Body>  
            ) 
        } 
         
     }
      
  }   
  return(
    <Fragment>
       <PageHeader
          title="Launchpad"
          content="Participate in the Gameyoo IDO by staking in UFARM - BNB pool. To know more details about the project, click on “How to Participate”"
          hasShowSwitch={false}
       />
       {/* <DesktopControls /> */}
       {getCurrentView()}     
    </Fragment>
   ) 
}

export default LaunchPad;