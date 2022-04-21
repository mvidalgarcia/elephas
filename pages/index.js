function Header({ title }) {
  return <h1>{title ? title : "Default title"}</h1>;
}

export default function HomePage() {
  return (
    <div>
      <Header title="Elephas 🐘" />
    </div>
  );
}
