type HeaderProps = {
  title: string
}

function Header({ title } : HeaderProps) {
  return <h1>{title ? title : "Default title"}</h1>;
}


export default function App() {
  return (
    <div>
      <Header title="Elephas 🐘" />
    </div>
  );
}
