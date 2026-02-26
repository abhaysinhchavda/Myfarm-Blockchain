interface Tokenlist {
  [chainId: number]: string;
}

export const tokenlistUrls: Tokenlist = {
  4: "https://raw.githubusercontent.com/InfernalHeir/tokenlist/master/unifarm-tokenlist.json",
  97: "https://raw.githubusercontent.com/InfernalHeir/tokenlist/master/unifarm.tokenlist.97.json",
  80001:
    "https://raw.githubusercontent.com/InfernalHeir/tokenlist/master/unifarm.tokenlist.80001.json",
  43113:
    "https://raw.githubusercontent.com/InfernalHeir/tokenlist/master/unifarm.tokenlist.43113.json",
};

export const allLists: string[] = [
  "https://raw.githubusercontent.com/InfernalHeir/tokenlist/master/unifarm-tokenlist.json",
  "https://raw.githubusercontent.com/InfernalHeir/tokenlist/master/unifarm.tokenlist.97.json",
  "https://raw.githubusercontent.com/InfernalHeir/tokenlist/master/unifarm.tokenlist.80001.json",
  "https://raw.githubusercontent.com/InfernalHeir/tokenlist/master/unifarm.tokenlist.43113.json",
];
