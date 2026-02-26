import { useCallback, useState } from "react";

export const useSearch = () => {
  const [searchItem, setSearchItem] = useState<string | null>(null);

  const onSearch = useCallback((searchValue: string) => {
    setSearchItem(searchValue);
  }, []);

  return {
    searchItem,
    onSearch,
  };
};
