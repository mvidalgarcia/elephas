import { URL, URLSearchParams } from "node:url";
import dotenv from "dotenv";

import { getNextWeekends, formatDate } from "./date";

import { pick } from "./util";
import { TEQUILA_API_URL, USER_SEARCH_PARAMS } from "./config";

dotenv.config();

const TEQUILA_API_KEY: string = String(process.env.TEQUILA_API_KEY);

function serializeFlightData(rootData: any) {
  const filteredRootData = rootData
    .filter(({ data }: { data: Array<any> }) => data.length > 0)
    .map((el: any) => {
      const keep = [
        "id",
        "cityFrom",
        "cityCodeFrom",
        "cityTo",
        "cityCodeTo",
        "price",
        "airlines",
        "deep_link",
        "route",
      ];
      const keepRoute = ["id", "local_arrival", "local_departure"];
      const filteredData = el.data.map((flight: any) => {
        const filtered = pick(flight, keep);
        filtered.route = filtered.route.map((routeItem: any) =>
          pick(routeItem, keepRoute)
        );
        return filtered;
      });
      // Inject date range at the top level of the flight data from a specific date
      const [from, to] = filteredData[0].route;
      const dateRange = `${formatDate(from.local_departure)} - ${formatDate(
        to.local_departure
      )}`;

      return {
        id: el.search_id,
        currency: el.currency,
        data: filteredData,
        dateRange,
      };
    });
  return filteredRootData;
}

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
      const serializedData = serializeFlightData(data);
      return serializedData;
    })
    .catch((err) => console.log(err));
}
