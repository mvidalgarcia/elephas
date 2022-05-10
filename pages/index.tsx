import { search } from "../lib/search";
import { USER_SEARCH_PARAMS } from "../lib/config";
import FlightList from "../components/FlightList";

type HeaderProps = {
  title: string;
};

function Header({ title }: HeaderProps) {
  return <h1>{title ? title : "Default title"}</h1>;
}

export default function App({ data }: { data: Array<any> }) {
  return (
    <div>
      <Header title="Elephas 🐘" />
      <FlightList data={data} />
    </div>
  );
}

export async function getServerSideProps() {
  const data = await search(USER_SEARCH_PARAMS);
  return { props: { data } };
}
