import { URL, URLSearchParams } from "node:url";
import dotenv from "dotenv";

import { getNextWeekends } from "./date";
import { TEQUILA_API_URL, USER_SEARCH_PARAMS } from "./config";

dotenv.config();

const TEQUILA_API_KEY: string = String(process.env.TEQUILA_API_KEY);

type SearchProps = {
  fly_from: string;
  fly_to: string;
  date_from: string;
  date_to: string;
  return_from: string;
  return_to: string;
  dtime_from: string;
  ret_dtime_from: string;
  partner: string;
  sort: string;
  price_from: string;
  price_to: string;
  curr: string;
  max_stopovers: string;
};

export function search(
  searchParams: typeof USER_SEARCH_PARAMS,
  weekendCount: number = 5
) {
  const weekends = getNextWeekends({ count: weekendCount });

  const urls = weekends.map(({ friday, sunday }) => {
    const fullSearchParams = {
      ...searchParams,
      date_from: friday,
      date_to: friday,
      return_from: sunday,
      return_to: sunday,
    };
    const urlObj = new URL(TEQUILA_API_URL);
    urlObj.search = new URLSearchParams(fullSearchParams).toString();
    const urlStr = urlObj.href;
    return urlStr;
  });

  return Promise.all(
    urls.map((url) =>
      fetch(url, { headers: { apikey: TEQUILA_API_KEY } }).then((resp) =>
        resp.json()
      )
    )
  )
    .then((data) => {
      return data;
    })
    .catch((err) => console.log(err));
}
