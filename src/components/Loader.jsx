export default function Loader({ text = "Carregando..." }) {
  return <p aria-busy="true">{text}</p>;
}
