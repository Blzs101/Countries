
export type elementType = {
  flags: {
    svg: string;
    alt: string;
  };
  name: {
    common: string;
    nativeName: object;
  };
  population: number;
  region: string;
  capital: string[];
  subRegion: string;
  tld: string[];
  languages: string;
  currencies: {
    name: string;
    symbol: string;
  }[];
  borders: string[];
};
