export default function Pagination({ page, totalPages, onChange, disabled }) {
  if (!totalPages || totalPages <= 1) return null;
  return (
    <div style={{ marginTop: 16, display: "flex", gap: 8, alignItems: "center" }}>
      <button onClick={() => onChange(1)} disabled={page === 1 || disabled}>« Primeiro</button>
      <button onClick={() => onChange(page - 1)} disabled={page === 1 || disabled}>‹ Anterior</button>
      <span>Página {page} de {totalPages}</span>
      <button onClick={() => onChange(page + 1)} disabled={page === totalPages || disabled}>Próximo ›</button>
      <button onClick={() => onChange(totalPages)} disabled={page === totalPages || disabled}>Último »</button>
    </div>
  );
}
