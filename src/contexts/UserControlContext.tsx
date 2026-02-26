import React, { useContext } from "react";
import { GroupBase, OptionsOrGroups } from "react-select";

interface UserControlContextType {
  action: ActionType;
  currentTabPosition: number;
  onTabChange: (tabPosition: number) => void;
  onSearch: (searchQuery: string | null) => void;
  onSortingHandler: (sortingElement: string) => void;
  sortingOptions: OptionsOrGroups<unknown, GroupBase<unknown>>;
}

interface UserControlContextProps extends UserControlContextType {
  children?: React.ReactNode;
}

export const ControlContext =
  React.createContext<UserControlContextType | null>(null);

export type ActionType = "STAKE" | "UNSTAKE";

export const useUserControlContext = (): UserControlContextType => {
  return useContext(ControlContext);
};

export default function UserControlsContext({
  action,
  currentTabPosition,
  onTabChange,
  onSearch,
  onSortingHandler,
  sortingOptions,
  children,
}: UserControlContextProps): JSX.Element {
  return (
    <ControlContext.Provider
      value={{
        action,
        currentTabPosition,
        onTabChange,
        onSearch,
        onSortingHandler,
        sortingOptions,
      }}
    >
      <>{children}</>
    </ControlContext.Provider>
  );
}
