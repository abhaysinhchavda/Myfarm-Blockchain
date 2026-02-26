import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "..";
import { fetchManageTokenList } from "../../utilities";
import { filltoken } from "./action";
import { MainTokenData } from "./reducer";
//
export const useFillTokenList = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const fetch = async () => {
      const tokenlist: MainTokenData[] = await fetchManageTokenList();
      dispatch(
        filltoken({
          tokenlist,
        })
      );
    };
    fetch();
  }, [dispatch]);
  
};

export const useTokenlist = (): MainTokenData[] => {
  const tokenlist = useSelector(
    (state: AppState) => state.GetTokenList.tokenlist
  );

  return tokenlist;
};
