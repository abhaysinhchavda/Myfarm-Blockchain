import { useCallback, useState } from 'react';

export const useSearch = (): [string, (searchText: string) => void] => {
  let [searchValue, setSearchValue] = useState<string | null>();
  const searchHandler = useCallback((searchText: string) => {
    setSearchValue(searchText);
  }, []);
  return [searchValue, searchHandler];
};

export const useSort = (): {
  anchorEl: HTMLElement;
  currentKeys: string[];
  toggle: (anchorEl: HTMLElement | null) => void;
  apply: () => void;
  applied: boolean;
  sortHandler: (keys: string[]) => void;
} => {
  let [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  let [applied, setApplied] = useState<boolean>(false);
  let [currentKeys, setKeys] = useState<string[]>(['Cohort', 'DESC']);

  // toggle
  const toggle = useCallback((anchorEl: HTMLElement | null) => {
    setAnchorEl(anchorEl);
  }, []);

  // apply
  const apply = useCallback(() => {
    setApplied(true);
  }, []);

  // sortHandler
  const sortHandler = useCallback((keys: string[]) => {
    setKeys(keys);
  }, []);

  return {
    anchorEl,
    currentKeys,
    toggle,
    apply,
    applied,
    sortHandler,
  };
};
