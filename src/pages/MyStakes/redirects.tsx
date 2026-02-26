import React from 'react';
import { useEffect } from 'react';
import { useRouteMatch, Redirect } from 'react-router';
import { useChangeAppChainId } from 'store/user/hooks';
import { useAppVersion, useSwitchAppVersion } from 'store/V2/dapp/hooks';
import { DappVersion } from 'store/V2/dapp/reducer';

const RedirectFarm = (): JSX.Element => {
  const { params } = useRouteMatch<{ version: string; chainId: string }>();
  const setApplicationChainId = useChangeAppChainId();
  const setAppVersion = useSwitchAppVersion();

  useEffect(() => {
    let chainId = parseFloat(params.chainId);
    if (!chainId) {
      // set the chainId into react
      console.log('chainId',chainId)
      setApplicationChainId(chainId, false);
    }
    if (!params.version) {
      setAppVersion(params.version === 'v1' ? DappVersion.V1 : DappVersion.V2);
    }
  }, [params.version, params.chainId, setAppVersion, setApplicationChainId]);

  const version = useAppVersion();

  if (version === DappVersion.V1) {
    return <Redirect to="/mystakes/v1" />;
  } else if (version === DappVersion.V2) {
    return <Redirect to="mystakes/v2" />;
  }
};

export default RedirectFarm;