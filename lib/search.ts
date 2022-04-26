const { URL, URLSearchParams } = require("url");
import { getNextWeekends } from "./date";
import { TEQUILA_API_URL } from "./config";

require("dotenv").config();

const weekends = getNextWeekends({ count: 5 });

const API_URL = new URL(TEQUILA_API_URL);
const TEQUILA_API_KEY: string = String(process.env.TEQUILA_API_KEY);
// FIXME: Make search function parametrizable
const params = {
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
  price_to: 200,
  curr: "EUR",
  max_stopovers: 0,
};

export function search() {
  let url = API_URL;
  url.search = new URLSearchParams(params);
  url = url.href;
  console.log(url);

  fetch(url, { headers: { apikey: TEQUILA_API_KEY } })
    .then((res) => {
      res
        .json()
        .then((data) => {
          // FIXME: fix
          console.log(data.data.map((elem: any) => elem.deep_link));
          console.log(data?.data?.length);
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
}

search();
