import { search } from "../lib/search";
import { USER_SEARCH_PARAMS } from "../lib/config";
import FlightList from "../components/FlightList";

async function getData() {
  const data = await search(USER_SEARCH_PARAMS);
  return data;
}

type HeaderProps = {
  title: string;
};

function Header({ title }: HeaderProps) {
  return <h1>{title ? title : "Default title"}</h1>;
}

export default async function Page() {
  const data = await getData();
  return (
    <div>
      <Header title="Elephas 🐘" />
      <FlightList data={data} />
    </div>
  );
}
