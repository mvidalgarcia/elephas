import { search } from "../lib/search";
import FlightListItem, { FlightListProps } from "../components/FlightListItem";

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
      <ul>
        {data.map((props: FlightListProps) => (
          <li key={props.id}>
            <FlightListItem {...props} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getServerSideProps() {
  const data = await search();
  return { props: { data: data.data } };
}
