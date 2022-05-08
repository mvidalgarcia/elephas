import parseISO from "date-fns/parseISO";
import formatRFC7231 from "date-fns/formatRFC7231";

export type FlightListProps = {
  id: string;
  airlines: Array<string>;
  price: number;
  deep_link: string;
  cityFrom: string;
  cityTo: string;
  route: Array<{ id: string; local_arrival: string; local_departure: string }>;
};

export default function FlightListItem({
  airlines,
  price,
  deep_link: deepLink,
  cityFrom,
  cityTo,
  route,
}: FlightListProps) {
  debugger;
  return (
    <>
      <div>
        {cityFrom} - {cityTo} ({airlines.join(", ")})
      </div>
      <div>
        {route.map((item) => (
          <div key={item.id}>
            {formatRFC7231(parseISO(item.local_departure))} -{" "}
            {formatRFC7231(parseISO(item.local_arrival))}
          </div>
        ))}
      </div>
      <a href={deepLink} target="_blank" rel="noopener noreferrer">
        link
      </a>
      <span>{price}EUR</span>
    </>
  );
}
