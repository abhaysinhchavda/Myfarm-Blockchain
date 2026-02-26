import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { Provider } from 'react-redux';
import { Web3ReactProvider } from '@web3-react/core';
import {
  ExternalProvider,
  JsonRpcFetchFunc,
  Web3Provider,
} from '@ethersproject/providers';
import store from './store';
import { HelmetProvider } from 'react-helmet-async';
import Header from './components/Header/index';
import { ApolloProvider } from '@apollo/client';
import { client } from './graphql';
import { Web3Modal } from './components/Web3Modal';
import Web3ReactManager from './components/Web3ReactManager';
import NetworkPopUp from './components/NetworkPopUp';
import { CustomSnackBar } from './components/Snackbar/CustomSnackBar';
import ContentLoader from './components/ContentLoader';
//import { GraphQueriesResolver } from "./components/GraphQueriesResolver";
import ApplicationError from './components/ApplicationError';
import NotFound from './pages/NotFound';
import { QueryResolvers } from './components/QueryResolvers';
import Flip from 'pages/Flip';

import GridView from 'components/Launch/GridView';
import ListView from 'components/Launch/ListView';

function App() {
  const getLibrary = (provider: ExternalProvider | JsonRpcFetchFunc) => {
    return new Web3Provider(provider);
  };
  /* const HomePage = React.lazy(async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return import("./pages");
  });
  const Farms = React.lazy(async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return import("./pages/Farms");
  });
  const MyStakes = React.lazy(async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return import("./pages/MyStakes");
  });
  const ReferEarn = React.lazy(async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return import("./pages/ReferEarn");
  });

  const Exchange = React.lazy(async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return import("./pages/Exchange");
  });

  const Claim = React.lazy(async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return import("./pages/Claim");
  });
  const Liquidity = React.lazy(async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return import("./pages/Liquidity/Index");
  });
  const Governance = React.lazy(async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return import("./pages/Governance/index");
  }); */

  const HomePage = lazy(() => import('./pages'));
  const RedirectFarm = lazy(() => import('./pages/Farms/redirects'));
  const RedirectMyStake = lazy(() => import('./pages/MyStakes/redirects'));

  const Farm = lazy(() => import('./pages/Farms'));
  const YF2Farm = lazy(() => import('./pages/V2/Farms'));
  const MyStakes = lazy(() => import('./pages/MyStakes'));
  const YF2Stakes = lazy(() => import('./pages/V2/MyStakes/index'));
  const ReferEarn = lazy(() => import('./pages/ReferEarn'));
  const Exchange = lazy(() => import('./pages/Exchange'));
  const Claim = lazy(() => import('./pages/Claim'));
  const Launch = lazy(() => import('./pages/Launch'));
  const LaunchPad = lazy(() => import('./pages/LaunchPad'));
  const Liquidity = lazy(() => import('./pages/Liquidity/Index'));
  const Governance = lazy(() => import('./pages/Governance'));
  const InspectStake = lazy(() => import('./pages/V2/InspectStake'));
  const InspectFarm = lazy(() => import('./pages/V2/InspectFarm'));
  const InspectClaim = lazy(() => import('./pages/V2/InspectClaim'));
  // const Placeorder=lazy(()=>import('./components/ClaimRewards/PlaceOrder'))

  // const history=useHistory()
  // useEffect(()=>{
  //   if(SwitchChange.V2Switch.toString() ==="true")
  //   {
  //     history.push('/V2farms')
  //   }
  //   else
  //   {
  //     history.push('/farms')
  //   }
  // },[])
  return (
    <div className="App">
      <Provider store={store}>
        <ApolloProvider client={client}>
          <Web3ReactProvider getLibrary={getLibrary}>
            <HelmetProvider>
              <Router>
                <Header>
                  <Suspense
                    fallback={<ContentLoader color="rgb(99, 56, 188)" message="" />}
                  >
                    <Switch>
                      <Route path="/" exact>
                        <HomePage />
                      </Route>

                      <Route path="/farms/v1" exact>
                        <Farm />
                      </Route>

                      <Route path="/farms/v2" exact>
                        <YF2Farm />
                      </Route>

                      <Route path="/farms" exact>
                        <RedirectFarm />
                      </Route>

                      <Route path="/mystakes/v1" exact>
                        <MyStakes />
                      </Route>

                      <Route path="/mystakes/v2" exact>
                        <YF2Stakes />
                      </Route>
                      <Route path="/mystakes" exact>
                        <RedirectMyStake />
                      </Route>

                      <Route path="/farms/:version/:chainId">
                        <RedirectFarm />
                      </Route>

                      <Route path="/v1/mystakes">
                        <MyStakes />
                      </Route>

                      <Route path="/v2/stakes">
                        <MyStakes />
                      </Route>

                      <Route path="/exchange">
                        <Exchange />
                      </Route>

                      <Route path="/claim">
                        <Claim />
                      </Route>

                      <Route path="/launch" exact>
                        <LaunchPad />
                      </Route>

                      <Route path="/launch/:chainId" exact>
                        <LaunchPad />
                      </Route>

                      <Route path="/launch/project/:projectId" exact>
                        <Launch />
                      </Route>

                      <Route path="/ido/grid">
                        <GridView />
                      </Route>

                      <Route path="/ido/list">
                        <ListView />
                      </Route>
                      <Route path="/referral">
                        <ReferEarn />
                      </Route>
                      <Route path="/liquidity">
                        <Liquidity />
                      </Route>
                      <Route path="/governance">
                        <Governance />
                      </Route>
                      <Route path="/v2/InspectFarm/inspect/:FARM_ID">
                        <InspectFarm />
                      </Route>
                      <Route path="/v2/InspectStake/inspect">
                        <InspectStake />
                      </Route>
                      <Route path="/v2/claim/inspect">
                        <InspectClaim />
                      </Route>
                      <Route path="/flip">
                        <Flip />
                      </Route>
                      <Route path="*">
                        <NotFound />
                      </Route>
                    </Switch>
                  </Suspense>
                </Header>
              </Router>
              <QueryResolvers />
              <ApplicationError />
              <Web3Modal />
              <NetworkPopUp />
              <CustomSnackBar />
              <Web3ReactManager />
            </HelmetProvider>
          </Web3ReactProvider>
        </ApolloProvider>
      </Provider>
    </div>
  );
}

export default React.memo(App);
