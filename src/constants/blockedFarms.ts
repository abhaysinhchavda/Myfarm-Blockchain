interface BlockedFarms {
  [chainId: number]: {
    legacyAddress: string;
    newAddress: string;
  }[];
}

export const blockedFarms: BlockedFarms = {
  4: [
    {
      legacyAddress: "0x348c5ce913ccdeb257b0381c920697cf26c6fcf7",
      newAddress: "0x7d65bc7b054a1c00a0de144fed632bf90b6b88b6",
    },
  ],
  97: [
    {
      legacyAddress: "0xEc9cA0c1666103758b2dc2B0eDc924feE7f7F08C",
      newAddress: "0x4ae33A0F516DA30eed247cbccC575fd9E65D4778",
    },
    {
      legacyAddress: "0x1973130fe1ffbfc424d3d9b77e3416c210711fa6",
      newAddress: "0x1852fdf082d438c494eb5e292a4485b9b8a8c0cb",
    },
  ],
};
