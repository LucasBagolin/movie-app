export default function SearchBar({ value, onChange, onSubmit }) {
  function handleSubmit(e) {
    e.preventDefault();           // não recarrega a página
    onSubmit?.();
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 16 }}>
      <input
        type="text"
        placeholder="Busque um filme..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ padding: 8, width: 320 }}
      />
      <button type="submit" style={{ marginLeft: 8 }}>Buscar</button>
    </form>
  );
}