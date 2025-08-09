export default function ErrorMessage({ message, onRetry }) {
  return (
    <div role="alert" style={{ color: "red" }}>
      <p>Erro: {message}</p>
      {onRetry && <button onClick={onRetry}>Tentar novamente</button>}
    </div>
  );
}
