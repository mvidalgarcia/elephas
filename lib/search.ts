import { URL, URLSearchParams } from "node:url";
import dotenv from "dotenv";

import { getNextWeekends } from "./date";
import { TEQUILA_API_URL } from "./config";

dotenv.config();

const weekends = getNextWeekends({ count: 5 });

const API_URL = new URL(TEQUILA_API_URL);
const TEQUILA_API_KEY: string = String(process.env.TEQUILA_API_KEY);
// FIXME: Make search function parametrizable
const params: any = {
  fly_from: "BCN",
  fly_to: "MAD",
  date_from: weekends[0].friday,
  date_to: weekends[0].friday,
  return_from: weekends[0].sunday,
  return_to: weekends[0].sunday,
  dtime_from: "15:00",
  ret_dtime_from: "16:00",
  partner: "picky",
  sort: "quality",
  price_from: 0,
  price_to: 300,
  curr: "EUR",
  max_stopovers: 0,
};

export function search() {
  let url = API_URL;
  url.search = new URLSearchParams(params).toString();
  const urlStr = url.href;

  return fetch(urlStr, { headers: { apikey: TEQUILA_API_KEY } })
    .then((res) => {
      // FIXME: Filter our props from the response
      return res.json();
    })
    .catch((err) => console.log(err));
}
