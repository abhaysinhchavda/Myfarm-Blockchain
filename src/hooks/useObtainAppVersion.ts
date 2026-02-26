import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useAppVersion, useSwitchAppVersion } from 'store/V2/dapp/hooks';
import { DappVersion } from 'store/V2/dapp/reducer';

export const useObtainAppVersion = () => {
  const location = useLocation();
  const setVersion = useSwitchAppVersion();
  const version = useAppVersion();

  const history = useHistory();

  useEffect(() => {
    // switch the version
    if (location.pathname.includes('v1')) {
      setVersion(DappVersion.V1);
    } else if (location.pathname.includes('v2')) {
      setVersion(DappVersion.V2);
    }

    const hasFarms = location.pathname.includes('farms');
    const hasStakes = location.pathname.includes('stakes');

    // redirecton
    if (version === DappVersion.V1) {
      // check the current path
      if (hasFarms) {
        history.push('/v1/farms');
      } else if (hasStakes) {
        history.push('/v1/stakes');
      }
    }
  }, []);
};
