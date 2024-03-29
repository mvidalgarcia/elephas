import parseISO from "date-fns/parseISO";
import formatRFC7231 from "date-fns/formatRFC7231";

export type FlightListProps = {
  id: string;
  airlines: Array<string>;
  price: number;
  deep_link: string;
  cityFrom: string;
  cityCodeFrom: string;
  cityTo: string;
  cityCodeTo: string;
  currency: string;
  route: RouteProps;
};

type RouteProps = Array<{
  id: string;
  local_arrival: string;
  local_departure: string;
}>;

export default function FlightList({ data }: { data: Array<any> }) {
  return (
    <>
      {data.map((flightsFromDate) => (
        <div key={flightsFromDate.id}>
          {flightsFromDate.data.length > 0 && (
            <h3>{flightsFromDate.dateRange}</h3>
          )}
          <ul>
            {flightsFromDate.data.map((props: FlightListProps) => (
              <li key={props.id}>
                <FlightListItem
                  {...props}
                  currency={flightsFromDate.currency}
                />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}

function FlightListItem({
  airlines,
  price,
  deep_link: deepLink,
  cityFrom,
  cityCodeFrom,
  cityTo,
  cityCodeTo,
  currency,
  route,
}: FlightListProps) {
  return (
    <>
      <div>
        {cityFrom} - {cityTo} ({airlines.join(", ")})
      </div>
      <DateRange route={route} />
      <a href={deepLink} target="_blank" rel="noopener noreferrer">
        link
      </a>
      <span>
        {price} {currency}
      </span>
    </>
  );
}

function DateRange({ route }: { route: RouteProps }) {
  return (
    route && (
      <div>
        {route.map((item) => (
          <div key={item.id}>
            {formatRFC7231(parseISO(item.local_departure))} -{" "}
            {formatRFC7231(parseISO(item.local_arrival))}
          </div>
        ))}
      </div>
    )
  );
}
