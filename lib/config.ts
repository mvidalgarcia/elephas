export const TEQUILA_API_URL: string = "https://tequila-api.kiwi.com/v2/search";

// FIXME: Hardcoded user config to make customizable
export const USER_SEARCH_PARAMS: SearchProps = {
  fly_from: "BCN",
  fly_to: ["MAD", "GVA", "OVD", "IBZ", "CAG", "CPH", "FLR"],
  dtime_from: "15:00",
  ret_dtime_from: "16:00",
  partner: "picky",
  sort: "quality",
  price_from: "0",
  price_to: "200",
  curr: "EUR",
  max_stopovers: "0",
};

type SearchProps = {
  fly_from: string;
  fly_to: Array<string>;
  dtime_from: string;
  ret_dtime_from: string;
  partner: string;
  sort: string;
  price_from: string;
  price_to: string;
  curr: string;
  max_stopovers: string;
};
